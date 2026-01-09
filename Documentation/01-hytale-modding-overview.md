# Hytale Modding Overview

**Source:** [Official Hytale Modding Strategy](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)  
**Last Modified:** Friday, January 10, 2026

---

## Introduction

Welcome to Hytale modding! This documentation provides comprehensive tutorials and guides for creating mods in Hytale, from asset packs to advanced Java plugins.

> **Important:** Hytale is currently in **Early Access**. The modding tools and documentation are actively being developed and improved. Expect rough edges, but also expect rapid improvements based on community feedback.

> **Official Statement:** *"We're building Hytale with modding at its core. Most of what you see in the game can be changed, extended, or removed entirely."* - Slikey (Technical Director)

---

## Four Official Modding Categories

According to [Hytale's official modding strategy](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status), Hytale modding falls into **four technical categories**:

### 1. Server Plugins (Java .jar files)

**Server Plugins** are Java-based mods that:
- Extend the functionality of the server programmatically
- Are extremely powerful and allow deep modifications to gameplay and core systems
- Enable you to build minigames, economies, commands, custom logic, new asset types, and more
- Require Java programming knowledge

**Use Cases:**
- Custom game modes and minigames
- Economy systems
- Custom commands
- Server management tools
- Advanced gameplay mechanics

### 2. Data Assets (JSON files)

**Data Assets** drive gameplay behavior and define core content:
- **Blocks and Items** - Define properties, behaviors, and interactions
- **NPCs** - Configure mob behavior and AI
- **World Generation** - Control terrain, biomes, and structures
- **Drop Tables and Loot** - Define what items drop from blocks and mobs
- **And more** - Most game content is data-driven

**Key Feature:** No coding required - edit JSON files to modify game content

### 3. Art Assets (Sounds, Models, Textures)

**Art Assets** provide the visual and audio representation of game elements:
- **Models** - 3D block and entity models
- **Textures** - Visual appearance of blocks, items, and entities
- **Sounds** - Audio effects and music
- **Animations** - Movement and behavior animations

**Official Tool:** Blockbench is officially supported for creating Hytale models, textures, and animations

### 4. Save Files (Worlds and Prefabs)

**Save Files** allow you to share complete creations:
- **Worlds** - Share entire playable worlds
- **Prefabs** - Prebuilt structures like trees, houses, or landmarks
- **Usage** - Prefabs are used in creative tools and world generation

---

## Important: No Text-Based Scripting

**Official Clarification:** Hytale will **NOT** support text-based scripting languages like Lua.

**Why?**
- Text-based scripting claims to "help non-programmers" but still requires programming concepts
- It forces programmers to juggle two languages
- It increases complexity for both designers and programmers

### Instead: Visual Scripting (Coming Soon)

Hytale will implement **Visual Scripting** (similar to Unreal Engine Blueprints):
- **For Designers:** Build logic visually without coding
- **For Programmers:** Extend the system by creating new nodes in Java
- **Sandboxed and Safe:** Visual scripts can be shared safely without security risks
- **Future Vision:** Visual scripting directly in the 3D world (link levers, doors, triggers, etc.)

---

## Modding Philosophy

Hytale's modding is built on key principles:

### Server-Side First
- All modding is server-based (both singleplayer and multiplayer)
- Join any modded server without downloading external mods
- No client-side mods for security and consistency

### One Community, One Client
- Avoid fragmented ecosystem with different modded clients
- Client remains stable, secure, and consistent
- Servers provide creativity and variation

### Modding for Longevity
- Long-term commitment to modding support
- Built with the same tools used to create the game
- "Anything we do, you can do as well"

---

## Official Modding Tools

Hytale provides several official tools for creating content:

### 1. Hytale Asset Editor
- **Purpose:** Editor for data assets (JSON files)
- **Status:** Available now
- **Capabilities:** Supports most asset types
- **Limitations:** Notable limitations around NPCs, world generation, and interactions (being improved)
- **Access:** Built into the game

![Asset Editor](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/9242437642/original/fG1dqRJeDvDzMh_XoZ6vSgTB_iYSUtTRKA.png?1767794173)

### 2. Blockbench Plugin
- **Purpose:** Create Hytale-compatible models, textures, and animations
- **Status:** Releasing soon
- **Integration:** Direct integration with Blockbench
- **Replaces:** Hytale's own internal modeling tools
- **Why:** Better support for established creative workflows in the community

### 3. Asset Graph Editor
- **Purpose:** Node-based editor for complex assets
- **Status:** Currently being released
- **Use Cases:** World generation, creative tool brushes, NPCs
- **Note:** Internal tool being made public - expect rough edges but useful functionality

### 4. Creative Mode Tools
- **Purpose:** Interactive suite of in-game world editing and creation tools
- **Status:** Available in Early Access
- **Access:** Switch to Creative Mode in any world
- **Official Info:** [Creative Mode Blog](https://hytale.com/news/2025/11/hytale-creative-mode)

**Available Tools:**
- **Scripted Brushes** - Create mountains, paths, procedural ruins (asset-defined, modder-creatable)
- **Shape Brush** - Paint pyramids, cones, squares with customizable size, density, materials
- **Selection Tool** - 3D selections, copy, paste, move, rotate, save prefabs, regenerate chunks
- **Paste Tool** - Precise prefab placement with arrow key controls
- **Ruler/Laser Pointer** - Measure distances and point out locations
- **Prefab Browser/Editor** - Browse 100+ models, edit in separate environment
- **Player Model Changer** - Become any NPC model
- **Machinima Camera** - Keyframe animation for cinematic recording

**Creative Mode Features:**
- Customizable flight (speed, controls, hover/directional, inertia)
- Quick Settings Panel (changes based on tool in hand)
- Help Menu for quick command discovery
- Real-time world modification with instant feedback

### 5. Machinima Tools
- **Purpose:** Create cinematic content (used for the 2018 trailer)
- **Status:** Available but needs technical fixes
- **Quality:** Delivered great results for official trailers

### 6. Custom UI Framework (NoesisGUI)
- **Purpose:** Create custom user interfaces
- **Status:** In transition - consolidating from 3 UI frameworks to 1
- **Framework:** NoesisGUI (official UI framework)
- **Current State:** Asset-driven UIs are available but incomplete
- **Recommendation:** Start experimenting and provide feedback

---

## Official Documentation & Resources

### Official Hytale Documentation (GitBook)
- **Status:** In progress
- **Platform:** GitBook (same as this documentation!)
- **Note:** Will start incomplete but expand based on community questions
- **Official Statement:** *"We are working on public creator documentation hosted on GitBook"*

### Server Source Code (Coming Soon)
- **Release:** Within 1-2 months after Early Access launch (March 2026)
- **Access:** Full server source code will be shared
- **Purpose:** 
  - Inspect how systems work under the hood
  - Unblock yourself when documentation is incomplete
  - Contribute improvements and bug fixes
- **Note:** Server is not obfuscated - can be decompiled now

### Development Bounties (Future)
- **Plan:** Open bounties for specific improvements and features
- **Goal:** Reward contributions that strengthen the ecosystem
- **Timeline:** Takes time to set up properly

---

## Community & Support

### Official Channels
- **Discord:** [Official Hytale Discord](https://discord.gg/hytale) - Talk directly with developers and modders
- **Discord (CurseForge):** [CurseForge UGC Discord](https://discord.gg/S3EaZArYz2) - User-generated content focus
- **X / Reddit:** Tweet at @Hytale or post on Hytale subreddits
- **Official Blog:** [Hytale News](https://hytale.com/news) - Latest updates and strategy posts

### What to Expect
- **Early Access Reality:** Tools are uneven, documentation is incomplete, some workflows are frustrating
- **Rapid Improvements:** Developers are fixing issues as they come in
- **Transparency:** Developers commit to being honest about what's ready and what's not
- **Your Feedback Matters:** Hold developers accountable, demand answers, provide feedback

---

## Important Warnings

### Data Safety
> **Critical:** Hytale is in true Early Access. There are crashes, and some can cause **data loss**.

**Practical Advice:**
- **Take frequent backups** of your savegames and creations
- Treat this phase as valuable but **not yet safe for irreplaceable work**
- Automatic backup solutions are being developed

### Current Limitations
- Missing editing capabilities for some features
- Client behavior not fully exposed to server
- Some tools are rough, inconsistent, or painful to work with
- Modding maturity varies wildly depending on what you're building

---

## Long-Term Vision

### Node Editors (Coming)
- **Purpose:** Visual editors for complex JSON assets
- **Target:** NPCs, Interactions, World Generation
- **Integration:** Directly into Hytale Asset Editor
- **Goal:** Unified creator suite instead of patchwork tools

### Visual Scripting (Core Pillar)
- **Timeline:** Long-term priority
- **Features:**
  - Sandboxed, safe environment for sharing logic
  - Great learnability for all skill levels
  - Programmers can extend with performance-critical nodes
  - Eventually: Visual scripting directly in the 3D world

### First-Party Server Network
- **Plan:** Hypixel-style minigames network
- **Purpose:** 
  - Validate modding tools at scale
  - Share code and assets for learning
  - Ensure playable content during early days
- **Note:** Not trying to compete with community servers

---

## Getting Started

### For Content Creators (No Coding)
1. Start with **Packs** - Create blocks, items, and content using JSON
2. Use the **Asset Editor** to modify properties visually
3. Learn **Blockbench** for custom models and textures
4. Follow the [Getting Started with Packs](02-getting-started-with-packs.md) guide

### For Developers (Java)
1. Learn **Java programming** fundamentals
2. Set up your development environment (IntelliJ IDEA recommended)
3. Clone the [Plugin Template](https://github.com/realBritakee/hytale-template-plugin)
4. Follow the [Getting Started with Plugins](07-getting-started-with-plugins.md) guide

### For Advanced Users
1. Explore **Bootstrap/Early Plugins** for low-level modifications
2. Study the decompiled server source (or wait for official release)
3. Follow the [Bootstrap/Early Plugins](09-bootstrap-early-plugins.md) guide

---

## Closing Words

*From Slikey (Technical Director):*

> "If you're willing to join us in this phase - bugs, rough edges and all - you won't just be modding Hytale. You'll be shaping what Hytale modding becomes."

This documentation aims to help you navigate the current state of Hytale modding while preparing you for the exciting future ahead.

---

**Next:** [Getting Started with Packs →](02-getting-started-with-packs.md)

---


