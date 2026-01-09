# Useful Tools & Links

**Source:** [Useful Tools & Links](https://hytale.com/)  
**Last Modified:** Friday, January 9, 2026 at 12:02 PM

---

## Overview

This page provides a curated collection of useful tools, links, and community resources for Hytale modding. Whether you're creating Packs or developing Plugins, these resources will help streamline your development process.

---

## Official Tools

### Blockbench

**Website:** [https://www.blockbench.net](https://www.blockbench.net)  
**Hytale Plugin:** [https://www.blockbench.net/plugins/hytale_plugin](https://www.blockbench.net/plugins/hytale_plugin)

**Description:**  
The official tool for creating models and assets for Hytale, with a specialized plugin to integrate easily within the game.

#### Features:
-  Create custom 3D block models
-  Design items and entities
-  Create and edit animations
-  Hytale-specific export formats (`.blockymodel`, `.blockyanim`)
-  Texture painting and UV mapping
-  Preview models in real-time

#### Getting Started:
1. Download Blockbench from the official website
2. Install the Hytale plugin
3. Create or import models
4. Export in Hytale format
5. Place files in your Pack's `Common/` folder

#### File Formats:
- **Models:** `.blockymodel` - Custom block/item models
- **Animations:** `.blockyanim` - Block animation files
- **Textures:** `.png` - Standard PNG images

---

## Community Resources

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

### Hytale Modding Wiki

**Status:** To Be Confirmed (TBC)

**Description:**  
This knowledge base offers up-to-date information on mod creation and tutorials, contributed by a team of experienced developers and authors.

**Expected Content:**
- Comprehensive API documentation
- Community-created tutorials
- Best practices and patterns
- Code examples and snippets
- Troubleshooting guides
- Advanced techniques

**Note:** Check community forums for the latest link when available.

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

## Learning Resources

### Java Tutorials

#### Oracle Java Tutorials
**Website:** [https://docs.oracle.com/javase/tutorial/](https://docs.oracle.com/javase/tutorial/)  
Official Java documentation and tutorials.

#### Java Programming MOOC
**Website:** [https://java-programming.mooc.fi/](https://java-programming.mooc.fi/)  
Free comprehensive Java course.

---

### Modding Tutorials

#### Hytale Documentation
**Website:** [https://hytale.com/](https://hytale.com/)  
Official tutorials and guides (this documentation set).

#### Community Tutorials
Check Hytale Modding Wiki (when available) and community forums for community-created tutorials.

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

