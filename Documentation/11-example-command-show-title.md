# Example Command to Show Title

**Source:** [Example Command to Show Title](https://hytale.com/)  
**Last Modified:** Friday, January 9, 2026 at 12:02 PM

---

## Overview

This is an example of a command that will showcase a title to the player in-game. This tutorial demonstrates how to create custom commands that display event titles using Hytale's plugin API.

---

## Example Result

When the command is executed, it displays a title message to the player:

![Title Display Example](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/9242449572/original/qpy61JYEhjxNzoghMOA_A4U6ldIDP02_ng.png?1767803050)

---

## Command Implementation

### Complete Code Example:

```java
public class ModdedCommand extends CommandBase {
    
    public ModdedCommand() {
        super("moddedcommand", "A test command", false);
    }
    
    @Override
    protected void executeSync(@Nonnull CommandContext commandContext) {
        commandContext.senderAsPlayer().getWorld().execute(() -> {
            EventTitleUtil.showEventTitleToPlayer(
                commandContext.senderAsPlayer().getReference(),
                Message.raw("It's modded!"),
                Message.raw("Yeppers"),
                true,
                commandContext.senderAsPlayer().getWorld().getEntityStore().getStore()
            );
        });
    }
}
```

---

## Code Breakdown

### 1. Command Constructor

```java
public ModdedCommand() {
    super("moddedcommand", "A test command", false);
}
```

**Parameters:**
- `"moddedcommand"` - The command name (players type `/moddedcommand`)
- `"A test command"` - Description shown in help
- `false` - Whether the command requires operator permissions

---

### 2. Execute Method

```java
@Override
protected void executeSync(@Nonnull CommandContext commandContext) {
    // Command logic here
}
```

- **`executeSync`** - Executes the command synchronously on the server thread
- **`CommandContext`** - Provides context about who ran the command and where

---

### 3. Display Title

```java
commandContext.senderAsPlayer().getWorld().execute(() -> {
    EventTitleUtil.showEventTitleToPlayer(
        commandContext.senderAsPlayer().getReference(),
        Message.raw("It's modded!"),      // Main title
        Message.raw("Yeppers"),            // Subtitle
        true,                               // Show animation
        commandContext.senderAsPlayer().getWorld().getEntityStore().getStore()
    );
});
```

**EventTitleUtil.showEventTitleToPlayer() Parameters:**
1. **Player Reference** - The player to show the title to
2. **Main Title** - Large text displayed (e.g., "It's modded!")
3. **Subtitle** - Smaller text below the title (e.g., "Yeppers")
4. **Show Animation** - Whether to animate the title appearance
5. **Entity Store** - The world's entity storage system

---

## Registering the Command

To use this command in your plugin, register it in your main plugin class:

```java
public class ExamplePlugin extends JavaPlugin {
    
    @Override
    public void onEnable() {
        // Register the command
        getServer().getCommandManager().registerCommand(new ModdedCommand());
        
        getLogger().info("Example plugin enabled!");
    }
}
```

---

## Usage

Once your plugin is loaded:

1. **In-game**, type: `/moddedcommand`
2. The title "It's modded!" with subtitle "Yeppers" will appear on your screen

---

## Customization Ideas

### Change the Messages

```java
Message.raw("Welcome!"),
Message.raw("To the server")
```

### Add Colors (if supported)

```java
Message.raw("§6Golden Title!"),
Message.raw("§bBlue Subtitle")
```

### Make it Player-Specific

```java
Message.raw("Hello, " + commandContext.senderAsPlayer().getName() + "!"),
Message.raw("Welcome back!")
```

---

## Related Commands

You can use similar patterns for:
- **Action Bar Messages** - Text above the hotbar
- **Chat Messages** - Standard chat output
- **Boss Bars** - Progress bars at the top of the screen
- **Particle Effects** - Visual effects for commands

---

## Best Practices

1. **Keep titles short** - Long text may be cut off
2. **Use clear messages** - Players should understand what happened
3. **Consider timing** - Don't spam titles too frequently
4. **Test thoroughly** - Ensure titles display correctly
5. **Handle errors** - Check if the sender is a player before casting

---

## Troubleshooting

### Title doesn't appear:
- Ensure the player is online
- Check that the command is registered properly
- Verify the player has the required permissions

### Command not found:
- Make sure the plugin is loaded (`/plugins` command)
- Check that the command is registered in `onEnable()`
- Verify the plugin's `manifest.json` is correct

### Errors in console:
- Check that all imports are correct
- Ensure you're using the correct API version
- Verify the player reference is valid

---

## Credits

Thank you to **Rick** for helping create this tutorial.

---

## Getting Help

**Official Channels:**
- **Discord:** [Official Hytale Discord](https://discord.gg/hytale)
- **Blog:** [Hytale News](https://hytale.com/news)
