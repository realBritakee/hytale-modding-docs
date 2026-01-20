# Hytale Modding Documentation

## 🤝 Official Partner
**[Hytale Creators](https://hytalecreators.net)** is a proud partner of this documentation project. We are working together to build a valuable ecosystem for the Hytale modding community through educational content, technical guides, and blog resources.

* **Website:** [hytalecreators.net](https://hytalecreators.net)
* **Community:** [Join the Hytale Creators Discord](https://discord.com/invite/WBspAsKvPZ)

---

**Compiled:** January 16, 2026
**Status:** Hytale is currently in Early Access
**Official Reference:** [Hytale Modding Strategy and Status](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)

---

## Important Notice

Hytale is currently in **Early Access**. This documentation is based on official Hytale sources and community testing.

**Key Points:**

* Official tools are actively being developed and improved.
* Official GitBook documentation is in progress by Hytale developers.
* **Take frequent backups** - crashes can cause data loss.

> *"We're building Hytale with modding at its core. Most of what you see in the game can be changed, extended, or removed entirely."* - Slikey (Technical Director)

if you need further help, feel free to join my [Discord](https://discord.gg/gCRv62araB), and write a message to @Britakee
---

## Table of Contents

### INTRODUCTION

* **Overview** (README.md)
* **[Frequently Asked Questions](00-frequently-asked-questions.md)** ❓
* **[Technical Insights](00-technical-insights.md)** ⚙️
* **[Youtube Tutorials](00-youtube-tutorials.md)** 📺

### GETTING STARTED

* **[Hytale Modding Overview](01-hytale-modding-overview.md)** ⭐
Official modding categories, philosophy, tools, and long-term vision.

### SERVER - ADMINISTRATION

* **[Setting Up a Local Server](18-setting-up-local-server.md)** 🏠
* **[Running a Dedicated Server](19-running-dedicated-server.md)** ☁️
* **[Hytale Server Manager](20-hytale-server-manager.md)** 🛠️
* **[Server Configuration](21-server-configuration.md)** 📝
* **[Server Commands & Permissions](22-server-commands-permissions.md)** 🛡️
* **[Server Tips & Optimization](23-tips-and-optimization.md)** ⚡
* **[Future Server Additions](24-future-additions.md)** 🚀

### PACKS - CONTENT CREATION

* **[Getting Started with Packs](02-getting-started-with-packs.md)**
How to create your first Pack: folder structure, manifest file, and basic setup.
* **[Adding a Block](03-adding-a-block.md)**
Complete guide to creating custom blocks with textures, properties, and Asset Editor usage.
* **[Block State Changing](04-block-state-changing.md)**
How to create blocks with multiple states (on/off, open/closed).
* **[Item Categories](05-item-categories.md)**
Creating custom categories and subcategories for the Creative Menu.
* **[Block Animations](06-block-animations.md)**
Adding animations to blocks using Blockbench and `.blockyanim` files.
* **[Blockbench Modeling Guide](17-blockbench-modeling-guide.md)** 🎨

### PLUGINS - JAVA DEVELOPMENT

* **[Getting Started with Plugins](07-getting-started-with-plugins.md)**
Setting up IntelliJ IDEA and creating your first Java plugin.
* **[Example Command to Show Title](11-example-command-show-title.md)**
Practical implementation of a title command.
* **[Custom Config Files](08-custom-config-files.md)**
Registering configuration files using Hytale's Codec system.
* **[Common Plugin Features](14-common-plugin-features.md)**
Placeholders, translations, utilities, and chat channels.
* **[Advanced Plugin Patterns](12-advanced-plugin-patterns.md)**
Architecture patterns: Service-Storage, thread pools, and event systems.
* **[Gradle Automation & Testing](13-gradle-automation-testing.md)**
Automated server testing and development workflows.
* **[Bootstrap/Early Plugins](09-bootstrap-early-plugins.md)** ⚠️
Advanced: Low-level modifications using class transformers.
* **[Plugin Project Template](15-plugin-project-template.md)** ⭐
Ready-to-use plugin template with modern build tools and CI/CD.

### RESOURCES & TOOLS

* **[Useful Tools & Links](10-useful-tools-and-links.md)** ⭐
* **[World Generation Modding](16-world-generation-modding.md)** 🌍

---

## 🚀 Quick Start Guides

### For Content Creators (No Coding):

**Creating Asset Packs:**

1. Start with [Hytale Modding Overview](01-hytale-modding-overview.md)
2. Follow [Getting Started with Packs](02-getting-started-with-packs.md)
3. Learn [Adding a Block](03-adding-a-block.md)
4. Explore [Block Animations](06-block-animations.md) and [Block State Changing](04-block-state-changing.md)

**Required Tools:**

* **Blockbench** (for 3D models)
* **Image editor** (for textures)
* **Text editor** (for JSON files)

### For Developers (Java Programming):

**Creating Plugins:**

1. Read [Hytale Modding Overview](01-hytale-modding-overview.md)
2. Clone the [Plugin Project Template](15-plugin-project-template.md) - Start with a working project!
3. Follow [Getting Started with Plugins](07-getting-started-with-plugins.md)
4. Study [Example Command: Show Title](11-example-command-show-title.md)

**Required Tools:**

* **IntelliJ IDEA**
* **Java 25 JDK**
* **Gradle** (included in template)

**Quick Start:**

```bash
git clone https://github.com/realBritakee/hytale-template-plugin.git
cd hytale-template-plugin
./gradlew shadowJar  # Builds immediately!

```

---

## What Are Mods in Hytale?

### Four Official Modding Categories:

1. **Server Plugins (Java .jar files)**
* **Purpose:** Extend server functionality programmatically.
* **Use Cases:** Minigames, economies, custom logic.
* **Tools:** Java 25, IntelliJ IDEA.


2. **Data Assets (JSON files)**
* **Purpose:** Drive gameplay behavior and define core content.
* **Content:** Blocks, items, NPCs, world generation.
* **Tools:** Asset Editor (no coding required).


3. **Art Assets (Sounds, Models, Textures)**
* **Purpose:** Visual and audio representation.
* **Tools:** Blockbench (Official Support).


4. **Save Files (Worlds and Prefabs)**
* **Purpose:** Share complete creations and structures.



---

## 📂 File Paths Quick Reference

**For Packs:**
`%AppData%/Roaming/Hytale/UserData/mods/`

**For Plugins:**
`%AppData%/Roaming/Hytale/UserData/earlyplugins/`

---

## 📜 Version History

| Date | Version | Changes |
| --- | --- | --- |
| **Jan 16, 2026** | **1.2** | Full restructure to match documentation taskbar; added all 24 local pages. |
| Jan 10, 2026 | 1.1 | Updated with official Hytale modding strategy, categories, and visual scripting info. |
| Jan 9, 2026 | 1.0 | Initial compilation of community tutorials. |

---

## 🌐 Official Resources

### Official Hytale

* **[Hytale Official Site](https://hytale.com)** — Main website
* **[Modding Strategy & Status](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)** — Official roadmap
* **[Official Discord](https://discord.gg/hytale)** — Direct access to developers
* **[Official Blog](https://hytale.com/news)** — Latest updates and announcements

### Official Tools

* **Blockbench** — Official 3D modeling tool
* **Hytale Asset Editor** — Built into the game (Creation Tools)
* **Asset Graph Editor** — Coming soon (node-based editor)
* **Visual Scripting** — Planned for future release

### Official Documentation (In Progress)

* **GitBook Documentation** — Being developed by Hytale team
* **Server Source Code** — Expected March 2026 (1-2 months after Early Access)

---

## 🆘 Support

### Getting Help:

1. **Read the relevant tutorial** — Most questions are answered in the docs.
2. **Check Troubleshooting sections** — Common issues are documented.
3. **Search Community Forums** — Your question may have been answered.
4. **Ask the Community** — Join Hytale modding communities.
5. **Check Official Resources** — Refer to official documentation.

### When Asking for Help:

Please include:

* What you're trying to achieve
* What you've tried
* Error messages (if any)
* Relevant code/JSON
* Your environment (OS, Java version, Hytale version)

---

## ⚖️ License & Terms

This documentation is provided for educational purposes to help the Hytale modding community.

* **License:** Community documentation
* **Usage:** Free for educational and development purposes

---

## ✨ Stay Updated

Hytale modding is evolving! Stay informed:

* Join Hytale modding communities
* Follow official Hytale channels
* Check community resources regularly
* Watch for announcements in-game