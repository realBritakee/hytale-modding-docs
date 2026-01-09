# Getting Started with Plugins

**Source:** [Getting Started with Plugins](https://hytale.com/)  
**Last Modified:** Friday, January 9, 2026 at 12:09 PM

---

## Overview

This guide will help you get started with creating **Plugins** for Hytale. Plugins are mods written in **Java** that use the game's API to expand vanilla functionality and add new content programmatically.

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

### Download Options:

- **Zip File:** (Link TBC - Check Community documentation)
- **GitHub Repo:** (Link TBC - Check Community documentation)

### Template Features:

The template includes many great features:
-  Adds the latest Hytale server files to your classpath
-  Run the game from your IDE with breakpoint support
-  Bundle assets with your plugin (editable with in-game Asset Editor)
-  Supports various patch lines (releases and pre-releases)
-  Includes example code and assets
-  Pre-configured Gradle build system

---

## Step 2: Setup the Template

### 2.1 Extract the Template

1. Download the ZIP file
2. Extract contents to your desired development location
3. Read the included `README.md` for detailed setup instructions

### 2.2 Complete Prerequisites Checklist

Ensure you have completed all the following before proceeding:

####  Prerequisites Checklist:

1. **Download Hytale** using the official launcher
2. **Install IntelliJ IDEA** (Community Edition is sufficient)
3. **Download Java 25** and add it as an SDK in IDEA
4. **Set your project name** in `settings.gradle`
5. **Review the properties** in `gradle.properties`
6. **Update the manifest** in `src/main/resources/manifest.json`

---

## Step 3: Configure Your Project

### 3.1 Set Project Name

Edit `settings.gradle`:

```gradle
rootProject.name = 'your-plugin-name'
```

### 3.2 Review Gradle Properties

Open and review `gradle.properties`:

```properties
# Example properties (actual values may vary)
hytale_version=latest
plugin_version=1.0.0
# ... other properties
```

### 3.3 Update Manifest File

Edit `src/main/resources/manifest.json` with your project information:

```json
{
  "Group": "com.yourname",
  "Name": "YourPluginName",
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

---

## Step 4: Open the Project in IDEA

1. **Launch IntelliJ IDEA**
2. **Open Project:**
   - Click `File` –†’ `Open`
   - Navigate to your extracted template folder
   - Select the folder and click `OK`
3. **Wait for Initialization:**
   - IDEA will import the Gradle project
   - Dependencies will be downloaded automatically
   - This may take several minutes on first run

---

## Step 5: Configure Java 25 SDK

If you haven't already added Java 25 as an SDK:

1. **Open Project Structure:**
   - `File` –†’ `Project Structure` (or `Ctrl+Alt+Shift+S`)
2. **Add SDK:**
   - Click `SDKs` under `Platform Settings`
   - Click `+` –†’ `Add JDK`
   - Navigate to your Java 25 installation
   - Click `OK`
3. **Set Project SDK:**
   - Go to `Project` settings
   - Set `SDK` to Java 25
   - Click `Apply` and `OK`

---

## Step 6: Understanding the Project Structure

```
your-plugin-name/
–”œ–”€–”€ src/
–”‚   –””–”€–”€ main/
–”‚       –”œ–”€–”€ java/
–”‚       –”‚   –””–”€–”€ com/
–”‚       –”‚       –””–”€–”€ yourname/
–”‚       –”‚           –””–”€–”€ yourplugin/
–”‚       –”‚               –””–”€–”€ YourPlugin.java
–”‚       –””–”€–”€ resources/
–”‚           –”œ–”€–”€ manifest.json
–”‚           –”œ–”€–”€ Common/          # Assets (models, textures)
–”‚           –””–”€–”€ Server/          # Server-side data
–”œ–”€–”€ build.gradle
–”œ–”€–”€ settings.gradle
–”œ–”€–”€ gradle.properties
–””–”€–”€ README.md
```

---

## Step 7: Running the Game from IDEA

### Pre-configured Run Configuration

The template includes a run configuration called **HytaleServer**:

1. **Select Run Configuration:**
   - Look for the dropdown in the top-right of IDEA
   - Select `HytaleServer`
2. **Run or Debug:**
   - Click the green play button to run
   - Click the bug button to debug with breakpoints
3. **Game Launches:**
   - Hytale will start with your plugin loaded
   - You can set breakpoints in your code
   - Debug console shows plugin output

---

## Step 8: Building Your Plugin

To create a shareable JAR file of your plugin:

### Build with Gradle:

**Option 1: Terminal**
```bash
./gradlew build
```

**Option 2: IDEA Gradle Panel**
1. Open the Gradle panel (right side of IDEA)
2. Navigate to: `Tasks` –†’ `build` –†’ `build`
3. Double-click `build`

### Output Location:

Your plugin JAR will be in:
```bash
build/libs/your-plugin-name-1.0.0.jar
```

---

## Step 9: Installing Plugins

To install plugins in Hytale:

### Installation Path:

```
%appdata%/Hytale/UserData/Mods/
```

**Full Path (Windows):**
```
C:\Users\YourUsername\AppData\Roaming\Hytale\UserData\Mods\
```

### Installation Steps:

1. **Create Mods Folder** (if it doesn't exist)
2. **Copy your plugin JAR** into the `Mods/` folder
3. **Launch Hytale**
4. Your plugin will be loaded automatically

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
3. Run in Debug mode
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

## Next Steps

After setting up your plugin development environment:

1. **Explore the API** - Browse available classes and methods
2. **Read Example Code** - Study the included examples
3. **Create Custom Features** - Start implementing your ideas
4. **Use Config Files** - See "Custom Config Files" tutorial
5. **Advanced Modding** - Explore "Bootstrap/Early Plugins" if needed

---

## Troubleshooting

### Gradle sync fails:
- Check internet connection (downloads dependencies)
- Verify Java 25 is properly installed
- Try: `./gradlew clean build`

### HytaleServer run config missing:
- Re-import Gradle project
- Check `build.gradle` for run configuration setup
- Manually create run configuration if needed

### Plugin doesn't load:
- Verify manifest.json is correct
- Check logs for error messages
- Ensure plugin JAR is in correct Mods folder
- Confirm Hytale version compatibility

### Breakpoints don't work:
- Ensure you're running in Debug mode (bug icon)
- Verify breakpoint is in executed code
- Check that source code matches compiled JAR

---

## Additional Resources

### Official Links:
- **Blockbench:** [https://www.blockbench.net/](https://www.blockbench.net/)
- **Hytale Modding Wiki:** (Link TBC)
- **Community Discord:** Get community help

### Related Tutorials:
- Custom Config Files
- Bootstrap/Early Plugins
- Useful Tools & Links

---

## Credits

This guide was created by **Darkhax**, **Jared**, and **Rick**.

---


