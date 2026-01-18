# Example Command to Show Title

**Source:** [Official Hytale Resources](https://hytale.com/)

**Last Modified:** Friday, January 9, 2026 at 12:02 PM

---

## Overview

This tutorial demonstrates how to create custom commands that display event titles using Hytale's plugin API. Titles are a powerful way to provide visual feedback to players during events, achievements, or system announcements.

---

## Example Result

When executed, the command displays a high-impact title and subtitle directly on the player's screen.

---

## Command Implementation

### Complete Code Example:

```java
public class ModdedCommand extends CommandBase {
    
    public ModdedCommand() {
        // Name, Description, Requires OP
        super("moddedcommand", "A test command", false);
    }
    
    @Override
    protected void executeSync(@Nonnull CommandContext commandContext) {
        // Ensure the sender is a player before proceeding
        commandContext.senderAs(Player.class).getWorld().execute(() -> {
            EventTitleUtil.showEventTitleToPlayer(
                    commandContext.senderAs(Player.class).getPlayerRef(),
                    Message.raw("It's modded!"), // Main Title
                    Message.raw("Yeppers"),      // Subtitle
                    true                         // isMajor (Shows gold bars/animation)
            );
        });
    }
}

```

---

## Code Breakdown

### 1. Command Constructor

The `super` call defines how players interact with the command in the chat console.

* **`"moddedcommand"`**: The trigger (e.g., `/moddedcommand`).
* **`"A test command"`**: The tooltip shown in the `/help` menu.
* **`false`**: Setting this to `true` would restrict the command to server operators.

### 2. The Execute Method

* **`executeSync`**: This method runs on the main server thread, making it safe to access world data.
* **`CommandContext`**: Contains data about the `sender`, the `world`, and any `arguments` passed.

### 3. EventTitleUtil Parameters

The `EventTitleUtil` class handles the packet logic for you:

* **Player Reference**: Obtained via `commandContext.senderAs(Player.class).getPlayerRef()`.
* **Main/Subtitle**: Wrapped in `Message.raw()` to handle plain text.
* **Is Major**: If set to `true`, the title displays with "major" styling (often including decorative bars and a more pronounced animation).

---

## Registering the Command

To activate your command, register it within the `onEnable()` method of your main plugin class.

```java
public class ExamplePlugin extends JavaPlugin {

    @Override
    protected void setup() {
        this.getCommandRegistry().registerCommand(new ModdedCommand());
    }
}

```

---

## Customization & Styling

### Using Colors

You can use standard Hytale color codes (e.g., `&6` for Gold, `&b` for Aqua) within your messages:

```java
Message.raw("&6CONGRATULATIONS!")
Message.raw("&bYou found a secret area.")

```

### Formatting the Duration

While the basic utility uses default timings, you can also specify fade-in, stay, and fade-out durations using advanced overloads of the `EventTitleUtil` (if available in your API version).

---

## Best Practices

* **Thread Safety**: Always wrap world-altering or visual logic in a `world.execute()` block to ensure it runs on the correct synchronization cycle.
* **Player Validation**: Before calling `senderAs(Player.class)`, verify the sender is actually a player (and not the console) to avoid `NullPointerExceptions`.
* **Clarity**: Avoid using titles for frequent spam; they are best reserved for significant milestones to maintain their visual impact.

---

## Getting Help

**Official Channels:**

* **Discord:** [Official Hytale Discord](https://discord.gg/hytale)
* **Blog:** [Hytale News](https://hytale.com/news)
