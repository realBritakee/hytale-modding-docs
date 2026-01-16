# Hytale Modding Documentation

**Compiled:** January 10, 2026  
**Status:** Hytale is currently in Early Access  
**Official Reference:** [Hytale Modding Strategy and Status](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)

---

## Important Notice

Hytale is currently in **Early Access**. This documentation is based on official Hytale sources and community testing.

**Key Points:**
- Official tools are actively being developed and improved
- Official GitBook documentation is in progress by Hytale developers
- **Take frequent backups** - crashes can cause data loss

> *"We're building Hytale with modding at its core. Most of what you see in the game can be changed, extended, or removed entirely."* - Slikey (Technical Director)

---

## Table of Contents

### Getting Started

1. **[Hytale Modding Overview](01-hytale-modding-overview.md)** ⭐ **UPDATED**  
   Official modding categories, philosophy, tools, and long-term vision. Based on Hytale's official modding strategy.

---

### Packs - Content Creation

2. **[Getting Started with Packs](02-getting-started-with-packs.md)**  
   How to create your first Pack: folder structure, manifest file, and basic setup.

3. **[Adding a Block](03-adding-a-block.md)**  
   Complete guide to creating custom blocks with textures, properties, and Asset Editor usage.

4. **[Block State Changing](04-block-state-changing.md)**  
   How to create blocks with multiple states (on/off, open/closed) and state cycling.

5. **[Item Categories](05-item-categories.md)**  
   Creating custom categories and subcategories for the Creative Menu.

6. **[Block Animations](06-block-animations.md)**  
   Adding animations to blocks using Blockbench and `.blockyanim` files.

---

### Plugins - Java Development

#### Getting Started

7. **[Getting Started with Plugins](07-getting-started-with-plugins.md)**  
   Setting up IntelliJ IDEA, understanding plugin structure, and creating your first Java plugin.

8. **[Example Command to Show Title](11-example-command-show-title.md)**  
   Example plugin command that displays titles to players in-game.

#### Core Features

9. **[Custom Config Files](08-custom-config-files.md)**  
   Creating and registering configuration files using Hytale's Codec system.

10. **[Common Plugin Features](14-common-plugin-features.md)**  
    Practical implementations of placeholders, translations, utilities, first join detection, and chat channels.

#### Advanced Development

11. **[Advanced Plugin Patterns](12-advanced-plugin-patterns.md)**  
    Professional architecture patterns including Service-Storage pattern, thread pools, event systems, and more.

12. **[Gradle Automation & Testing](13-gradle-automation-testing.md)**  
    Custom Gradle plugins for automated server testing and streamlined development workflows.

13. **[Bootstrap/Early Plugins](09-bootstrap-early-plugins.md)**  
    Advanced: Low-level modifications using class transformers (use only when absolutely necessary).

#### Project Templates

14. **[Plugin Project Template](15-plugin-project-template.md)** ⭐  
    Ready-to-use plugin template with modern build tools, automated testing, and CI/CD. Build immediately without any changes!

---

### Resources & Tools

15. **[Useful Tools & Links](10-useful-tools-and-links.md)** ⭐ **UPDATED**  
    Official tools (Blockbench, Asset Editor, Node Editor, Creative Mode), community resources, and development utilities.

16. **[Blockbench Modeling Guide](17-blockbench-modeling-guide.md)** 🎨 **NEW**  
    Official art style guidelines, modeling best practices, texturing tips, and Hytale-specific workflows from the Art Director.

17. **[World Generation Modding](16-world-generation-modding.md)** 🌍 **NEW**  
    Create custom biomes, terrain, and procedural content using the V2 world generator and visual node editor.

---

## Quick Start Guides

### For Content Creators (No Coding):

**Creating Asset Packs:**
1. Start with [Hytale Modding Overview](01-hytale-modding-overview.md)
2. Follow [Getting Started with Packs](02-getting-started-with-packs.md)
3. Learn [Adding a Block](03-adding-a-block.md)
4. Explore [Block Animations](06-block-animations.md) and [Block State Changing](04-block-state-changing.md)

**Required Tools:**
- Blockbench (for 3D models)
- Image editor (for textures)
- Text editor (for JSON files)

---

### For Developers (Java Programming):

**Creating Plugins:**
1. Read [Hytale Modding Overview](01-hytale-modding-overview.md)
2. **Clone the [Plugin Project Template](15-plugin-project-template.md)** - Start with a working project!
3. Follow [Getting Started with Plugins](07-getting-started-with-plugins.md)
4. Study [Example Command: Show Title](11-example-command-show-title.md)
5. Learn [Custom Config Files](08-custom-config-files.md)
6. Implement [Common Plugin Features](14-common-plugin-features.md)
7. Master [Advanced Plugin Patterns](12-advanced-plugin-patterns.md)
8. Automate with [Gradle Automation & Testing](13-gradle-automation-testing.md)
9. Only if needed: [Bootstrap/Early Plugins](09-bootstrap-early-plugins.md)

**Required Tools:**
- IntelliJ IDEA
- Java 25 JDK
- Gradle (included in template)

**Quick Start:**
```bash
git clone https://github.com/realBritakee/hytale-template-plugin.git
cd hytale-template-plugin
./gradlew shadowJar  # Builds immediately!
```

---

## What Are Mods in Hytale?

### Four Official Modding Categories:

According to [Hytale's official modding strategy](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status):

#### 1. **Server Plugins** (Java .jar files)
- **Purpose:** Extend server functionality programmatically
- **Power Level:** Extremely powerful - deep modifications to gameplay and core systems
- **Use Cases:** Minigames, economies, commands, custom logic, new asset types
- **Tools:** Java 25, IntelliJ IDEA
- **Best For:** Programmers, developers
- **API Access:** Full game API

#### 2. **Data Assets** (JSON files)
- **Purpose:** Drive gameplay behavior and define core content
- **Content Types:** Blocks, items, NPCs, world generation, drop tables, loot
- **Tools:** Asset Editor (no coding required)
- **Best For:** Content creators, artists, designers
- **Files:** JSON configuration files
- **Can be used with:** Plugins for extended functionality

#### 3. **Art Assets** (Sounds, Models, Textures)
- **Purpose:** Visual and audio representation of game elements
- **Content Types:** 3D models, textures, sounds, animations
- **Official Tool:** Blockbench (officially supported)
- **Best For:** Artists, 3D modelers, texture artists
- **Files:** .bbmodel, .png, .ogg, etc.

#### 4. **Save Files** (Worlds and Prefabs)
- **Purpose:** Share complete creations
- **Content Types:** Worlds (complete playable worlds), Prefabs (structures like trees, houses)
- **Use Cases:** Creative tools, world generation, sharing builds
- **Best For:** Builders, world designers
- **Files:** World saves, prefab structures

### Additional: Bootstrap/Early Plugins (Advanced)
- **Purpose:** Low-level modifications (bytecode transformation)
- **Tools:** Java, ASM library
- **Best For:** Expert developers only
- **Warning:** Can cause stability issues
- **Use:** Only when absolutely necessary
- **Note:** Not part of official modding categories

---

## File Paths Quick Reference

### For Packs:

```bash
%AppData%/Roaming/Hytale/UserData/Packs/YourPackName/
|-- manifest.json
|-- Common/
|   |-- BlockTextures/
|   |-- Icons/
|   |-- Models/
|   `-- Blocks/
|       `-- Animations/
`-- Server/
    |-- Item/
    |   |-- Items/
    |   `-- Category/
    `-- Languages/
        `-- en-US/
```

### For Plugins:

```bash
%AppData%/Roaming/Hytale/UserData/Mods/
`-- your-plugin-1.0.0.jar
```

### For Early Plugins:

```bash
/path/to/hytale/earlyplugins/
`-- your-early-plugin-1.0.0.jar
```

---

## Key Tools

### Essential for Everyone:

- **Blockbench** - [blockbench.net](https://www.blockbench.net)  
  Official 3D modeling tool with Hytale plugin

- **Asset Editor** - Built into Hytale  
  Visual editor for Pack settings (in-game, Creation Tools tab)

- **Community Discord** - Various Hytale modding Discord servers  
  Community support and help

### For Plugin Developers:

- **IntelliJ IDEA** - [jetbrains.com/idea](https://www.jetbrains.com/idea/)  
  Recommended IDE (Community Edition is free)

- **Java 25** - [oracle.com/java](https://www.oracle.com/java/)  
  Required JDK version

- **Plugin Template** - Available via Community documentation  
  Pre-configured project with examples

---

## Documentation Structure

Each guide includes:
-  Step-by-step instructions
-  Code/JSON examples
-  Complete file structures
-  Troubleshooting sections
-  Best practices
-  Common pitfalls to avoid

---

## Learning Path

### Beginner (Packs):
1. Modding Overview
2. Getting Started with Packs
3. Adding a Block
4. Item Categories

### Intermediate (Packs):
1. Block State Changing
2. Block Animations
3. Advanced Pack features

### Beginner (Plugins):
1. Modding Overview
2. Getting Started with Plugins
3. Custom Config Files
4. Example Command to Show Title

### Advanced (Plugins):
1. Event handling (API docs)
2. Custom commands (API docs)
3. Bootstrap/Early Plugins (if absolutely necessary)

---

## Contributing

Found an issue or want to contribute?
- Submit issues or pull requests on GitHub
- Join community discussions
- Help others in the modding community

---

## Credits

These tutorials were compiled and enhanced by the Hytale modding community, with contributions from:
- **Sketch Macaw** - Pack tutorials
- **Darkhax** - Plugin tutorials
- **Jared** - Plugin template and tutorials
- **Rick** - Plugin tutorials
- **Buuz** - Config file tutorial
- **Community Contributors** - Documentation maintenance and improvements

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| Jan 10, 2026 | 1.1 | Updated with official Hytale modding strategy, added four official categories, visual scripting info |
| Jan 9, 2026 | 1.0 | Initial compilation of all tutorials |

---

## Official Resources

### Official Hytale
- **[Hytale Official Site](https://hytale.com/)** - Main website
- **[Modding Strategy & Status](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)** - Official modding roadmap
- **[Official Discord](https://discord.gg/hytale)** - Direct access to developers
- **[Official Blog](https://hytale.com/news)** - Latest updates and announcements

### Official Tools
- **[Blockbench](https://www.blockbench.net/)** - Official 3D modeling tool
- **Hytale Asset Editor** - Built into the game (Creation Tools)
- **Asset Graph Editor** - Coming soon (node-based editor)
- **Visual Scripting** - Planned for future release

### Official Documentation (In Progress)
- **GitBook Documentation** - Being developed by Hytale team
- **Server Source Code** - Expected March 2026 (1-2 months after Early Access)
- **Development Bounties** - Planned for community contributions

### Community Resources
- **[CurseForge Discord](https://discord.gg/S3EaZArYz2)** - User-generated content focus
- **[Plugin Template](https://github.com/realBritakee/hytale-template-plugin)** - Ready-to-use project
- **Hytale Subreddits** - Community discussions
- **X/Twitter** - @Hytale for updates

---

## Support

### Getting Help:

1. **Read the relevant tutorial** - Most questions are answered in the docs
2. **Check Troubleshooting sections** - Common issues are documented
3. **Search Community Forums** - Your question may have been answered
4. **Ask the Community** - Join Hytale modding communities
5. **Check Official Resources** - Refer to official documentation

### When Asking for Help:

Include:
- What you're trying to achieve
- What you've tried
- Error messages (if any)
- Relevant code/JSON
- Your environment (OS, Java version, Hytale version)

---

## License & Terms

This documentation is provided for educational purposes to help the Hytale modding community.

- **License:** Community documentation
- **Usage:** Free for educational and development purposes
- **Contributions:** Welcome via GitHub

---

## Stay Updated

Hytale modding is evolving! Stay informed:
- Join Hytale modding communities
- Follow official Hytale channels
- Check community resources regularly
- Watch for announcements in-game

---

**Happy Modding!** 

*Start your Hytale modding journey today with these comprehensive guides.*
