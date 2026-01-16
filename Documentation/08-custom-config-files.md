# Custom Config Files

**Source:** [Custom Config Files](https://hytale.com/)  
**Last Modified:** Friday, January 9, 2026 at 12:01 PM

---

## Overview

This guide details how to create and register custom configuration files for your Hytale plugins using the server's **Codec system**. Configuration files allow users to customize your plugin's behavior without modifying code.

---

## What are Config Files?

Configuration files:
- Store plugin settings in JSON format
- Allow users to customize plugin behavior
- Persist across game sessions
- Use Hytale's Codec system for serialization/deserialization
- Auto-generate with default values if missing

---

## Understanding the Codec System

Hytale uses **Codecs** to serialize (save) and deserialize (load) data:
- **Codec:** Defines how data is converted to/from JSON
- **BuilderCodec:** Fluent API for building complex codecs
- **KeyedCodec:** Maps a JSON key to a Java field

---

## Step 1: Create the Config Class

The configuration class acts as a data model that defines:
- Variables to be saved in JSON
- How they are serialized/deserialized
- Default values

### Basic Config Class Example:

```java
public class ExampleConfig {

    // 1. Codec definition for serialization/deserialization
    public static final BuilderCodec<ExampleConfig> CODEC = 
        BuilderCodec.builder(ExampleConfig.class, ExampleConfig::new)
            .append(new KeyedCodec<Double>("LuckIncreaseChance", Codec.DOUBLE),
                    (exConfig, aDouble, extraInfo) -> exConfig.LuckIncreaseChance = aDouble,  // Setter
                    (exConfig, extraInfo) -> exConfig.LuckIncreaseChance)                     // Getter
            .add()
            .build();

    // 2. Configuration variable with default value
    private double LuckIncreaseChance = 0.40;

    // 3. Constructor
    public ExampleConfig() {
    }
    
    // 4. Getter method (optional but recommended)
    public double getLuckIncreaseChance() {
        return LuckIncreaseChance;
    }
}
```

---

## Understanding the Codec Builder

Let's break down the codec definition:

```java
BuilderCodec.builder(ExampleConfig.class, ExampleConfig::new)
```
- **First parameter:** The config class type
- **Second parameter:** Constructor reference (how to create new instances)

```java
.append(new KeyedCodec<Double>("LuckIncreaseChance", Codec.DOUBLE),
        (exConfig, aDouble, extraInfo) -> exConfig.LuckIncreaseChance = aDouble,  // Setter
        (exConfig, extraInfo) -> exConfig.LuckIncreaseChance)                     // Getter
```
- **KeyedCodec:** Maps JSON key to field
  - `"LuckIncreaseChance"` - JSON key name
  - `Codec.DOUBLE` - Data type codec
- **Setter lambda:** How to set the value when loading
- **Getter lambda:** How to get the value when saving

```java
.add()
.build();
```
- **add():** Finalizes the current field
- **build():** Completes the codec

---

## Step 2: Register in Main Plugin

For the server to recognize and load the configuration file, register it during plugin initialization:

```java
public class ExamplePlugin extends JavaPlugin {

    private final Config<ExampleConfig> config;

    public ExamplePlugin(@Nonnull JavaPluginInit init) {
        super(init);
        
        // Registers the configuration with the filename "ExamplePlugin"
        this.config = this.withConfig("ExamplePlugin", ExampleConfig.CODEC);
    }
    
    // Access config values
    public double getLuckChance() {
        return this.config.get().getLuckIncreaseChance();
    }
}
```

### Configuration File Location:

The config file will be generated at:
```bash
plugins/com.yourgroup_YourPluginName/ExamplePlugin.example.json
```

**Format:** `{Group}_{Name}/{ConfigName}.example.json`

Where:
- `Group` and `Name` come from your plugin's `manifest.json`
- `ConfigName` is the first parameter to `withConfig()`

---

## Multiple Configuration Values

You can add multiple fields to your config:

```java
public class AdvancedConfig {

    public static final BuilderCodec<AdvancedConfig> CODEC = 
        BuilderCodec.builder(AdvancedConfig.class, AdvancedConfig::new)
            // Double field
            .append(new KeyedCodec<Double>("LuckIncreaseChance", Codec.DOUBLE),
                    (config, value, info) -> config.luckIncreaseChance = value,
                    (config, info) -> config.luckIncreaseChance)
            .add()
            
            // Integer field
            .append(new KeyedCodec<Integer>("MaxPlayers", Codec.INT),
                    (config, value, info) -> config.maxPlayers = value,
                    (config, info) -> config.maxPlayers)
            .add()
            
            // String field
            .append(new KeyedCodec<String>("ServerMessage", Codec.STRING),
                    (config, value, info) -> config.serverMessage = value,
                    (config, info) -> config.serverMessage)
            .add()
            
            // Boolean field
            .append(new KeyedCodec<Boolean>("EnableFeature", Codec.BOOL),
                    (config, value, info) -> config.enableFeature = value,
                    (config, info) -> config.enableFeature)
            .add()
            .build();

    private double luckIncreaseChance = 0.40;
    private int maxPlayers = 100;
    private String serverMessage = "Welcome!";
    private boolean enableFeature = true;

    public AdvancedConfig() {
    }
    
    // Getters
    public double getLuckIncreaseChance() { return luckIncreaseChance; }
    public int getMaxPlayers() { return maxPlayers; }
    public String getServerMessage() { return serverMessage; }
    public boolean isEnableFeature() { return enableFeature; }
}
```

---

## Common Codec Types

| Java Type | Codec | Example Value |
|-----------|-------|---------------|
| `Double` | `Codec.DOUBLE` | `0.40` |
| `Integer` | `Codec.INT` | `100` |
| `String` | `Codec.STRING` | `"Hello"` |
| `Boolean` | `Codec.BOOL` | `true` |
| `Long` | `Codec.LONG` | `1000000L` |
| `Float` | `Codec.FLOAT` | `1.5f` |

---

## Generated JSON File Example

When your plugin runs, it generates a JSON file like this:

```json
{
  "LuckIncreaseChance": 0.40,
  "MaxPlayers": 100,
  "ServerMessage": "Welcome!",
  "EnableFeature": true
}
```

Users can edit this file to customize settings, and changes take effect on plugin reload or server restart.

---

## Accessing Config Values

### In Your Plugin Class:

```java
public class ExamplePlugin extends JavaPlugin {

    private final Config<ExampleConfig> config;

    public ExamplePlugin(@Nonnull JavaPluginInit init) {
        super(init);
        this.config = this.withConfig("ExamplePlugin", ExampleConfig.CODEC);
    }

    public void someMethod() {
        // Access config value
        double luckChance = this.config.get().getLuckIncreaseChance();
        
        // Use the value
        if (Math.random() < luckChance) {
            getLogger().info("Lucky event triggered!");
        }
    }
}
```

### From Other Classes:

Pass the config or specific values as parameters:

```java
public class FeatureManager {
    
    private final double luckChance;
    
    public FeatureManager(double luckChance) {
        this.luckChance = luckChance;
    }
    
    public void checkLuck() {
        if (Math.random() < luckChance) {
            // Do something lucky
        }
    }
}
```

```java
// In your plugin
FeatureManager manager = new FeatureManager(
    this.config.get().getLuckIncreaseChance()
);
```

---

## Advanced: List/Array Configurations

For more complex configs with lists or objects, you can use advanced codecs:

```java
// Example: List of strings
.append(new KeyedCodec<List<String>>("AllowedItems", 
        Codec.STRING.listOf()),
        (config, value, info) -> config.allowedItems = value,
        (config, info) -> config.allowedItems)
.add()
```

---

## Config Reload

If you want to support config reloading without restarting:

```java
public void reloadConfig() {
    // The config automatically reloads from file
    getLogger().info("Config reloaded!");
    
    // Access new values
    double newChance = this.config.get().getLuckIncreaseChance();
    getLogger().info("New luck chance: " + newChance);
}
```

---

## Best Practices

### 1. Use Sensible Defaults
```java
private double luckIncreaseChance = 0.40;  // 40% - balanced default
```

### 2. Document Your Config
Add comments in your code explaining what each setting does:
```java
// Percentage chance (0.0 to 1.0) for luck increase events
private double luckIncreaseChance = 0.40;
```

### 3. Validate Values
```java
public double getLuckIncreaseChance() {
    // Ensure value is between 0 and 1
    return Math.max(0.0, Math.min(1.0, luckIncreaseChance));
}
```

### 4. Provide Examples
Include an example config in your documentation showing all available options.

---

## Troubleshooting

### Config file not generated:
- Verify `withConfig()` is called in plugin constructor
- Check plugin manifest is correct
- Ensure plugin loads successfully (check logs)

### Values not loading:
- Verify JSON syntax is valid
- Check key names match exactly (case-sensitive)
- Ensure data types match codec definitions

### Changes not taking effect:
- Restart the server after editing config
- If using reload, ensure reload method is properly implemented
- Check for cached values

### Default values not working:
- Verify field initialization: `private double value = 0.40;`
- Check constructor doesn't override defaults
- Ensure codec is built correctly

---

## Complete Example

Here's a full working example:

```java
// Config class
public class MyPluginConfig {

    public static final BuilderCodec<MyPluginConfig> CODEC = 
        BuilderCodec.builder(MyPluginConfig.class, MyPluginConfig::new)
            .append(new KeyedCodec<Double>("DropRateMultiplier", Codec.DOUBLE),
                    (cfg, val, info) -> cfg.dropRateMultiplier = val,
                    (cfg, info) -> cfg.dropRateMultiplier)
            .add()
            .append(new KeyedCodec<Boolean>("EnableDebugMode", Codec.BOOL),
                    (cfg, val, info) -> cfg.enableDebugMode = val,
                    (cfg, info) -> cfg.enableDebugMode)
            .add()
            .build();

    private double dropRateMultiplier = 1.0;
    private boolean enableDebugMode = false;

    public MyPluginConfig() {
    }

    public double getDropRateMultiplier() {
        return dropRateMultiplier;
    }

    public boolean isDebugMode() {
        return enableDebugMode;
    }
}

// Plugin class
public class MyPlugin extends JavaPlugin {

    private final Config<MyPluginConfig> config;

    public MyPlugin(@Nonnull JavaPluginInit init) {
        super(init);
        this.config = this.withConfig("MyPlugin", MyPluginConfig.CODEC);
        
        // Log loaded values
        getLogger().info("Drop rate multiplier: " + 
            config.get().getDropRateMultiplier());
        getLogger().info("Debug mode: " + 
            config.get().isDebugMode());
    }
}
```

---

## Getting Help

**Official Channels:**
- **Discord:** [Official Hytale Discord](https://discord.gg/hytale)
- **Blog:** [Hytale News](https://hytale.com/news)


