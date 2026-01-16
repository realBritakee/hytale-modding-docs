# Server Tips & Optimization

**Source:** [Hytale Server Manual](https://support.hytale.com/hc/en-us/articles/45326769420827-Hytale-Server-Manual)  
**Last Modified:** Friday, January 16, 2026 at 1:04 PM

---

## Installing Mods

**Simple 3-step process:**

1. Download `.zip` or `.jar` from [CurseForge](https://www.curseforge.com/hytale)
2. Drop into `mods/` folder  
3. Restart server

```
📁 Server Folder
└── mods/
    ├── MyMod.zip
    └── CoolPlugin.jar
```

---

## Disable Sentry Crash Reporting

> **Important:** Disable during plugin development

```bash
java -jar HytaleServer.jar --assets Assets.zip --disable-sentry
```

---

## Leverage AOT Cache

**Faster startup** with pre-trained cache:

```bash
java -XX:AOTCache=HytaleServer.aot -jar HytaleServer.jar --assets Assets.zip
```
[JEP-514](https://openjdk.org/jeps/514)

---

## Recommended Plugins

| Plugin | Purpose |
|--------|---------|
| [Nitrado:WebServer](https://github.com/nitrado/hytale-plugin-webserver) | Web APIs |
| [Nitrado:Query](https://github.com/nitrado/hytale-plugin-query) | Server status |
| [PerformanceSaver](https://github.com/nitrado/hytale-plugin-performance-saver) | Dynamic view distance |
| [PrometheusExporter](https://github.com/apexhosting/hytale-plugin-prometheus) | Performance metrics |

---

## View Distance Tuning

**RAM Usage Guide:**
```
8 chunks   → 2-4GB RAM  (4 players)
12 chunks  → 4-6GB RAM  (8-12 players) ✅ RECOMMENDED
16 chunks  → 8GB+ RAM   (Risky!)
```

**vs Minecraft:**
| Game | Chunks | Blocks |
|------|--------|--------|
| Minecraft | 10 | 160 |
| Hytale | **12** | **384** |

---

## Multiserver Architecture

**No BungeeCord needed** - native routing.

### Player Referral
```java
PlayerRef.referToServer("lobby.com", 5520, data);
```
**⚠️ Sign payloads** (HMAC required)

### Connection Redirect
```java
PlayerSetupConnectEvent.referToServer("eu.server", 5520);
```

---

## Quick Commands

| Use Case | Command |
|----------|---------|
| Development | `java -jar HytaleServer.jar --assets Assets.zip --disable-sentry` |
| Production | `java -Xmx6G -XX:AOTCache=HytaleServer.aot -jar HytaleServer.jar --assets Assets.zip` |
| Custom Port | `java -jar HytaleServer.jar --bind 0.0.0.0:25565 --assets Assets.zip` |

---

## Getting Help

**Official Channels:**
- **Server Manual:** [Hytale Server Manual](https://support.hytale.com/hc/en-us/articles/45326769420827-Hytale-Server-Manual)
- **Discord:** [Official Hytale Discord](https://discord.gg/hytale)
- **Blog:** [Hytale News](https://hytale.com/news)