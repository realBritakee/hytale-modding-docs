# Getting Started with Plugins

**Source:** [Getting Started with Plugins](https://hytale.com/)  
**Last Modified:** Friday, January 16, 2026 at 07:30 AM

---

## Overview

This guide will help you get started with creating **Plugins** for Hytale. Plugins are mods written in **Java** that use the game's API to expand vanilla functionality and add new content programmatically.

> ⚠️ **Early Access Warning**: The game Hytale is in early access, and so is this project! Features may be incomplete, unstable, or change frequently. Please be patient and understanding as development continues.

---

## Prerequisites

Before you begin, ensure you have:
- **Hytale** installed via the official launcher
- **IntelliJ IDEA** (Community Edition is fine)
- **Java 25** downloaded and configured
- Basic **Java programming** knowledge

---

## Step 1: Download the IDEA Template

The easiest way to start developing plugins is by using the official template created by **Darkhax & Jared**.

### Plugin Template:
- **Hytale Plugin Template:** [Github Repo](https://github.com/realBritakee/hytale-template-plugin)

### Template Features:

The template includes many great features:
- Adds the latest Hytale server files to your classpath
- Run the game from your IDE with breakpoint support
- Bundle assets with your plugin (editable with in-game Asset Editor)
- Supports various patch lines (releases and pre-releases)
- Includes example code and assets
- Pre-configured Gradle build system

---

## Step 2: Configure the Template Before Importing

> **Important:** Configure the project before importing it into IDEA to avoid caching issues later.

### 2.1 Extract the Template

1. Download the ZIP file from the GitHub repository
2. Extract contents to your desired development location
3. Read the included `README.md` for detailed setup instructions

### 2.2 Configure Project Files

Before importing the project, you need to configure three key files:

#### 1. Set Project Name in `settings.gradle`

Set the name of your project. Use capitalized names and avoid whitespace and special characters, as this will be used as the base name for files produced by Gradle (like the JAR file).

```gradle
rootProject.name = 'your-plugin-name'
```

#### 2. Review Gradle Properties in `gradle.properties`

Update the properties to match your project:

```properties
# Change maven_group to match your project
maven_group = com.yourname
# Update version before making new releases
version = 1.0.0
# ... other properties
```

#### 3. Update Manifest File in `src/main/resources/manifest.json`

The manifest file provides important information about your plugin to Hytale. Update every property to reflect your project:

```json
{
  "Group": "com.yourname",
  "Name": "YourPluginName",
  "Main": "com.yourname.yourplugin.YourPlugin",
  "Version": "1.0.0",
  "Description": "Description of your plugin",
  "Authors": [
    {
      "Name": "Your Name",
      "Email": "your.email@example.com",
      "Url": "https://your-website.com"
    }
  ],
  "Website": "https://your-plugin-website.com",
  "ServerVersion": "*",
  "Dependencies": {},
  "OptionalDependencies": {},
  "DisabledByDefault": false
}
```

**Important Manifest Properties:**
- **Main**: The most critical property - tells the game which class file to load as the entry point for your plugin
- **Version** and **IncludesAssetPack**: These are automatically updated by Gradle during development and builds, allowing you to use the in-game asset editor

---

## Step 3: Import the Project into IDEA

1. **Launch IntelliJ IDEA**
2. **Open Project:**
   - Click `File` → `Open`
   - Navigate to your extracted and configured template folder
   - Select the folder and click `OK`
3. **Wait for Initialization:**
   - IDEA will automatically import the Gradle project
   - The `HytaleServer` run configuration will be created automatically
   - A `./run` folder will be generated
   - Dependencies will be downloaded automatically
   - This may take several minutes on first run

> **Note:** If you don't see the `HytaleServer` run configuration, open the dropdown menu or click "Edit Configurations..." once to unhide it.

---

## Step 4: Configure Java 25 SDK

If you haven't already added Java 25 as an SDK:

1. **Open Project Structure:**
   - `File` → `Project Structure` (or `Ctrl+Alt+Shift+S`)
2. **Add SDK:**
   - Click `SDKs` under `Platform Settings`
   - Click `+` → `Add JDK`
   - Navigate to your Java 25 installation
   - Click `OK`
3. **Set Project SDK:**
   - Go to `Project` settings
   - Set `SDK` to Java 25
   - Click `Apply` and `OK`

---

## Step 5: Understanding the Project Structure

```
your-plugin-name/
|-- src/
|   `-- main/
|       |-- java/
|       |   `-- com/
|       |       `-- yourname/
|       |           `-- yourplugin/
|       |               `-- YourPlugin.java
|       `-- resources/
|           |-- manifest.json
|           |-- Common/          # Assets (models, textures)
|           `-- Server/          # Server-side data
|-- build.gradle
|-- settings.gradle
|-- gradle.properties
|-- README.md
`-- run/                         # Generated when you run the server
```

---

## Step 6: Authenticating Your Test Server

> **CRITICAL:** You MUST authenticate your test server before you can connect to it!

### Initial Authentication

1. Run the server once from IDEA (it will start but you won't be able to connect yet)
2. In the server terminal, run:
   ```
   auth login device
   ```
3. The command will print a URL
4. Open the URL in your browser and authenticate using your Hytale account

### Persistent Authentication

After authenticating once, run this command to keep your server authenticated after restarting:
```
auth persistence Encrypted
```

> ⚠️ **Security Warning:** Never share your encrypted auth file with anyone!

### Alternative: Authenticate from Code

If you're unable to run commands from the IDEA terminal, you can authenticate from code:

```java
@Override
protected void start() {
    CommandManager.get().handleCommand(ConsoleSender.INSTANCE, "auth login device");
}
```

**Important:** Remove this code after your server is authenticated!

---

## Step 7: Running the Game from IDEA

### Using the Pre-configured Run Configuration

1. **Select Run Configuration:**
   - Look for the dropdown in the top-right of IDEA
   - Select `HytaleServer`
2. **Run or Debug:**
   - Click the green play button to run
   - Click the bug button to debug with breakpoints
3. **Server Starts:**
   - Hytale server will start with your plugin loaded
   - Default assets from the game will be loaded into the `./run` folder
   - You can set breakpoints in your code
   - Debug console shows plugin output

### Connecting to Your Local Server

Once the server is running:

1. **Launch the standard Hytale client** (not from IDEA)
2. **Connect to Local Server:**
   - The server should appear automatically
   - If it doesn't, manually add the IP: `127.0.0.1`
3. **Join the server** to test your plugin

---

## Step 8: Verifying the Example Plugin

The template includes an example plugin you can use to verify everything is working:

### Test Command

Run the `/test` command in-game. It will print the name and version of your plugin.

> **Note:** This is for demonstration purposes and should be removed before your final release.

### Example Recipe

The example plugin includes a recipe that allows you to craft 10 dirt into 1 dirt using the crafting window. This demonstrates how assets can be bundled with your plugin.

> **Note:** This example should also be removed before release.

---

## Step 9: Building Your Plugin

To create a shareable JAR file of your plugin:

### Build with Gradle

**Option 1: Terminal**
```bash
./gradlew build
```

**Option 2: IDEA Gradle Panel**
1. Open the Gradle panel (right side of IDEA)
2. Navigate to: `Tasks` → `build` → `build`
3. Double-click `build`

### Output Location

Your plugin JAR will be located at:
```bash
build/libs/your-plugin-name-1.0.0.jar
```

---

## Step 10: Installing Plugins in Hytale

### Installation Path

```
%appdata%/Hytale/UserData/Mods/
```

**Full Path (Windows):**
```
C:\Users\YourUsername\AppData\Roaming\Hytale\UserData\Mods\
```

### Installation Steps

1. **Create Mods Folder** (if it doesn't exist)
2. **Copy your plugin JAR** into the `Mods/` folder
3. **Launch Hytale**
4. Your plugin will be loaded automatically

---

## Alternative IDE Support

### Using VSCode

While VSCode is not officially supported, you can generate launch configurations by running:

```bash
./gradlew generateVSCodeLaunch
```

---

## Example Plugin Code

Here's a basic plugin structure:

```java
package com.yourname.yourplugin;

import com.hypixel.hytale.plugin.JavaPlugin;
import com.hypixel.hytale.plugin.JavaPluginInit;
import javax.annotation.Nonnull;

public class YourPlugin extends JavaPlugin {

    public YourPlugin(@Nonnull JavaPluginInit init) {
        super(init);
        
        // Plugin initialization code
        getLogger().info("YourPlugin has been loaded!");
    }

    @Override
    public void onEnable() {
        // Called when plugin is enabled
        getLogger().info("YourPlugin enabled!");
    }

    @Override
    public void onDisable() {
        // Called when plugin is disabled
        getLogger().info("YourPlugin disabled!");
    }
}
```

---

## Plugin Development Tips

### 1. Use the Logger
```java
getLogger().info("Information message");
getLogger().warn("Warning message");
getLogger().error("Error message");
```

### 2. Register Event Listeners
```java
getServer().getPluginManager().registerEvents(new MyListener(), this);
```

### 3. Access the API
The template includes Hytale's API in the classpath:
- Explore the API through IntelliJ's autocomplete
- Check the example code included in the template
- Browse available classes and methods

### 4. Bundle Assets
You can include Packs (assets) with your Plugin:
- Add assets to `src/main/resources/Common/` and `Server/`
- They'll be bundled with your plugin JAR
- Editable in-game via the Asset Editor

---

## Debugging Tips

### Breakpoints
1. Click in the left margin next to a line number
2. A red dot appears indicating a breakpoint
3. Run in Debug mode (bug icon)
4. Execution pauses at breakpoints

### Console Output
- Plugin logs appear in the IDEA console
- Use `getLogger()` for clean output
- Check for error stack traces

### Hot Reload
- Some changes can be reloaded without restarting
- Rebuild the project (`Ctrl+F9`)
- Major changes require a full restart

---

## Troubleshooting

### Gradle sync fails
- Check internet connection (downloads dependencies)
- Verify Java 25 is properly installed
- Try: `./gradlew clean build`

### HytaleServer run config missing
- Re-import Gradle project
- Check `build.gradle` for run configuration setup
- Open the run configuration dropdown or click "Edit Configurations..." to unhide it

### Plugin doesn't load
- Verify `manifest.json` is correct (especially the `Main` property)
- Check logs for error messages
- Ensure plugin JAR is in correct Mods folder
- Confirm Hytale version compatibility

### Cannot connect to local server
- Ensure you've authenticated the server with `auth login device`
- Verify the server is running (check IDEA console)
- Try manually adding IP: `127.0.0.1`

### Breakpoints don't work
- Ensure you're running in Debug mode (bug icon)
- Verify breakpoint is in executed code
- Check that source code matches compiled JAR

---

## Getting Help

**Official Channels:**
- **Discord:** [Official Hytale Discord](https://discord.gg/hytale)
- **Blog:** [Hytale News](https://hytale.com/news)