# Advanced Plugin Patterns

**Last Modified:** Friday, January 10, 2026

---

## Overview

This guide covers advanced architectural patterns and best practices for building robust, scalable Hytale plugins. These patterns are commonly used in production plugins and will help you write cleaner, more maintainable code.

---

## Plugin Architecture Patterns

### Service-Storage Pattern

A common pattern for managing data in plugins is to separate **business logic** (Service) from **data persistence** (Storage).

#### Benefits:
- Clean separation of concerns
- Easy to swap storage backends (JSON → Database)
- Testable business logic
- In-memory caching layer

#### Example Structure:

```java
// Storage Interface - Handles data persistence
public interface PlayerStorage {
    PlayerData load(UUID uuid);
    void save(PlayerData data);
    List<PlayerData> loadAll();
}

// JSON Implementation
public class PlayerJsonStorage implements PlayerStorage {
    private final File dataFolder;
    
    public PlayerJsonStorage(File dataFolder) {
        this.dataFolder = new File(dataFolder, "players");
        this.dataFolder.mkdirs();
    }
    
    @Override
    public PlayerData load(UUID uuid) {
        File file = new File(dataFolder, uuid.toString() + ".json");
        if (!file.exists()) return null;
        
        try (FileReader reader = new FileReader(file)) {
            return new Gson().fromJson(reader, PlayerData.class);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    @Override
    public void save(PlayerData data) {
        File file = new File(dataFolder, data.getUuid().toString() + ".json");
        
        try (FileWriter writer = new FileWriter(file)) {
            new Gson().toJson(data, writer);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    @Override
    public List<PlayerData> loadAll() {
        List<PlayerData> players = new ArrayList<>();
        File[] files = dataFolder.listFiles((dir, name) -> name.endsWith(".json"));
        
        if (files != null) {
            for (File file : files) {
                try (FileReader reader = new FileReader(file)) {
                    players.add(new Gson().fromJson(reader, PlayerData.class));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        
        return players;
    }
}

// Service Layer - Business logic and caching
public class PlayerService {
    private final PlayerStorage storage;
    private final Map<UUID, PlayerData> cache;
    
    public PlayerService(PlayerStorage storage) {
        this.storage = storage;
        this.cache = new ConcurrentHashMap<>();
        loadAll();
    }
    
    private void loadAll() {
        for (PlayerData data : storage.loadAll()) {
            cache.put(data.getUuid(), data);
        }
    }
    
    public PlayerData getPlayer(UUID uuid) {
        return cache.computeIfAbsent(uuid, id -> {
            PlayerData data = storage.load(id);
            return data != null ? data : new PlayerData(id);
        });
    }
    
    public void savePlayer(PlayerData data) {
        cache.put(data.getUuid(), data);
        storage.save(data);
    }
    
    public void saveAll() {
        for (PlayerData data : cache.values()) {
            storage.save(data);
        }
    }
}
```

---

## Thread Pool Management

For async operations, use a thread pool instead of creating new threads repeatedly.

### Why Use Thread Pools?

- **Performance**: Reuses threads instead of creating new ones
- **Resource Management**: Limits concurrent threads
- **Scheduled Tasks**: Built-in support for delayed/periodic tasks

### Implementation:

```java
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class MyPlugin extends JavaPlugin {
    
    private ScheduledExecutorService threadPool;
    
    public MyPlugin(JavaPluginInit init) {
        super(init);
        
        // Create thread pool with 4 threads
        threadPool = Executors.newScheduledThreadPool(4, r -> {
            Thread thread = new Thread(r);
            thread.setName("MyPlugin-Thread-" + thread.threadId());
            return thread;
        });
    }
    
    @Override
    public void onEnable() {
        // Run task asynchronously
        threadPool.execute(() -> {
            // Heavy operation here
            loadDataFromDatabase();
        });
        
        // Schedule repeating task (every 5 minutes)
        threadPool.scheduleAtFixedRate(
            () -> saveAllData(),
            5, 5, TimeUnit.MINUTES
        );
        
        // Schedule delayed task (run once after 10 seconds)
        threadPool.schedule(
            () -> cleanupCache(),
            10, TimeUnit.SECONDS
        );
    }
    
    @Override
    public void onDisable() {
        // Shutdown thread pool gracefully
        threadPool.shutdown();
        try {
            if (!threadPool.awaitTermination(10, TimeUnit.SECONDS)) {
                threadPool.shutdownNow();
            }
        } catch (InterruptedException e) {
            threadPool.shutdownNow();
        }
    }
    
    private void loadDataFromDatabase() {
        // Heavy operation
    }
    
    private void saveAllData() {
        // Periodic save
    }
    
    private void cleanupCache() {
        // Cache cleanup
    }
}
```

---

## Singleton Pattern for Plugin Access

Allow other parts of your code (and other plugins) to access your plugin instance.

### Implementation:

```java
public class MyPlugin extends JavaPlugin {
    
    private static MyPlugin instance;
    
    public MyPlugin(JavaPluginInit init) {
        super(init);
        instance = this;
    }
    
    public static MyPlugin getInstance() {
        return instance;
    }
    
    // Expose services
    public PlayerService getPlayerService() {
        return playerService;
    }
    
    public EconomyService getEconomyService() {
        return economyService;
    }
}

// Usage from anywhere:
MyPlugin plugin = MyPlugin.getInstance();
PlayerService players = plugin.getPlayerService();
```

---

## Logging Best Practices

### Structured Logging with Log Levels

```java
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class PluginLogger {
    
    private final String pluginName;
    private final File logFile;
    private LogLevel currentLevel = LogLevel.INFO;
    
    public enum LogLevel {
        DEBUG(0), INFO(1), WARN(2), ERROR(3);
        
        private final int priority;
        LogLevel(int priority) { this.priority = priority; }
        public int getPriority() { return priority; }
    }
    
    public PluginLogger(String pluginName, File dataFolder) {
        this.pluginName = pluginName;
        
        // Create logs directory
        File logsDir = new File(dataFolder, "logs");
        logsDir.mkdirs();
        
        // Create log file with date
        String date = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        this.logFile = new File(logsDir, pluginName + "-" + date + ".log");
        
        try {
            logFile.createNewFile();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public void setLogLevel(LogLevel level) {
        this.currentLevel = level;
    }
    
    public void debug(String message) {
        log(LogLevel.DEBUG, message);
    }
    
    public void info(String message) {
        log(LogLevel.INFO, message);
    }
    
    public void warn(String message) {
        log(LogLevel.WARN, message);
    }
    
    public void error(String message) {
        log(LogLevel.ERROR, message);
    }
    
    public void error(String message, Throwable throwable) {
        log(LogLevel.ERROR, message + ": " + throwable.getMessage());
        throwable.printStackTrace();
    }
    
    private void log(LogLevel level, String message) {
        if (level.getPriority() < currentLevel.getPriority()) {
            return; // Skip if below current log level
        }
        
        String timestamp = new SimpleDateFormat("HH:mm:ss").format(new Date());
        String logMessage = String.format("[%s] [%s] %s: %s",
            timestamp, pluginName, level.name(), message);
        
        // Console output
        System.out.println(logMessage);
        
        // File output
        try (FileWriter writer = new FileWriter(logFile, true)) {
            writer.write(logMessage + "\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

// Usage:
PluginLogger logger = new PluginLogger("MyPlugin", getDataFolder());
logger.setLogLevel(LogLevel.INFO); // Only INFO and above

logger.debug("This won't be logged");
logger.info("Plugin initialized");
logger.warn("Configuration file missing, using defaults");
logger.error("Failed to connect to database", exception);
```

---

## Configuration Management

### Type-Safe Configuration

Instead of accessing config values directly everywhere, create a configuration class:

```java
public class PluginConfig {
    
    private final File configFile;
    private JsonObject config;
    
    // Default values
    private String serverName = "My Server";
    private int maxPlayers = 100;
    private boolean debugMode = false;
    private String primaryCurrency = "coins";
    
    public PluginConfig(File dataFolder) {
        this.configFile = new File(dataFolder, "config.json");
        load();
    }
    
    public void load() {
        if (!configFile.exists()) {
            saveDefaults();
            return;
        }
        
        try (FileReader reader = new FileReader(configFile)) {
            config = new Gson().fromJson(reader, JsonObject.class);
            
            // Load values with defaults
            serverName = config.has("serverName") 
                ? config.get("serverName").getAsString() 
                : serverName;
            maxPlayers = config.has("maxPlayers") 
                ? config.get("maxPlayers").getAsInt() 
                : maxPlayers;
            debugMode = config.has("debugMode") 
                ? config.get("debugMode").getAsBoolean() 
                : debugMode;
            primaryCurrency = config.has("primaryCurrency") 
                ? config.get("primaryCurrency").getAsString() 
                : primaryCurrency;
                
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    private void saveDefaults() {
        config = new JsonObject();
        config.addProperty("serverName", serverName);
        config.addProperty("maxPlayers", maxPlayers);
        config.addProperty("debugMode", debugMode);
        config.addProperty("primaryCurrency", primaryCurrency);
        
        save();
    }
    
    public void save() {
        try (FileWriter writer = new FileWriter(configFile)) {
            new GsonBuilder().setPrettyPrinting().create().toJson(config, writer);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    // Getters
    public String getServerName() { return serverName; }
    public int getMaxPlayers() { return maxPlayers; }
    public boolean isDebugMode() { return debugMode; }
    public String getPrimaryCurrency() { return primaryCurrency; }
    
    // Setters (with auto-save)
    public void setServerName(String name) {
        this.serverName = name;
        config.addProperty("serverName", name);
        save();
    }
}
```

---

## Event System Pattern

Create a custom event system for your plugin to allow extensibility.

### Basic Event System:

```java
// Base event interface
public interface PluginEvent {
    String getEventName();
}

// Example event
public class PlayerDataLoadedEvent implements PluginEvent {
    private final UUID playerId;
    private final PlayerData data;
    
    public PlayerDataLoadedEvent(UUID playerId, PlayerData data) {
        this.playerId = playerId;
        this.data = data;
    }
    
    @Override
    public String getEventName() {
        return "PlayerDataLoaded";
    }
    
    public UUID getPlayerId() { return playerId; }
    public PlayerData getData() { return data; }
}

// Event listener interface
@FunctionalInterface
public interface EventListener<T extends PluginEvent> {
    void onEvent(T event);
}

// Event service
public class EventService {
    private final Map<Class<? extends PluginEvent>, List<EventListener<?>>> listeners;
    
    public EventService() {
        this.listeners = new ConcurrentHashMap<>();
    }
    
    public <T extends PluginEvent> void registerListener(
            Class<T> eventClass, 
            EventListener<T> listener) {
        listeners.computeIfAbsent(eventClass, k -> new ArrayList<>()).add(listener);
    }
    
    public <T extends PluginEvent> void fireEvent(T event) {
        List<EventListener<?>> eventListeners = listeners.get(event.getClass());
        if (eventListeners != null) {
            for (EventListener<?> listener : eventListeners) {
                try {
                    ((EventListener<T>) listener).onEvent(event);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

// Usage:
EventService events = new EventService();

// Register listener
events.registerListener(PlayerDataLoadedEvent.class, event -> {
    System.out.println("Player data loaded: " + event.getPlayerId());
});

// Fire event
events.fireEvent(new PlayerDataLoadedEvent(playerId, data));
```

---

## Periodic Save Pattern

Automatically save data at regular intervals to prevent data loss.

```java
public class AutoSaveTask implements Runnable {
    
    private final PlayerService playerService;
    private final PluginLogger logger;
    
    public AutoSaveTask(PlayerService playerService, PluginLogger logger) {
        this.playerService = playerService;
        this.logger = logger;
    }
    
    @Override
    public void run() {
        try {
            logger.info("Auto-saving player data...");
            playerService.saveAll();
            logger.info("Auto-save complete");
        } catch (Exception e) {
            logger.error("Auto-save failed", e);
        }
    }
    
    public void schedule(ScheduledExecutorService executor) {
        // Save every 5 minutes
        executor.scheduleAtFixedRate(this, 5, 5, TimeUnit.MINUTES);
    }
}

// In your plugin:
AutoSaveTask autoSave = new AutoSaveTask(playerService, logger);
autoSave.schedule(threadPool);
```

---

## Cache Cleanup Pattern

Periodically clean up unused cached data to prevent memory leaks.

```java
public class CacheCleanupTask implements Runnable {
    
    private final Map<UUID, CachedPlayer> playerCache;
    private final long maxIdleTime;
    private final PluginLogger logger;
    
    public CacheCleanupTask(
            Map<UUID, CachedPlayer> cache, 
            long maxIdleTimeMinutes,
            PluginLogger logger) {
        this.playerCache = cache;
        this.maxIdleTime = maxIdleTimeMinutes * 60 * 1000; // Convert to ms
        this.logger = logger;
    }
    
    @Override
    public void run() {
        long now = System.currentTimeMillis();
        int removed = 0;
        
        Iterator<Map.Entry<UUID, CachedPlayer>> iterator = 
            playerCache.entrySet().iterator();
            
        while (iterator.hasNext()) {
            Map.Entry<UUID, CachedPlayer> entry = iterator.next();
            CachedPlayer player = entry.getValue();
            
            // Remove if player is offline and idle too long
            if (!player.isOnline() && 
                (now - player.getLastAccessTime()) > maxIdleTime) {
                iterator.remove();
                removed++;
            }
        }
        
        if (removed > 0) {
            logger.info("Cleaned up " + removed + " cached players");
        }
    }
    
    public void schedule(ScheduledExecutorService executor) {
        // Run cleanup every 10 minutes
        executor.scheduleAtFixedRate(this, 10, 10, TimeUnit.MINUTES);
    }
}

class CachedPlayer {
    private final UUID uuid;
    private boolean online;
    private long lastAccessTime;
    
    public CachedPlayer(UUID uuid) {
        this.uuid = uuid;
        this.online = false;
        this.lastAccessTime = System.currentTimeMillis();
    }
    
    public void updateAccessTime() {
        this.lastAccessTime = System.currentTimeMillis();
    }
    
    public boolean isOnline() { return online; }
    public void setOnline(boolean online) { this.online = online; }
    public long getLastAccessTime() { return lastAccessTime; }
}
```

---

## Plugin Lifecycle Best Practices

### Complete Plugin Template with All Patterns:

```java
package com.example.myplugin;

import com.hypixel.hytale.plugin.JavaPlugin;
import com.hypixel.hytale.plugin.JavaPluginInit;
import javax.annotation.Nonnull;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class MyPlugin extends JavaPlugin {
    
    // Singleton instance
    private static MyPlugin instance;
    
    // Core services
    private PluginLogger logger;
    private PluginConfig config;
    private ScheduledExecutorService threadPool;
    private EventService eventService;
    
    // Feature services
    private PlayerStorage playerStorage;
    private PlayerService playerService;
    
    // Scheduled tasks
    private AutoSaveTask autoSaveTask;
    private CacheCleanupTask cacheCleanupTask;
    
    public MyPlugin(@Nonnull JavaPluginInit init) {
        super(init);
        instance = this;
        
        // Initialize core services
        this.logger = new PluginLogger("MyPlugin", getDataFolder());
        this.config = new PluginConfig(getDataFolder());
        
        // Set log level from config
        if (config.isDebugMode()) {
            logger.setLogLevel(PluginLogger.LogLevel.DEBUG);
        }
        
        // Create thread pool
        this.threadPool = Executors.newScheduledThreadPool(4, r -> {
            Thread thread = new Thread(r);
            thread.setName("MyPlugin-Thread-" + thread.threadId());
            return thread;
        });
        
        // Initialize event system
        this.eventService = new EventService();
        
        // Initialize feature services
        this.playerStorage = new PlayerJsonStorage(getDataFolder());
        this.playerService = new PlayerService(playerStorage);
        
        // Initialize scheduled tasks
        this.autoSaveTask = new AutoSaveTask(playerService, logger);
        this.cacheCleanupTask = new CacheCleanupTask(
            playerService.getCache(), 30, logger
        );
        
        logger.info("MyPlugin initialized");
    }
    
    @Override
    public void onEnable() {
        logger.info("MyPlugin is enabling...");
        
        // Load configuration
        config.load();
        
        // Schedule periodic tasks
        autoSaveTask.schedule(threadPool);
        cacheCleanupTask.schedule(threadPool);
        
        // Register event listeners
        registerListeners();
        
        // Register commands
        registerCommands();
        
        logger.info("MyPlugin has been enabled");
    }
    
    @Override
    public void onDisable() {
        logger.info("MyPlugin is disabling...");
        
        // Shutdown thread pool
        threadPool.shutdown();
        try {
            if (!threadPool.awaitTermination(10, TimeUnit.SECONDS)) {
                threadPool.shutdownNow();
            }
        } catch (InterruptedException e) {
            threadPool.shutdownNow();
        }
        
        // Save all data
        playerService.saveAll();
        
        logger.info("MyPlugin has been disabled");
    }
    
    private void registerListeners() {
        // Register event listeners here
    }
    
    private void registerCommands() {
        // Register commands here
    }
    
    // Public API
    public static MyPlugin getInstance() {
        return instance;
    }
    
    public PluginLogger getPluginLogger() {
        return logger;
    }
    
    public PluginConfig getPluginConfig() {
        return config;
    }
    
    public ScheduledExecutorService getThreadPool() {
        return threadPool;
    }
    
    public EventService getEventService() {
        return eventService;
    }
    
    public PlayerService getPlayerService() {
        return playerService;
    }
}
```

---

## Summary

### Key Patterns Covered:

1. **Service-Storage Pattern** - Separate business logic from data persistence
2. **Thread Pool Management** - Efficient async operations
3. **Singleton Pattern** - Global plugin access
4. **Structured Logging** - Professional logging with levels and files
5. **Type-Safe Configuration** - Clean config management
6. **Custom Event System** - Extensible plugin architecture
7. **Periodic Save Pattern** - Automatic data persistence
8. **Cache Cleanup Pattern** - Memory management

### Benefits:

- **Maintainable**: Clear separation of concerns
- **Scalable**: Easy to add new features
- **Testable**: Services can be tested independently
- **Professional**: Production-ready patterns
- **Extensible**: Other plugins can integrate via your API

---

## Next Steps

- Implement these patterns in your plugin
- Create unit tests for your services
- Document your public API
- Consider creating a developer API for other plugins

---

## Getting Help

**Official Channels:**
- **Discord:** [Official Hytale Discord](https://discord.gg/hytale)
- **Blog:** [Hytale News](https://hytale.com/news)