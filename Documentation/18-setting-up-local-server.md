```markdown
# Setting Up a Local Server

**Source:** [Hytale Server Manual](https://support.hytale.com/hc/en-us/articles/45326769420827-Hytale-Server-Manual)  
**Last Modified:** Friday, January 16, 2026 at 12:53 PM

---

## Overview

This guide helps you set up a local Hytale server for testing mods, LAN play, or development on your machine.[file:12]

---

## Prerequisites

Before you begin, ensure you have:
- **Hytale** installed via the official launcher
- **Java 25** from [Adoptium](https://adoptium.net/temurin/releases)
- Basic command line/terminal knowledge[file:12]

---

## Step 1: Locating Hytale Server Files

1. Open Hytale Launcher → **Settings** → **Open Directory**
2. Go to: `%appdata%\Hytale\install\release\package\game\latest\`
3. Copy **Server/** folder and **Assets.zip** to `C:\HytaleServer\`

```
C:\HytaleServer\
├── Server\HytaleServer.jar
└── Assets.zip
```

---

## Step 2: Launching the Server

```
cd C:\HytaleServer
java -Xmx4G -jar Server\HytaleServer.jar --assets Assets.zip
```

---

## Step 3: Server Authentication

### You MUST authenticate your server!

1. Run: `/auth login device`
2. Visit printed URL + code in browser  
3. Login with Hytale account
4. Run: `/auth persistence Encrypted`

**Never share your encrypted auth file!**[file:12]

---

## Step 4: Connecting to Your Server

**Local:** `localhost:5520`  
**LAN:** `192.168.x.x:5520`

**In Hytale client:**
1. **Play** → **Servers** → **Add Server**
2. Enter address above
3. Join!

**Firewall (Windows):**
```
New-NetFirewallRule -DisplayName "Hytale Server" -Direction Inbound -Protocol UDP -LocalPort 5520 -Action Allow
```

---

## Step 5: Basic Server Configuration

Edit `config.json` (server stopped):
```json
{
  "max-players": 10,
  "view-distance": 12
}
```

**Key files:**
- `config.json` - Server settings
- `universe/worlds/*/config.json` - World settings

---

## Installing Mods on Your Server

1. Create `mods/` folder in server directory
2. Drop `.zip` or `.jar` files into `mods/`
3. Restart server

---

## Troubleshooting

### Server won't start
- Verify: `java --version` shows OpenJDK 25
- Use 4GB+ RAM: `-Xmx4G`
- Check Assets.zip path

### Can't connect to server
- Use **UDP port 5520** (not 25565)
- Allow UDP 5520 in firewall
- Server must be authenticated

### Port already in use
```
netstat -ano | findstr :5520
```
Kill process or change port with `--bind 0.0.0.0:25565`

### Authentication issues
- Delete auth files
- Retry `/auth login device`

---

## Getting Help

**Official Channels:**
- **Server Manual:** [Hytale Server Manual](https://support.hytale.com/hc/en-us/articles/45326769420827-Hytale-Server-Manual)
- **Discord:** [Official Hytale Discord](https://discord.gg/hytale)
- **Blog:** [Hytale News](https://hytale.com/news)