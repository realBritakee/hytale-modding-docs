# Bootstrap/Early Plugins

**Source:** [Bootstrap/Early Plugins](https://hytale.com/)  
**Last Modified:** Friday, January 9, 2026 at 12:01 PM

---

## Important Warning

**Bootstrap/Early Plugins should only be used when absolutely necessary!**

Early plugins run during a critical phase of the loading process and can significantly impact the game's stability and behavior. Most plugins do NOT need to be early plugins.

---

## Overview

Bootstrap/Early Plugins are a special type of plugin that executes **before** the main Hytale server starts. Their primary function is low-level modification, specifically performing **class transformations** that involve altering or injecting bytecode into classes as they are loaded.

---

## What are Early Plugins?

### Key Characteristics:

- **Execute before main server:** Load during game initialization
- **Outside standard plugin environment:** Cannot access regular plugin APIs
- **No access to:** Event buses, registries, or lifecycle callbacks
- **Primary purpose:** Class transformation and bytecode manipulation
- **High risk:** Can cause stability issues if implemented incorrectly

### When to Use Early Plugins:

 **Use early plugins for:**
- Bytecode transformation/modification
- Low-level core game modifications
- Injecting code into existing classes
- Changing fundamental game behavior

âŒ **Do NOT use early plugins for:**
- Adding new items, blocks, or mobs (use Packs instead)
- Implementing game features (use regular Plugins)
- Listening to events (use regular Plugins)
- Configuration management (use regular Plugins)

---

## Loading Early Plugins

### Default Location:

By default, the game loads early plugins from:
```bash
earlyplugins/
```

**Important:** You must create this folder manually - the server does not create it automatically.

### Custom Locations:

Additional paths can be defined using the `--early-plugins` launch argument:
```bash
--early-plugins="C:/path/to/custom/earlyplugins"
```

---

## User Warning System

### Warning Message:

When launching with early plugins installed, users see:

```
===========================================================================
                    Loaded 2 class transformer(s)!!
===========================================================================
             This is unsupported and may cause stability issues.
                           Use at your own risk!!
===========================================================================
Press ENTER to accept and continue...
```

### Skipping the Warning:

- **Manual skip:** Press ENTER key
- **Auto-skip:** Add `--accept-early-plugins` launch argument
- **Singleplayer:** Warning is NOT displayed

---

## Creating Early Plugins

### Basic Requirements:

- Any `.jar` file can be loaded as an early plugin
- **No manifest.json required**
- **No standard entrypoints needed**
- Must implement class transformers via service loader

---

## Class Transformers

Class transformers allow you to modify the bytecode of classes as they are loaded.

### How They Work:

1. Game starts loading classes
2. Before a class is loaded into the JVM
3. Bytes are passed through transformer chain
4. Your transformer modifies the bytes
5. Modified bytes are loaded by JVM

---

## Step 1: Registration

Class transformers are loaded using the **Service Loader** pattern:

### 1.1 Create Transformer Class:

```java
package com.example.early;

import com.hypixel.hytale.plugin.early.ClassTransformer;

public class ExampleTransformer implements ClassTransformer {
    
    @Override
    public byte[] transform(String name, String path, byte[] bytes) {
        // Transformation logic here
        return bytes;
    }
}
```

### 1.2 Create Service Loader File:

**Path:** `src/main/resources/META-INF/services/com.hypixel.hytale.plugin.early.ClassTransformer`

**Contents:**
```bash
com.example.early.ExampleTransformer
```

Add the full qualified name of your transformer class to this file.

---

## Step 2: Transformer Priority

Transformers are executed in priority order:
- **Higher priority** runs BEFORE lower priority
- **Default priority:** 0
- **Negative numbers:** Run later
- **Positive numbers:** Run earlier

### Setting Priority:

```java
@Override
public int priority() {
    return -100;  // Run after most other transformers
}
```

### Priority Examples:

- `100` - Very early (runs first)
- `10` - Early
- `0` - Default (most transformers)
- `-10` - Late
- `-100` - Very late (runs last)

---

## Step 3: Restricted Classes

For safety reasons, transformers **cannot modify** classes from certain packages:

### Restricted Packages:

- `java.*`
- `javax.*`
- `jdk.*`
- `sun.*`
- `com.sun.*`
- `org.bouncycastle.*`
- `io.netty.*`
- `org.objectweb.asm.*`
- `com.google.gson.*`
- `org.slf4j.*`
- `org.apache.logging.*`
- `ch.qos.logback.*`
- `com.google.flogger.*`
- `io.sentry.*`
- `com.hypixel.protoplus.*`
- `com.hypixel.fastutil.*`
- `com.hypixel.hytale.plugin.early.*`

Attempting to transform these will be ignored or cause errors.

---

## Step 4: Writing Transformers

### Transform Method:

```java
@Override
public byte[] transform(String name, String path, byte[] bytes) {
    // name: Fully qualified class name (e.g., "com.hypixel.hytale.server.HytaleServer")
    // path: File path to the class
    // bytes: Original class bytecode
    
    // Return modified bytes, or original bytes if no changes
    return bytes;
}
```

### Basic Transformation Pattern:

```java
@Override
public byte[] transform(String name, String path, byte[] bytes) {
    // Only transform specific class
    if (name.equals("com.hypixel.hytale.server.core.HytaleServer")) {
        // Modify the bytes
        return modifyBytes(bytes);
    }
    
    // Return unchanged for other classes
    return bytes;
}
```

---

## Example: Simple String Replacement Transformer

This example replaces the startup message with a custom one:

```java
import com.hypixel.hytale.plugin.early.ClassTransformer;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;

public class ExampleTransformer implements ClassTransformer {

    @Override
    public byte[] transform(String name, String path, byte[] bytes) {
        if (name.equals("com.hypixel.hytale.server.core.HytaleServer")) {
            return patchString(bytes, 
                "Starting HytaleServer", 
                "Starting Patched HytaleServer >:)");
        }
        return bytes;
    }

    /**
     * Replaces the first occurrence of a string within an array of Java class bytes.
     *
     * @param bytes       The Java class bytes.
     * @param target      The target string to be replaced.
     * @param replacement The string to replace it with.
     * @return The patched class bytes.
     */
    public static byte[] patchString(byte[] bytes, String target, String replacement) {
        final byte[] targetBytes = encodeStringWithLength(target);
        final byte[] replacementBytes = encodeStringWithLength(replacement);
        final int index = indexOf(bytes, targetBytes);
        
        if (index == -1) {
            return bytes;  // Target not found
        }
        
        final byte[] result = new byte[bytes.length - targetBytes.length + replacementBytes.length];
        System.arraycopy(bytes, 0, result, 0, index); // Before the target
        System.arraycopy(replacementBytes, 0, result, index, replacementBytes.length); // Replacement
        System.arraycopy(bytes, index + targetBytes.length, result, index + replacementBytes.length, 
            bytes.length - index - targetBytes.length); // After the target
        
        return result;
    }

    /**
     * Encodes a string as length (short) + UTF_8, 
     * this is the format used in Java bytecode for string constants.
     *
     * @param str The string to encode.
     * @return The encoded string.
     */
    public static byte[] encodeStringWithLength(String str) {
        final byte[] utf8Bytes = str.getBytes(StandardCharsets.UTF_8);
        ByteBuffer buffer = ByteBuffer.allocate(2 + utf8Bytes.length);
        return buffer.putShort((short) utf8Bytes.length).put(utf8Bytes).array();
    }

    /**
     * Finds the first index of a byte array within a larger sequence of bytes.
     *
     * @param array  The sequence of bytes to search through.
     * @param target The target to find.
     * @return The index of the target, or -1 if the target was not found.
     */
    private static int indexOf(byte[] array, byte[] target) {
        outer:
        for (int i = 0; i <= array.length - target.length; i++) {
            for (int j = 0; j < target.length; j++) {
                if (array[i + j] != target[j]) {
                    continue outer;
                }
            }
            return i;
        }
        return -1;
    }
}
```

---

## Advanced: Using ASM Library

For more complex transformations, use the **ASM library**:

### ASM Benefits:

-  Structured bytecode manipulation
-  Visitor pattern for class modification
-  Less error-prone than raw byte manipulation
-  Better maintainability

### Example ASM Transformer:

```java
import com.hypixel.hytale.plugin.early.ClassTransformer;
import org.objectweb.asm.*;

public class AsmTransformer implements ClassTransformer {

    @Override
    public byte[] transform(String name, String path, byte[] bytes) {
        if (name.equals("com.example.TargetClass")) {
            ClassReader reader = new ClassReader(bytes);
            ClassWriter writer = new ClassWriter(reader, 0);
            ClassVisitor visitor = new MyClassVisitor(Opcodes.ASM9, writer);
            reader.accept(visitor, 0);
            return writer.toByteArray();
        }
        return bytes;
    }
    
    private static class MyClassVisitor extends ClassVisitor {
        public MyClassVisitor(int api, ClassVisitor cv) {
            super(api, cv);
        }
        
        @Override
        public MethodVisitor visitMethod(int access, String name, 
                String descriptor, String signature, String[] exceptions) {
            MethodVisitor mv = super.visitMethod(access, name, descriptor, signature, exceptions);
            
            // Modify specific method
            if (name.equals("targetMethod")) {
                return new MethodModifier(api, mv);
            }
            
            return mv;
        }
    }
    
    private static class MethodModifier extends MethodVisitor {
        public MethodModifier(int api, MethodVisitor mv) {
            super(api, mv);
        }
        
        @Override
        public void visitCode() {
            // Inject code at method start
            super.visitCode();
            // Add your bytecode instructions here
        }
    }
}
```

---

## Project Structure

```
your-early-plugin/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── example/
│       │           └── early/
│       │               └── ExampleTransformer.java
│       └── resources/
│           └── META-INF/
│               └── services/
│                   └── com.hypixel.hytale.plugin.early.ClassTransformer
├── build.gradle
└── README.md
```

---

## Building Early Plugins

Use Gradle to build:

```gradle
plugins {
    id 'java'
}

group = 'com.example'
version = '1.0.0'

repositories {
    mavenCentral()
}

dependencies {
    // Add Hytale early plugin API
    compileOnly 'com.hypixel.hytale:early-plugin-api:VERSION'
    
    // ASM for bytecode manipulation (optional)
    implementation 'org.ow2.asm:asm:9.5'
    implementation 'org.ow2.asm:asm-commons:9.5'
}

jar {
    from {
        configurations.runtimeClasspath.collect { 
            it.isDirectory() ? it : zipTree(it) 
        }
    }
}
```

Build command:
```bash
./gradlew build
```

---

## Testing Early Plugins

### 1. Build Plugin JAR
```bash
./gradlew build
```

### 2. Copy to Early Plugins Folder
```bash
cp build/libs/your-plugin.jar /path/to/hytale/earlyplugins/
```

### 3. Launch Hytale
```bash
# With warning
java -jar HytaleServer.jar

# Skip warning
java -jar HytaleServer.jar --accept-early-plugins
```

### 4. Check Logs
Look for:
- "Loaded X class transformer(s)" message
- Your transformer being listed
- No errors during class loading

---

## Debugging Tips

### Add Logging:

```java
@Override
public byte[] transform(String name, String path, byte[] bytes) {
    if (name.equals("target.Class")) {
        System.out.println("Transforming: " + name);
        // Transform logic
        System.out.println("Transform complete!");
    }
    return bytes;
}
```

### Check Transformer is Loaded:

The startup message shows how many transformers loaded:
```bash
Loaded 2 class transformer(s)!!
```

### Verify Bytecode Changes:

Use a Java decompiler to inspect the modified classes:
- JD-GUI
- CFR
- Procyon

---

## Common Pitfalls

### âŒ Modifying restricted classes
```java
// DON'T: This will be ignored
if (name.startsWith("java.")) {
    return modifyBytes(bytes);
}
```

### âŒ Returning null
```java
// DON'T: This will crash
return null;
```

###  Always return valid bytes
```java
// DO: Return original or modified bytes
return bytes;
```

### âŒ Breaking class structure
```java
// DON'T: Corrupt the bytecode
return new byte[]{0, 0, 0};
```

###  Use proper libraries
```java
// DO: Use ASM or similar tools
ClassReader reader = new ClassReader(bytes);
// ... proper transformation
```

---

## Best Practices

1. **Only use when necessary** - Regular plugins are sufficient for 99% of mods
2. **Test thoroughly** - Early plugins can break the entire game
3. **Use ASM or Mixins** - Don't manipulate raw bytes unless you're an expert
4. **Document transformations** - Explain what you're modifying and why
5. **Handle errors gracefully** - Return original bytes if transformation fails
6. **Check compatibility** - Different game versions may have different bytecode

---

## Troubleshooting

### Early plugin not loading:
- Verify JAR is in `earlyplugins/` folder
- Check service loader file exists and is correct
- Ensure class implements `ClassTransformer`

### Game crashes on startup:
- Your transformer may be corrupting bytecode
- Check logs for stack traces
- Try removing transformer to isolate issue
- Validate bytecode with ASM's `CheckClassAdapter`

### Transformations not working:
- Verify class name matches exactly
- Check if class is in restricted packages
- Ensure priority is set correctly
- Add debug logging to confirm method is called

### Service loader file not found:
- Path must be exact: `META-INF/services/com.hypixel.hytale.plugin.early.ClassTransformer`
- File must be in resources folder
- File must contain full class name

---

## Additional Resources

### Recommended Libraries:

- **ASM:** [https://asm.ow2.io/](https://asm.ow2.io/)
- **Mixin:** Fabric's mixin library (if available for Hytale)

### Learning Resources:

- ASM documentation
- JVM bytecode specification
- Java class file format documentation

---

## Getting Help

**Official Channels:**
- **Discord:** [Official Hytale Discord](https://discord.gg/hytale)
- **Blog:** [Hytale News](https://hytale.com/news)


