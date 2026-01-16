# Common Plugin Features & Examples

**Last Modified:** Friday, January 10, 2026

---

## Overview

This guide provides practical implementations of common features found in Hytale server plugins. These are real-world examples that you can adapt for your own plugins.

---

## Placeholder System

Placeholders allow you to insert dynamic values into messages, like player names, balances, or timestamps. Format: `%placeholder_name%`

### Basic Placeholder Implementation

```java
// Placeholder Provider Interface
public interface PlaceholderProvider {
    String getName();           // Human-readable name
    String getIdentifier();     // Unique identifier (e.g., "player_name")
    String parse(Player player, String input);  // Replace placeholder with value
}

// Example: Player Name Placeholder
public class PlayerNamePlaceholder implements PlaceholderProvider {
    
    public static final PlayerNamePlaceholder INSTANCE = new PlayerNamePlaceholder();
    
    private PlayerNamePlaceholder() {} // Singleton
    
    @Override
    public String getName() {
        return "Player Name";
    }
    
    @Override
    public String getIdentifier() {
        return "player_name";
    }
    
    @Override
    public String parse(Player player, String input) {
        return player.getUsername();
    }
}

// Example: Player Balance Placeholder
public class PlayerBalancePlaceholder implements PlaceholderProvider {
    
    public static final PlayerBalancePlaceholder INSTANCE = new PlayerBalancePlaceholder();
    
    private PlayerBalancePlaceholder() {}
    
    @Override
    public String getName() {
        return "Player Balance";
    }
    
    @Override
    public String getIdentifier() {
        return "player_balance";
    }
    
    @Override
    public String parse(Player player, String input) {
        double balance = EconomyService.getBalance(player);
        return NumberUtils.formatNumber(balance); // "1.5k" instead of "1500"
    }
}
```

### Placeholder Service

```java
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class PlaceholderService {
    
    private static PlaceholderService instance;
    private final Map<String, PlaceholderProvider> providers;
    
    public PlaceholderService() {
        this.providers = new ConcurrentHashMap<>();
    }
    
    public static PlaceholderService get() {
        if (instance == null) {
            instance = new PlaceholderService();
        }
        return instance;
    }
    
    public void registerProvider(PlaceholderProvider provider) {
        if (providers.containsKey(provider.getIdentifier())) {
            throw new IllegalArgumentException(
                "Placeholder '" + provider.getIdentifier() + "' already registered"
            );
        }
        providers.put(provider.getIdentifier(), provider);
    }
    
    public void unregisterProvider(PlaceholderProvider provider) {
        providers.remove(provider.getIdentifier());
    }
    
    public String parse(Player player, String input) {
        String result = input;
        
        for (PlaceholderProvider provider : providers.values()) {
            String placeholder = "%" + provider.getIdentifier() + "%";
            if (result.contains(placeholder)) {
                String replacement = provider.parse(player, result);
                result = result.replace(placeholder, replacement);
            }
        }
        
        return result;
    }
}
```

### Registering Placeholders

```java
public class MyPlugin extends JavaPlugin {
    
    @Override
    public void onEnable() {
        // Register built-in placeholders
        PlaceholderService service = PlaceholderService.get();
        service.registerProvider(PlayerNamePlaceholder.INSTANCE);
        service.registerProvider(PlayerBalancePlaceholder.INSTANCE);
        service.registerProvider(PlayerUuidPlaceholder.INSTANCE);
        service.registerProvider(PlayerPlayTimePlaceholder.INSTANCE);
        
        getLogger().info("Registered " + service.getProviderCount() + " placeholders");
    }
}
```

### Using Placeholders

```java
// In your config
String welcomeMessage = "Welcome %player_name%! Your balance: %player_balance%";

// Parse and send
Player player = event.getPlayer();
String parsed = PlaceholderService.get().parse(player, welcomeMessage);
player.sendMessage(parsed);
// Output: "Welcome Steve! Your balance: 1.5k"
```

---

## Translation/i18n System

Support multiple languages in your plugin with a translation system.

### Message Class

```java
public class Message {
    
    private final String key;
    private final String raw;
    private String parsed;
    
    public Message(String key, String message) {
        this.key = key;
        this.raw = message;
        this.parsed = message;
    }
    
    // Replace placeholders (supports both {placeholder} and %placeholder%)
    public Message replace(String placeholder, String replacement) {
        this.parsed = this.parsed
            .replace("{" + placeholder + "}", replacement)
            .replace("%" + placeholder + "%", replacement);
        return this;
    }
    
    // Send to player
    public void sendTo(Player player) {
        if (player.isOnline()) {
            player.sendMessage(this.parsed);
        }
    }
    
    public String getKey() {
        return key;
    }
    
    public String getRawMessage() {
        return raw;
    }
    
    public String getParsedMessage() {
        return parsed;
    }
}
```

### Translation Service

```java
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class TranslationService {
    
    private final Map<String, Message> messages;
    
    public TranslationService() {
        this.messages = new ConcurrentHashMap<>();
    }
    
    public TranslationService addMessage(String key, String message) {
        this.messages.put(key, new Message(key, message));
        return this;
    }
    
    public Message getMessage(String key) {
        Message message = this.messages.get(key);
        if (message == null) {
            // Return default if missing
            return new Message(key, "Missing translation: " + key);
        }
        
        // Return copy to prevent external modification
        return new Message(message.getKey(), message.getRawMessage());
    }
}
```

### Loading Translations from JSON

```json
{
  "messages": {
    "welcome": "Welcome {player_name} to the server!",
    "goodbye": "Goodbye {player_name}, see you soon!",
    "banned": "You are banned: {reason}",
    "muted": "You are muted for {duration}",
    "balance": "Your balance: {amount} coins"
  }
}
```

```java
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.FileReader;

public void loadTranslations(File file) {
    try (FileReader reader = new FileReader(file)) {
        JsonObject json = JsonParser.parseReader(reader).getAsJsonObject();
        JsonObject messages = json.getAsJsonObject("messages");
        
        for (String key : messages.keySet()) {
            String value = messages.get(key).getAsString();
            translationService.addMessage(key, value);
        }
        
        getLogger().info("Loaded " + messages.size() + " translations");
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

### Using Translations

```java
// Get message and replace placeholders
Message msg = translationService.getMessage("welcome")
    .replace("player_name", player.getUsername());

// Send to player
msg.sendTo(player);

// Or get as string
String text = msg.getParsedMessage();
```

---

## Utility Classes

### Time Formatting

```java
import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeUtils {
    
    private static final SimpleDateFormat DATE_FORMAT = 
        new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    
    /**
     * Format milliseconds to human-readable duration
     * Example: 90061000 -> "1d 1h 1m 1s"
     */
    public static String formatTime(long millis) {
        long seconds = millis / 1000;
        long minutes = seconds / 60;
        long hours = minutes / 60;
        long days = hours / 24;
        
        seconds %= 60;
        minutes %= 60;
        hours %= 24;
        
        StringBuilder result = new StringBuilder();
        if (days > 0) result.append(days).append("d ");
        if (hours > 0 || days > 0) result.append(hours).append("h ");
        if (minutes > 0 || hours > 0 || days > 0) result.append(minutes).append("m ");
        result.append(seconds).append("s");
        
        return result.toString().trim();
    }
    
    /**
     * Format timestamp to date string
     * Example: 1704844800000 -> "2024-01-10 12:00:00"
     */
    public static String formatDate(long timestamp) {
        return DATE_FORMAT.format(new Date(timestamp));
    }
}

// Usage:
long playTime = 3661000; // 1 hour, 1 minute, 1 second
String formatted = TimeUtils.formatTime(playTime);
player.sendMessage("Play time: " + formatted); // "Play time: 1h 1m 1s"
```

### Number Formatting

```java
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Locale;

public class NumberUtils {
    
    private static final String[] SUFFIXES = {"", "k", "m", "b", "t", "q", "Q"};
    private static final DecimalFormat FORMAT;
    
    static {
        DecimalFormatSymbols symbols = new DecimalFormatSymbols(Locale.US);
        FORMAT = new DecimalFormat("#.##", symbols);
    }
    
    /**
     * Format large numbers with suffixes
     * Examples:
     *   1000 -> "1k"
     *   1500 -> "1.5k"
     *   1000000 -> "1m"
     *   1234567 -> "1.23m"
     */
    public static String formatNumber(double value) {
        if (Double.isNaN(value) || Double.isInfinite(value)) {
            return String.valueOf(value);
        }
        
        double absValue = Math.abs(value);
        
        int suffixIndex = 0;
        if (absValue >= 1000) {
            suffixIndex = (int) (Math.log10(absValue) / 3);
            suffixIndex = Math.min(suffixIndex, SUFFIXES.length - 1);
        }
        
        double scaledValue = value / Math.pow(1000, suffixIndex);
        String formatted = FORMAT.format(scaledValue);
        
        return formatted + SUFFIXES[suffixIndex];
    }
}

// Usage:
double balance = 1234567.89;
String formatted = NumberUtils.formatNumber(balance);
player.sendMessage("Balance: " + formatted); // "Balance: 1.23m"
```

### Color Utilities

```java
import java.awt.Color;

public class ColorUtils {
    
    /**
     * Convert Color to hex string
     * Example: Color.RED -> "#ff0000"
     */
    public static String toHex(Color color) {
        return String.format("#%02x%02x%02x", 
            color.getRed(), 
            color.getGreen(), 
            color.getBlue()
        );
    }
    
    /**
     * Parse hex string to Color
     * Example: "#ff0000" -> Color.RED
     */
    public static Color fromHex(String hex) {
        hex = hex.replace("#", "");
        return new Color(
            Integer.parseInt(hex.substring(0, 2), 16),
            Integer.parseInt(hex.substring(2, 4), 16),
            Integer.parseInt(hex.substring(4, 6), 16)
        );
    }
    
    /**
     * Interpolate between two colors
     * @param ratio 0.0 to 1.0
     */
    public static Color lerp(Color start, Color end, double ratio) {
        ratio = Math.max(0, Math.min(1, ratio)); // Clamp 0-1
        
        int r = (int) (start.getRed() + ratio * (end.getRed() - start.getRed()));
        int g = (int) (start.getGreen() + ratio * (end.getGreen() - start.getGreen()));
        int b = (int) (start.getBlue() + ratio * (end.getBlue() - start.getBlue()));
        
        return new Color(r, g, b);
    }
}

// Usage:
Color playerColor = new Color(255, 100, 50);
String hex = ColorUtils.toHex(playerColor); // "#ff6432"

// Health bar color (red to green based on health percentage)
double healthPercent = player.getHealth() / player.getMaxHealth();
Color healthColor = ColorUtils.lerp(Color.RED, Color.GREEN, healthPercent);
```

---

## First Join Detection

Track when players join for the first time to show special messages or give rewards.

### Implementation

```java
public class PlayerJoinListener {
    
    private final PlayerService playerService;
    private final PlaceholderService placeholders;
    private final PluginConfig config;
    
    public PlayerJoinListener(MyPlugin plugin) {
        this.playerService = plugin.getPlayerService();
        this.placeholders = PlaceholderService.get();
        this.config = plugin.getConfig();
    }
    
    public void onPlayerJoin(PlayerJoinEvent event) {
        Player player = event.getPlayer();
        UUID uuid = player.getUUID();
        
        // Check if player exists in database
        PlayerData data = playerService.getPlayerData(uuid);
        boolean isFirstJoin = (data == null);
        
        if (isFirstJoin) {
            // Create new player data
            data = new PlayerData(uuid, player.getUsername());
            data.setJoinedAt(System.currentTimeMillis());
            playerService.savePlayerData(data);
            
            // Send first join message to all players
            String message = placeholders.parse(
                player, 
                config.getFirstJoinMessage()
            );
            
            for (Player online : playerService.getOnlinePlayers()) {
                online.sendMessage(message);
            }
            
            // Give first join rewards
            giveFirstJoinRewards(player);
            
        } else {
            // Regular join message
            String message = placeholders.parse(
                player, 
                config.getJoinMessage()
            );
            
            for (Player online : playerService.getOnlinePlayers()) {
                online.sendMessage(message);
            }
            
            // Update last seen
            data.setLastSeen(System.currentTimeMillis());
            playerService.savePlayerData(data);
        }
        
        // Add to online players
        playerService.addOnlinePlayer(player);
    }
    
    private void giveFirstJoinRewards(Player player) {
        // Give starting items
        // player.getInventory().addItem(new ItemStack(Material.STONE_SWORD));
        
        // Give starting money
        // economyService.deposit(player, 1000);
        
        // Send welcome message
        player.sendMessage("Welcome to the server!");
        player.sendMessage("You've received starter items and 1000 coins!");
    }
}
```

### Config Example

```json
{
  "joinMessage": "§e%player_name% joined the server",
  "firstJoinMessage": "§6Welcome %player_name% to the server for the first time!",
  "leaveMessage": "§e%player_name% left the server"
}
```

---

## Ban/Mute Check on Join

Prevent banned or muted players from joining or chatting.

### Join Check

```java
public void onPlayerJoin(PlayerJoinEvent event) {
    Player player = event.getPlayer();
    
    // Check if player is banned
    Punishment ban = punishmentService.getActiveBan(player.getUUID());
    if (ban != null) {
        event.cancel(); // Prevent join
        
        String reason = ban.getReason();
        long expiresAt = ban.getExpiresAt();
        
        String message;
        if (expiresAt == -1) {
            // Permanent ban
            message = "You are permanently banned.\nReason: " + reason;
        } else {
            // Temporary ban
            long remaining = expiresAt - System.currentTimeMillis();
            String duration = TimeUtils.formatTime(remaining);
            message = "You are banned for " + duration + ".\nReason: " + reason;
        }
        
        player.kick(message);
        return;
    }
    
    // Continue with normal join logic...
}
```

### Chat Check

```java
public void onPlayerChat(PlayerChatEvent event) {
    Player player = event.getPlayer();
    
    // Check if player is muted
    Punishment mute = punishmentService.getActiveMute(player.getUUID());
    if (mute != null) {
        event.cancel(); // Prevent chat message
        
        long remaining = mute.getExpiresAt() - System.currentTimeMillis();
        String duration = TimeUtils.formatTime(remaining);
        
        player.sendMessage("§cYou are muted for " + duration);
        player.sendMessage("§cReason: " + mute.getReason());
        return;
    }
    
    // Continue with normal chat logic...
}
```

---

## Chat Channels/Rooms

Allow players to switch between different chat channels (global, staff, trade, etc.).

### Chat Room Class

```java
public class ChatRoom {
    
    private final String id;
    private final String name;
    private final String format;
    private final Set<UUID> members;
    
    public ChatRoom(String id, String name, String format) {
        this.id = id;
        this.name = name;
        this.format = format; // e.g., "[Global] %player_name%: %message%"
        this.members = new HashSet<>();
    }
    
    public void addMember(UUID playerId) {
        members.add(playerId);
    }
    
    public void removeMember(UUID playerId) {
        members.remove(playerId);
    }
    
    public void sendMessage(Player sender, String message) {
        String formatted = format
            .replace("%player_name%", sender.getUsername())
            .replace("%message%", message);
        
        // Send to all members
        for (UUID memberId : members) {
            Player member = playerService.getOnlinePlayer(memberId);
            if (member != null) {
                member.sendMessage(formatted);
            }
        }
    }
    
    public String getId() { return id; }
    public String getName() { return name; }
    public Set<UUID> getMembers() { return members; }
}
```

### Chat Service

```java
public class ChatService {
    
    private final Map<String, ChatRoom> rooms;
    private final Map<UUID, String> playerRooms; // Player -> Current room ID
    
    public ChatService() {
        this.rooms = new ConcurrentHashMap<>();
        this.playerRooms = new ConcurrentHashMap<>();
        
        // Create default rooms
        createRoom("global", "Global", "§f[Global] %player_name%: %message%");
        createRoom("staff", "Staff", "§c[Staff] %player_name%: %message%");
        createRoom("trade", "Trade", "§e[Trade] %player_name%: %message%");
    }
    
    public void createRoom(String id, String name, String format) {
        rooms.put(id, new ChatRoom(id, name, format));
    }
    
    public void switchRoom(Player player, String roomId) {
        ChatRoom room = rooms.get(roomId);
        if (room == null) {
            player.sendMessage("§cChat room not found: " + roomId);
            return;
        }
        
        // Leave current room
        String currentRoomId = playerRooms.get(player.getUUID());
        if (currentRoomId != null) {
            ChatRoom currentRoom = rooms.get(currentRoomId);
            currentRoom.removeMember(player.getUUID());
        }
        
        // Join new room
        room.addMember(player.getUUID());
        playerRooms.put(player.getUUID(), roomId);
        
        player.sendMessage("§aYou are now in: " + room.getName());
    }
    
    public ChatRoom getCurrentRoom(Player player) {
        String roomId = playerRooms.getOrDefault(player.getUUID(), "global");
        return rooms.get(roomId);
    }
}
```

### Usage

```java
// Command: /chat <room>
public void onChatCommand(Player player, String[] args) {
    if (args.length < 1) {
        player.sendMessage("§cUsage: /chat <global|staff|trade>");
        return;
    }
    
    chatService.switchRoom(player, args[0].toLowerCase());
}

// On chat event
public void onPlayerChat(PlayerChatEvent event) {
    Player player = event.getPlayer();
    String message = event.getMessage();
    
    event.cancel(); // Cancel default chat
    
    // Send to current room
    ChatRoom room = chatService.getCurrentRoom(player);
    room.sendMessage(player, message);
}
```

---

## Summary

### Features Covered:

1. **Placeholder System** - Dynamic value insertion in messages
2. **Translation/i18n** - Multi-language support
3. **Utility Classes** - Time, number, and color formatting
4. **First Join Detection** - Special handling for new players
5. **Ban/Mute Checks** - Moderation enforcement
6. **Chat Channels** - Multiple chat rooms

### Benefits:

- **Reusable Code** - Copy and adapt for your plugin
- **Professional Features** - Common server functionality
- **Best Practices** - Production-tested patterns
- **Extensible** - Easy to customize and expand

---

## Next Steps

- Implement these features in your plugin
- Customize messages and formats
- Add your own placeholders
- Create additional chat rooms
- Extend with more utility methods

---

## Getting Help

**Official Channels:**
- **Discord:** [Official Hytale Discord](https://discord.gg/hytale)
- **Blog:** [Hytale News](https://hytale.com/news)