# Gradle Automation & Testing

**Last Modified:** Friday, January 10, 2026

---

## Overview

This guide covers advanced Gradle automation techniques for Hytale plugin development, including creating custom Gradle tasks for automated server testing and streamlined development workflows.

---

## Custom Gradle Plugin for Server Testing

One of the most time-consuming parts of plugin development is manually:
1. Building your plugin
2. Copying it to the server's plugins folder
3. Starting the server
4. Testing your changes

You can automate this entire workflow with a custom Gradle plugin!

---

## Creating a Custom Gradle Plugin

### Project Structure

```
your-plugin/
├── buildSrc/
│   ├── build.gradle.kts
│   └── src/
│       └── main/
│           └── kotlin/
│               └── RunHytalePlugin.kt
├── build.gradle.kts
└── src/
    └── main/
        └── java/
```

### Step 1: Create buildSrc Directory

The `buildSrc/` directory is a special Gradle convention for custom build logic.

Create `buildSrc/build.gradle.kts`:

```kotlin
plugins {
    `kotlin-dsl`
}

repositories {
    mavenCentral()
}
```

### Step 2: Create the Custom Plugin

Create `buildSrc/src/main/kotlin/RunHytalePlugin.kt`:

```kotlin
import org.gradle.api.DefaultTask
import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.TaskAction
import org.gradle.api.tasks.TaskProvider
import java.io.File
import java.net.URI
import java.security.MessageDigest

// Main plugin class
open class RunHytalePlugin : Plugin<Project> {
    override fun apply(project: Project) {
        // Create extension for configuration
        val extension = project.extensions.create(
            "runHytale", 
            RunHytaleExtension::class.java
        )

        // Register the runServer task
        val runTask: TaskProvider<RunServerTask> = project.tasks.register(
            "runServer", 
            RunServerTask::class.java
        ) {
            jarUrl.set(extension.jarUrl)
            group = "hytale"
            description = "Downloads and runs the Hytale server with your plugin"
        }

        // Make runServer depend on shadowJar (build plugin first)
        project.tasks.findByName("shadowJar")?.let {
            runTask.configure {
                dependsOn(it)
            }
        }
    }
}

// Extension for configuration
open class RunHytaleExtension {
    var jarUrl: String = "https://example.com/hytale-server.jar"
}

// The actual task that runs the server
open class RunServerTask : DefaultTask() {

    @Input
    val jarUrl = project.objects.property(String::class.java)

    @TaskAction
    fun run() {
        // Create directories
        val runDir = File(project.projectDir, "run").apply { mkdirs() }
        val pluginsDir = File(runDir, "plugins").apply { mkdirs() }
        val jarFile = File(runDir, "server.jar")

        // Cache directory for downloaded server JARs
        val cacheDir = File(
            project.layout.buildDirectory.asFile.get(), 
            "hytale-cache"
        ).apply { mkdirs() }

        // Compute hash of URL for caching
        val urlHash = MessageDigest.getInstance("SHA-256")
            .digest(jarUrl.get().toByteArray())
            .joinToString("") { "%02x".format(it) }
        val cachedJar = File(cacheDir, "$urlHash.jar")

        // Download server JAR if not cached
        if (!cachedJar.exists()) {
            println("Downloading Hytale server from ${jarUrl.get()}")
            URI.create(jarUrl.get()).toURL().openStream().use { input ->
                cachedJar.outputStream().use { output ->
                    input.copyTo(output)
                }
            }
            println("Server JAR downloaded and cached")
        } else {
            println("Using cached server JAR")
        }

        // Copy server JAR to run directory
        cachedJar.copyTo(jarFile, overwrite = true)

        // Copy plugin JAR to plugins folder
        project.tasks.findByName("shadowJar")?.outputs?.files?.firstOrNull()?.let { shadowJar ->
            val targetFile = File(pluginsDir, shadowJar.name)
            shadowJar.copyTo(targetFile, overwrite = true)
            println("Plugin copied to: ${targetFile.absolutePath}")
        }

        println("Starting Hytale server...")

        // Start the server process
        val process = ProcessBuilder("java", "-jar", jarFile.name)
            .directory(runDir)
            .start()

        // Handle graceful shutdown
        project.gradle.buildFinished {
            if (process.isAlive) {
                println("Stopping server...")
                process.destroy()
            }
        }

        // Forward stdout to console
        Thread {
            process.inputStream.bufferedReader().useLines { lines ->
                lines.forEach { println(it) }
            }
        }.start()

        // Forward stderr to console
        Thread {
            process.errorStream.bufferedReader().useLines { lines ->
                lines.forEach { System.err.println(it) }
            }
        }.start()

        // Forward stdin to server (for commands)
        Thread {
            System.`in`.bufferedReader().useLines { lines ->
                lines.forEach {
                    process.outputStream.write((it + "\n").toByteArray())
                    process.outputStream.flush()
                }
            }
        }.start()

        // Wait for server to exit
        val exitCode = process.waitFor()
        println("Server exited with code $exitCode")
    }
}
```

### Step 3: Apply the Plugin

In your main `build.gradle.kts`:

```kotlin
plugins {
    id("java")
    id("com.gradleup.shadow") version "9.3.1"
    id("run-hytale") // Your custom plugin
}

// Configure the plugin
runHytale {
    jarUrl = "https://example.com/hytale-server.jar" // Replace with actual URL
}

// Rest of your build configuration...
```

### Step 4: Use the Task

```bash
# Build and run server with your plugin
./gradlew runServer

# On Windows:
gradlew.bat runServer
```

---

## How It Works

### 1. **Smart Caching**
- Downloads server JAR only once
- Uses SHA-256 hash of URL as cache key
- Subsequent runs use cached version

### 2. **Automatic Build**
- Depends on `shadowJar` task
- Builds your plugin before running
- Copies fresh plugin JAR to server

### 3. **Interactive Console**
- Forwards server output to your terminal
- Allows typing commands directly
- Handles Ctrl+C gracefully

### 4. **Clean Workspace**
- Server runs in `run/` directory
- Keeps your project root clean
- Easy to delete and reset

---

## Advanced Gradle Tasks

### Auto-Reload Development Task

Create a task that watches for changes and auto-reloads:

```kotlin
// In buildSrc/src/main/kotlin/DevModeTask.kt
import org.gradle.api.DefaultTask
import org.gradle.api.tasks.TaskAction
import java.nio.file.*

open class DevModeTask : DefaultTask() {
    
    @TaskAction
    fun run() {
        val watchService = FileSystems.getDefault().newWatchService()
        val srcPath = project.file("src/main/java").toPath()
        
        srcPath.register(
            watchService,
            StandardWatchEventKinds.ENTRY_MODIFY,
            StandardWatchEventKinds.ENTRY_CREATE
        )
        
        println("Watching for changes in src/main/java...")
        println("Press Ctrl+C to stop")
        
        while (true) {
            val key = watchService.take()
            
            for (event in key.pollEvents()) {
                println("Change detected: ${event.context()}")
                println("Rebuilding plugin...")
                
                // Trigger rebuild
                project.tasks.findByName("shadowJar")?.actions?.forEach { 
                    it.execute(project.tasks.getByName("shadowJar"))
                }
                
                println("Rebuild complete. Copy to server and reload.")
            }
            
            key.reset()
        }
    }
}
```

### Quick Test Task

Create a task for quick compilation checks:

```kotlin
tasks.register("quickTest") {
    group = "verification"
    description = "Quick compilation and basic checks"
    
    dependsOn("compileJava")
    
    doLast {
        println("✓ Compilation successful")
        println("✓ No syntax errors")
        
        // Check manifest exists
        val manifest = file("src/main/resources/manifest.json")
        if (manifest.exists()) {
            println("✓ Manifest file found")
        } else {
            throw GradleException("✗ Manifest file missing!")
        }
        
        // Check for common issues
        val srcDir = file("src/main/java")
        srcDir.walk().forEach { file ->
            if (file.extension == "java") {
                val content = file.readText()
                
                // Check for System.out.println (should use logger)
                if (content.contains("System.out.println")) {
                    println("⚠ Warning: Found System.out.println in ${file.name}")
                    println("  Consider using a logger instead")
                }
            }
        }
        
        println("\n✓ Quick test passed!")
    }
}
```

---

## Gradle Build Optimizations

### Enable Gradle Daemon

Add to `gradle.properties`:

```properties
# Enable daemon for faster builds
org.gradle.daemon=true

# Increase memory for large projects
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m

# Enable parallel builds
org.gradle.parallel=true

# Enable build cache
org.gradle.caching=true

# Use configuration cache (Gradle 8+)
org.gradle.configuration-cache=true
```

### Optimize ShadowJar Task

```kotlin
tasks.shadowJar {
    // Minimize JAR size
    minimize()
    
    // Relocate dependencies to avoid conflicts
    relocate("com.google.gson", "com.yourplugin.libs.gson")
    
    // Exclude unnecessary files
    exclude("META-INF/*.SF")
    exclude("META-INF/*.DSA")
    exclude("META-INF/*.RSA")
    
    // Set archive name
    archiveBaseName.set("YourPlugin")
    archiveClassifier.set("")
    archiveVersion.set(project.version.toString())
}
```

---

## Multi-Environment Testing

### Test Against Multiple Server Versions

```kotlin
// In build.gradle.kts
val serverVersions = mapOf(
    "latest" to "https://example.com/hytale-latest.jar",
    "stable" to "https://example.com/hytale-stable.jar",
    "beta" to "https://example.com/hytale-beta.jar"
)

serverVersions.forEach { (name, url) ->
    tasks.register("runServer-$name", RunServerTask::class) {
        group = "hytale"
        description = "Run server with $name version"
        jarUrl.set(url)
    }
}

// Usage:
// ./gradlew runServer-latest
// ./gradlew runServer-stable
// ./gradlew runServer-beta
```

---

## Continuous Integration

### GitHub Actions Workflow

Create `.github/workflows/build.yml`:

```yaml
name: Build Plugin

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK 25
      uses: actions/setup-java@v3
      with:
        java-version: '25'
        distribution: 'temurin'
    
    - name: Grant execute permission for gradlew
      run: chmod +x gradlew
    
    - name: Build with Gradle
      run: ./gradlew build
    
    - name: Run tests
      run: ./gradlew test
    
    - name: Upload artifact
      uses: actions/upload-artifact@v3
      with:
        name: plugin-jar
        path: build/libs/*.jar
```

---

## Debugging with Gradle

### Enable Debug Mode

```bash
# Run with debug output
./gradlew runServer --debug

# Run with info output
./gradlew runServer --info

# Run with stack traces
./gradlew runServer --stacktrace
```

### Remote Debugging

Modify the RunServerTask to support remote debugging:

```kotlin
// Add debug flag
val debugMode = project.hasProperty("debug")

val javaArgs = mutableListOf("-jar", jarFile.name)
if (debugMode) {
    javaArgs.add(0, "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005")
    println("Debug mode enabled. Connect debugger to port 5005")
}

val process = ProcessBuilder("java", *javaArgs.toTypedArray())
    .directory(runDir)
    .start()
```

Usage:
```bash
./gradlew runServer -Pdebug
```

Then connect your IDE debugger to `localhost:5005`.

---

## Best Practices

### 1. **Version Control**
```gitignore
# .gitignore
build/
run/
.gradle/
*.jar
!gradle-wrapper.jar
```

### 2. **Clean Task**
```kotlin
tasks.register("cleanRun") {
    group = "hytale"
    description = "Clean run directory"
    
    doLast {
        delete("run")
        println("Run directory cleaned")
    }
}
```

### 3. **Dependency Management**
```kotlin
dependencies {
    // Use compileOnly for server dependencies
    compileOnly(files("libs/hytale-server.jar"))
    
    // Use implementation for bundled dependencies
    implementation("com.google.code.gson:gson:2.10.1")
    
    // Use testImplementation for test dependencies
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.0")
}
```

---

## Troubleshooting

### Common Issues

**Issue: Server JAR not downloading**
```kotlin
// Add timeout and retry logic
val connection = URI.create(jarUrl.get()).toURL().openConnection()
connection.connectTimeout = 30000
connection.readTimeout = 30000
```

**Issue: Plugin not copying**
```kotlin
// Verify shadowJar output
tasks.shadowJar {
    doLast {
        println("Plugin JAR created: ${archiveFile.get().asFile.absolutePath}")
    }
}
```

**Issue: Server not starting**
```bash
# Check Java version
java -version

# Check server JAR is valid
java -jar run/server.jar --version
```

---

## Summary

### Benefits of Gradle Automation:

- **Faster Development**: One command to build, deploy, and test
- **Consistency**: Same environment every time
- **Efficiency**: Smart caching saves time
- **Professional**: Industry-standard build automation

### Key Tasks Created:

1. `runServer` - Build and run server with plugin
2. `quickTest` - Fast compilation checks
3. `cleanRun` - Clean test environment
4. `runServer-{version}` - Test multiple versions

---

## Next Steps

- Customize the RunHytalePlugin for your workflow
- Add more automated checks (linting, formatting)
- Set up CI/CD pipeline
- Create release automation

---
