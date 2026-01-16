# Frequently Asked Questions

**Last Modified:** Friday, January 16, 2026

---

## Overview

This page answers frequently asked questions about Hytale modding, server architecture, and technical capabilities.

---

## Client & Server Architecture

### 1. Can the client be modded?

**No**, the client cannot be modded directly.

**However:**
- The server controls how the game and UI looks
- Works similar to "Resource Packs" in Minecraft
- The server decides what mods are used
- Visuals are server-side controlled
- No client-side mods needed for security and consistency

**Benefits of Server-Side Modding:**
- ✅ Join any modded server without downloading external mods
- ✅ One stable client for all players
- ✅ Better security (no client modifications)
- ✅ Unified community experience
- ✅ Server owners control the experience

**Philosophy:**
> *"One Community, One Client"* - Hytale avoids the fragmented ecosystem of different modded clients by keeping all modifications server-side.

---

## Network & Technical

### 2. What Network Protocol will be used?

**Hytale uses the QUIC transport protocol.**

### Understanding Internet Protocols:

**UDP (User Datagram Protocol):**
- ⚡ Connectionless and fast
- 📤 Fire-and-forget packets
- ⚠️ Less reliability (packets can be lost)

**TCP (Transmission Control Protocol):**
- 🔗 Connection-based
- 🐢 Slower than UDP
- ✅ Guaranteed packet delivery
- ✅ Much more reliability

**QUIC (Quick UDP Internet Connections):**
- 🚀 **Hybrid protocol** building on UDP
- ⚡ Same speed benefits as UDP
- ✅ Adds reliability layers like TCP
- 🎮 **Excellent for game development**
- ⚖️ Blends speed and reliability

**Why QUIC?**
- Best of both worlds for multiplayer gaming
- Modern, efficient protocol
- Designed for low-latency applications
- Industry-proven (used by Google, YouTube, etc.)

---

## Server Infrastructure

### 3. What are Transfer Packets?

**Transfer packets** are small data payloads (4KB) that allow players to move from one server to another while carrying information.

### Key Points:

**What They Are:**
- Small data containers (4KB limit)
- Carry player information between servers
- Enable seamless server transitions
- Preserve inventory, stats, and progress

**What They Are NOT:**
- ❌ **Not equivalent to BungeeCord or Velocity**
- ❌ Do not manage network-wide features
- ❌ Do not support global plugins
- ❌ DDOS protection would be very difficult for small networks

### Best Use Cases:

**✅ Perfect For:**
- Small server networks
- Hub-based setups
- Server-to-server player transfers
- Preserving player state across servers

**Example Scenario:**
```
Player finishes dungeon on Server A
  ↓
Transfer packet created with inventory + stats
  ↓
Player moves to Server B (lobby)
  ↓
Inventory and stats intact
```

### Benefits:

- **Lower Server Costs** - Distribute players across multiple servers
- **Better Performance** - Dedicated servers for specific game modes
- **Development Focus** - Less time on network infrastructure, more on gameplay
- **Seamless Experience** - Players don't lose progress when switching servers

### Limitations:

- Primarily intended for **smaller servers**
- Not a full proxy solution like BungeeCord
- 4KB data limit per transfer
- Network-wide features require custom implementation

---

### 4. Will Hytale support dedicated servers?

**Yes!** Hytale will fully support dedicated servers.

### What This Means:

**Hosting Options:**
- ✅ Host on your own hardware
- ✅ Use third-party hosting services
- ✅ Full control over server settings
- ✅ Install and configure mods
- ✅ Optimize performance

### Benefits of Dedicated Servers:

**Complete Control:**
- Server settings and configurations
- Mod installation and management
- Performance tuning and optimization
- Backup and maintenance schedules

**Flexibility:**
- Choose your hosting provider
- Scale resources as needed
- Run custom plugins and packs
- Full administrative access

**Professional Options:**
- Enterprise-grade hosting
- Custom hardware configurations
- Advanced networking setups
- Professional support options

### Hosting Methods:

1. **Self-Hosted** - Run on your own hardware
2. **VPS/Cloud** - Rent virtual private servers (DigitalOcean, AWS, etc.)
3. **Game Hosting** - Specialized game server hosts
4. **Hybrid** - Mix of self-hosted and cloud resources

---

## Platform Support

### 5. Will Hytale support modding on consoles?

**As of now, Hytale modding is primarily focused on PC platforms.**

### Current Status:

**PC Platforms:**
- ✅ Windows
- ✅ macOS
- ✅ Linux

**Console Support:**
- ⏳ Not confirmed for modding
- 🎮 Game may come to consoles in the future
- 🔧 Modding tools designed for PC

### Why PC-First?

**Technical Reasons:**
- Modding requires file system access
- Console platforms have restrictions
- Development tools are PC-based
- Testing and iteration easier on PC

**Platform Limitations:**
- Console manufacturers restrict modifications
- Certification processes are complex
- Updates and patches have approval delays
- File access is limited or prohibited

### Future Possibilities:

While current modding support is PC-focused, the team hasn't ruled out future console support for:
- Playing on modded servers (server-side mods)
- Official mod marketplace
- Curated content packs

**Stay Updated:**
- Follow official Hytale announcements
- Join the [Official Discord](https://discord.gg/hytale)
- Check the [Hytale Blog](https://hytale.com/news)

---

## Getting Help

**Official Channels:**
- **Discord:** [Official Hytale Discord](https://discord.gg/hytale)
- **Blog:** [Hytale News](https://hytale.com/news)