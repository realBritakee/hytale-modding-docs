# Useful Tools & Links

**Source:** [Official Hytale Resources](https://hytale.com/)  
**Last Modified:** Friday, January 10, 2026

---

## Overview

This page provides a curated collection of official tools, community resources, and development utilities for Hytale modding. Whether you're creating Packs, developing Plugins, or designing worlds, these resources will help streamline your workflow.

---

## Official Hytale Tools

### Blockbench + Hytale Plugin ⭐

**Website:** [https://www.blockbench.net](https://www.blockbench.net)  
**Hytale Plugin:** [https://www.blockbench.net/plugins/hytale_plugin](https://www.blockbench.net/plugins/hytale_plugin)  
**Plugin Source:** [GitHub](https://github.com/JannisX11/hytale-blockbench-plugin)  
**Official Guide:** [Making Models for Hytale](https://hytale.com/news/2025/12/an-introduction-to-making-models-for-hytale)

**Description:**  
The **officially supported** tool for creating Hytale models, textures, and animations. Replaces Hytale's internal modeling tools to support established creative workflows.

**Status:** Releasing soon (Early Access)

#### Features:
- Create Hytale-compatible models, textures, and animations
- Maintains consistent pixel ratio across textures
- Exports in correct Hytale format
- Quality-of-life improvements for Hytale workflow
- Texture painting and UV mapping
- Real-time preview

#### Official Art Style Guidelines:
- **Primitives:** Only cubes and quads (no spheres!)
- **Texture Density:** 64px/unit for characters, 32px/unit for props/blocks
- **Texture Size:** Multiples of 32px (32, 64, 96, 128, etc.)
- **Stretching Limits:** 0.7X to 1.3X on any axis
- **Colors:** Avoid pure white and pure black
- **Triangle Count:** Keep optimized for performance

**Official Models:** [Download Examples](https://cdn.hytale.com/Hytale%20Model%20Examples.zip)

#### Getting Started:
1. Download Blockbench from the official website
2. Install the Hytale Blockbench plugin
3. Study official model examples
4. Follow [Blockbench Modeling Guide](17-blockbench-modeling-guide.md)
5. Export in Hytale format
6. Place files in your Pack's `Common/` folder

#### File Formats:
- **Models:** `.blockymodel` - Custom block/item models
- **Animations:** `.blockyanim` - Block animation files
- **Textures:** `.png` - Standard PNG images (multiples of 32px)

---

### Hytale Asset Editor

**Access:** Built into Hytale (Creation Tools tab)  
**Official Info:** [Modding Strategy](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)

**Description:**  
Visual editor for data assets (JSON files). Supports most asset types with some limitations.

**Status:** Available now in Early Access

#### Features:
- Edit data assets visually (no coding required)
- Supports blocks, items, and most asset types
- Direct integration with Hytale
- Live preview of changes

#### Current Limitations:
- Notable limitations around NPCs
- World generation editing limited
- Interactions not fully exposed
- **Note:** Will expand over time

#### Use Cases:
- Modify block properties
- Configure item behaviors
- Edit asset metadata
- Visual asset configuration

---

### Asset Graph Editor (Node Editor)

**Access:** Built into Hytale (after launch)  
**Official Info:** [World Generation Blog](https://hytale.com/news/2026/1/the-future-of-world-generation)

**Description:**  
Node-based editor for complex assets like world generation, NPCs, and creative tool brushes.

**Status:** Currently being released

#### Features:
- Visual node-graph interface
- Live-reload in-game
- No coding required
- Build advanced procedural content by linking simple nodes
- Full control over biomes, terrain, props, and materials

#### Use Cases:
- World generation (biomes, terrain, props)
- NPC behavior configuration
- Creative tool brush creation
- Complex asset configuration

#### World Generation Capabilities:
- **Pattern Scanning System** - Contextual prop placement
- **Terrain Shape Control** - Independent biome terrain
- **Material Providers** - Control terrain materials
- **Props System** - POIs, vegetation, decorations
- **Live-Reload** - Instant in-game feedback

**Note:** Internal tool being made public - expect rough edges but useful functionality.

---

### Creative Mode Tools

**Access:** Built into Hytale (Creative Mode)  
**Official Info:** [Creative Mode Blog](https://hytale.com/news/2025/11/hytale-creative-mode)

**Description:**  
Interactive suite of in-game tools for world editing and content creation.

**Status:** Available in Early Access

#### Tools Available:
- **Scripted Brushes** - Asset-defined brushes (mountains, paths, ruins)
- **Shape Brush** - Paint pyramids, cones, squares, and more
- **Selection Tool** - 3D selections, copy, paste, move, rotate
- **Paste Tool** - Precise prefab placement
- **Ruler Tool** - Measure distances and mark outlines
- **Laser Pointer** - Point out locations to friends
- **Machinima Tool** - Camera animation and recording
- **Prefab Browser/Editor** - Browse and edit prefabs
- **Player Model Changer** - Become any NPC model

#### Creative Mode Features:
- Customizable flight (speed, controls, inertia)
- Quick Settings Panel
- Help Menu for commands
- Real-time world modification

---

### Machinima Tools

**Access:** Built into Hytale  
**Official Info:** [Modding Strategy](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)

**Description:**  
Tools used to create the official 2018 Hytale trailer. Create cinematic content with camera animations.

**Status:** Available but needs technical fixes

#### Features:
- Camera actor placement
- Keyframe animation
- Speed and timing control
- Cinematic recording

**Note:** Scheduled for massive upgrade in functionality and UX after launch.

---

## Community Resources

### HytaleGuide.net ⭐

**Website:** [https://hytaleguide.net](https://hytaleguide.net)  
**Forum:** [Community Forum](https://hytaleguide.net)

**Description:**  
Comprehensive wiki dedicated to Hytale gameplay content, items, mobs, zones, and adventure mode information.

**Content:**
- **Items Database** - Weapons, armor, food, and item stats
- **Mobs Encyclopedia** - Creature information, drops, and locations
- **Zones Guide** - Emerald Grove, Borea, Devastated Lands, Howling Sands
- **Biomes Information** - Biome-specific content and features
- **Alterverses** - Information about Orbis and other planets
- **Guides Section** - Gameplay guides and tutorials
- **Community Forum** - Discussion and server listings

**Perfect for:**
- Learning about Hytale gameplay content
- Understanding items, mobs, and zones
- Adventure mode information
- Community discussions and server listings

**Note:** Focuses on gameplay content rather than modding - complementary to modding documentation.

---

### Hytale Modding Documentation

**Website:** [https://hytalemodding.dev](https://hytalemodding.dev/en/docs)  
**GitHub:** [HytaleModding/site](https://github.com/HytaleModding/site)

**Description:**  
Community-driven documentation site providing comprehensive guides and resources for Hytale modding. Open source and accepting contributions.

**Content:**
- **Quick Start** - Setting up a standard Hytale project
- **Learning to Learn** - Meta-learning guide for becoming a better learner
- **3D Modeling Guides** - Fundamentals, techniques, and best practices
- **Java Basics Series** - Programming tutorials for beginners
- **Publishing Your Mod** - How to distribute mods
- **Established Information** - Core modding concepts and FAQ
- **Contributing** - How to contribute to their documentation

**Philosophy:**
> "It is important to note that modding Hytale is not restricted to programming plugins. Programming, visual scripting, texturing, 3D modelling, modifying assets, etc. are all modding. In Hytale, anyone can be a modder."

**Perfect for:**
- Beginners learning Java programming
- Those looking for community-driven tutorials
- Modders wanting to publish their work
- Contributors who want to help improve documentation

---

### Hytale Modding Video Tutorials

**YouTube Playlist:** [Modding by Kaupenjoe](https://www.youtube.com/playlist?list=PLKGarocXCE1EBIOx2UTpGPZyWMpanSnDj)

**Description:**  
Comprehensive video tutorial series covering Hytale modding from basics to advanced topics.

**Content:**
- Step-by-step video guides
- Visual demonstrations
- Practical examples
- Beginner-friendly explanations
- Advanced techniques and patterns

**Perfect for:** Visual learners who prefer video tutorials over written documentation.

---

## Development Tools

### IntelliJ IDEA

**Website:** [https://www.jetbrains.com/idea/](https://www.jetbrains.com/idea/)

**Description:**  
The recommended IDE for Java plugin development.

**Versions:**
- **Community Edition:** Free, sufficient for Hytale plugin development
- **Ultimate Edition:** Paid, includes additional features

**Why IntelliJ:**
- Excellent Java support
- Built-in Gradle integration
- Powerful debugging tools
- Code completion and refactoring
- Integration with version control

---

### Java Development Kit (JDK)

**Required Version:** Java 25

**Download:**
- **Oracle JDK:** [https://www.oracle.com/java/](https://www.oracle.com/java/)
- **OpenJDK:** [https://openjdk.org/](https://openjdk.org/)

**Note:** Hytale plugins require Java 25 specifically.

---

### Gradle

**Website:** [https://gradle.org/](https://gradle.org/)

**Description:**  
Build automation tool used for compiling and packaging Hytale plugins.

**Features:**
- Dependency management
- Build automation
- Plugin packaging
- Task execution

**Note:** Usually included with plugin templates, manual installation not typically required.

---

### Custom Gradle Plugin for Server Testing

**Documentation:** [Gradle Automation & Testing](13-gradle-automation-testing.md)

**Description:**  
Custom Gradle plugin that automates the entire development workflow: build, deploy, and test your plugin on a Hytale server with a single command.

**Features:**
- Automatic server JAR download and caching
- Compiles and deploys your plugin automatically
- Starts server with interactive console
- One-command workflow: `./gradlew runServer`
- Saves hours of manual testing time

**Use Cases:**
- Rapid plugin development and testing
- Automated CI/CD pipelines
- Multi-version server testing
- Remote debugging support

**Learn More:**  
See the complete implementation guide in [Gradle Automation & Testing](13-gradle-automation-testing.md).

---

## Graphics & Design Tools

### Paint.NET

**Website:** [https://www.getpaint.net/](https://www.getpaint.net/)

**Description:**  
Free image editing software for Windows, perfect for creating textures.

**Use Cases:**
- Creating block textures (16x16, 32x32)
- Editing icons
- Creating UI elements
- Alpha channel support

---

### GIMP

**Website:** [https://www.gimp.org/](https://www.gimp.org/)

**Description:**  
Free and open-source image editor, available for all platforms.

**Use Cases:**
- Advanced texture creation
- Photo manipulation
- Complex transparency effects
- Texture atlases

---

## Version Control

### Git

**Website:** [https://git-scm.com/](https://git-scm.com/)

**Description:**  
Version control system to track changes in your mod projects.

**Why Use Git:**
- Track all changes to your code
- Collaborate with other developers
- Revert to previous versions if needed
- Create branches for experimental features

---

### GitHub

**Website:** [https://github.com/](https://github.com/)

**Description:**  
Online platform for hosting Git repositories.

**Benefits:**
- Share your mods with the community
- Collaborate with other modders
- Issue tracking
- Free for public and private repositories

---

## Code Libraries & Tools

### ASM

**Website:** [https://asm.ow2.io/](https://asm.ow2.io/)

**Description:**  
Java bytecode manipulation and analysis framework.

**Use Cases:**
- Creating early/bootstrap plugins
- Advanced class transformations
- Bytecode injection

**Note:** Only needed for advanced plugin development.

---

## Documentation Tools

### Markdown Editors

#### Typora
**Website:** [https://typora.io/](https://typora.io/)  
Clean markdown editor for documentation.

#### Visual Studio Code
**Website:** [https://code.visualstudio.com/](https://code.visualstudio.com/)  
Free editor with excellent markdown support.

**Use Cases:**
- Writing README files
- Creating mod documentation
- Maintaining changelogs
- Tutorial creation

---

## Testing & Debugging Tools

### Java Decompilers

#### JD-GUI
**Website:** [https://java-decompiler.github.io/](https://java-decompiler.github.io/)  
View Java source code from `.class` files.

#### CFR
**Website:** [https://www.benf.org/other/cfr/](https://www.benf.org/other/cfr/)  
Another Java decompiler with different strengths.

**Use Cases:**
- Understanding game code structure
- Debugging class transformations
- Learning from vanilla implementations

---

### JSON Validators

**Online Tools:**
- [https://jsonlint.com/](https://jsonlint.com/)
- [https://jsonformatter.curiousconcept.com/](https://jsonformatter.curiousconcept.com/)

**Use Cases:**
- Validating manifest.json files
- Checking block/item definitions
- Finding syntax errors

---

## Mod Distribution Platforms

### CurseForge

**Website:** [https://www.curseforge.com](https://www.curseforge.com)  
**Discord:** [CurseForge UGC Discord](https://discord.gg/S3EaZArYz2)

**Description:**  
Large mod hosting platform supporting multiple games including Hytale.

**Features:**
- Established platform with large user base
- Mod hosting and distribution
- Automatic updates
- Community features

---

### GitHub Releases

**Website:** [https://github.com](https://github.com)

**Description:**  
Use GitHub releases to distribute your mods directly.

**Benefits:**
- Version control integration
- Open source friendly
- Direct download links
- Changelog management

**Perfect for:**
- Open source mods
- Developer-focused distribution
- Beta testing and pre-releases

---

## Learning Resources

### Java Tutorials

#### Hytale Modding - Java Basics
**Website:** [hytalemodding.dev/guides/java-basics](https://hytalemodding.dev/en/docs/guides/java-basics)  
Community-created Java basics series specifically for Hytale modders.

#### w3schools Java Tutorial
**Website:** [https://www.w3schools.com/java/](https://www.w3schools.com/java/)  
Interactive Java tutorials with examples.

#### GeeksforGeeks Java
**Website:** [https://www.geeksforgeeks.org/java/](https://www.geeksforgeeks.org/java/)  
Comprehensive Java programming tutorials and examples.

#### Oracle Java Tutorials
**Website:** [https://docs.oracle.com/javase/tutorial/](https://docs.oracle.com/javase/tutorial/)  
Official Java documentation and tutorials.

#### Java Programming MOOC
**Website:** [https://java-programming.mooc.fi/](https://java-programming.mooc.fi/)  
Free comprehensive Java course.

---

### Modding Tutorials

#### Official Hytale Blog
**Website:** [https://hytale.com/news](https://hytale.com/news)  
Official tutorials, guides, and development updates.

#### Hytale Modding Documentation
**Website:** [https://hytalemodding.dev](https://hytalemodding.dev/en/docs)  
Community-driven modding documentation with guides and tutorials.

#### This Documentation
Comprehensive guides covering Packs, Plugins, World Generation, and more.

---

## Additional Utilities

### NBTExplorer

**Description:**  
Tool for viewing and editing game data files.

**Use Cases:**
- Debugging save data
- Understanding data structures
- Testing data persistence

---

### WinMerge / Beyond Compare

**Description:**  
File comparison tools for comparing versions.

**Use Cases:**
- Comparing JSON files
- Finding differences between versions
- Merging changes from multiple developers

---

## Recommended Workflow Tools

### Notion / Obsidian

**Description:**  
Note-taking and project management tools.

**Use Cases:**
- Planning mod features
- Tracking bugs and tasks
- Organizing ideas
- Creating knowledge bases

---

### Trello / GitHub Projects

**Description:**  
Project management boards.

**Use Cases:**
- Task tracking
- Collaboration
- Roadmap planning
- Sprint planning

---

## Quick Reference Links

| Tool | Type | Link | Cost |
|------|------|------|------|
| Blockbench | 3D Modeling | [blockbench.net](https://www.blockbench.net) | Free |
| IntelliJ IDEA | IDE | [jetbreans.com/idea](https://www.jetbrains.com/idea/) | Free/Paid |
| Java 25 JDK | Runtime | [oracle.com/java](https://www.oracle.com/java/) | Free |
| Gradle Server Plugin | Testing Automation | [See Guide](13-gradle-automation-testing.md) | Free |
| Paint.NET | Textures | [getpaint.net](https://www.getpaint.net/) | Free |
| GIMP | Textures | [gimp.org](https://www.gimp.org/) | Free |
| Git | Version Control | [git-scm.com](https://git-scm.com/) | Free |
| GitHub | Hosting | [github.com](https://github.com/) | Free |
| VS Code | Editor | [code.visualstudio.com](https://code.visualstudio.com/) | Free |

---

## Getting Help

### When You're Stuck:

1. **Check Documentation:** Review the official tutorials first
2. **Search Community Forums:** Someone may have asked your question
3. **Ask the Community:** Join Hytale modding communities
4. **Check Examples:** Look at vanilla assets or other mods
5. **Read Error Logs:** They often contain helpful information

### How to Ask Good Questions:

- Describe what you're trying to achieve
- Show what you've tried
- Include error messages
- Provide relevant code/JSON
- Mention your environment (OS, Java version, etc.)

---

## Contributing

### Share Your Tools:

If you've created useful tools for Hytale modding:
1. Share them on community forums
2. Submit to the Hytale Modding Wiki
3. Create GitHub repositories
4. Write tutorials

### Report Broken Links:

If any links in this documentation are broken or outdated:
- Report on GitHub issues
- Join community discussions
- Suggest updates via pull requests

---

## Updates

This page will be updated as new tools and resources become available. Check back regularly for updates.

**Last Updated:** January 9, 2026

---

