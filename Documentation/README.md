# Hytale Modding Documentation

**Compiled:** January 9, 2026  
**Status:** Hytale is currently in Early Access

---

## Important Notice

Hytale is currently in **Early Access**, and these tutorials may contain outdated or incomplete information. This documentation aims to provide accurate and helpful guidance for Hytale modders.

---

## Table of Contents

### Getting Started

1. **[Hytale Modding Overview](01-hytale-modding-overview.md)**  
   Introduction to Hytale modding, mod types (Packs, Plugins, Early Plugins), and Creation Tools.

2. **[Getting Started with Packs](02-getting-started-with-packs.md)**  
   How to create your first Pack: folder structure, manifest file, and basic setup.

---

### Packs - Content Creation

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

7. **[Getting Started with Plugins](07-getting-started-with-plugins.md)**  
   Setting up IntelliJ IDEA, downloading the template, and creating your first Java plugin.

8. **[Custom Config Files](08-custom-config-files.md)**  
   Creating and registering configuration files using Hytale's Codec system.

9. **[Bootstrap/Early Plugins](09-bootstrap-early-plugins.md)**  
   Advanced: Low-level modifications using class transformers (use only when necessary).

---

### Resources & Tools

10. **[Useful Tools & Links](10-useful-tools-and-links.md)**  
    Essential tools, community resources, and development utilities for Hytale modding.

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
2. Follow [Getting Started with Plugins](07-getting-started-with-plugins.md)
3. Learn [Custom Config Files](08-custom-config-files.md)
4. Only if needed: [Bootstrap/Early Plugins](09-bootstrap-early-plugins.md)

**Required Tools:**
- IntelliJ IDEA
- Java 25 JDK
- Gradle (included in template)

---

## What Are Mods in Hytale?

### Three Types of Mods:

#### 1. **Packs** (Asset/Content Packs)
- **Purpose:** Add new blocks, mobs, items, and behavior
- **Tools:** Asset Editor (no coding required)
- **Best For:** Content creators, artists, designers
- **Files:** JSON, textures, models
- **Can be used with:** Plugins

#### 2. **Plugins** (Java Mods)
- **Purpose:** Expand vanilla functionality with code
- **Tools:** Java 25, IntelliJ IDEA
- **Best For:** Programmers, developers
- **Files:** Java source, compiled JARs
- **API Access:** Full game API

#### 3. **Bootstrap/Early Plugins** (Advanced)
- **Purpose:** Low-level modifications (bytecode transformation)
- **Tools:** Java, ASM library
- **Best For:** Expert developers only
- **Warning:** Can cause stability issues
- **Use:** Only when absolutely necessary

---

## File Paths Quick Reference

### For Packs:

```
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

```
%AppData%/Roaming/Hytale/UserData/Mods/
`-- your-plugin-1.0.0.jar
```

### For Early Plugins:

```
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
| Jan 9, 2026 | 1.0 | Initial compilation of all tutorials |

---

## Additional Resources

### Official:
- [Hytale Official Site](https://hytale.com/)
- [Blockbench](https://www.blockbench.net/)

### Community:
- Hytale Modding Wiki (TBC)
- Community Discord servers
- Community tutorials and resources

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
