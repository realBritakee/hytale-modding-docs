# Documentation Changelog

## Version 1.3 - January 10, 2026

### Major Update: Official Tools, World Generation, and Modeling Guides

**New Documentation Files:**
- `16-world-generation-modding.md` - Complete guide to V2 world generator and node editor
- `17-blockbench-modeling-guide.md` - Official art style and modeling best practices

**Updated Files:**
- `01-hytale-modding-overview.md` - Expanded Creative Mode tools section
- `10-useful-tools-and-links.md` - Complete rewrite with all official tools
- `README.md` - Added new documentation entries
- `SUMMARY.md` - Added new pages to table of contents
- `DISCORD_ANNOUNCEMENT.txt` - Updated with new content
- `FORUM_POST_BBCODE.txt` - Updated with new content

**Content Added:**

### World Generation (16-world-generation-modding.md)
- V1 vs V2 world generators
- Pattern scanning system
- Code mods API features
- Visual node editor workflow
- Terrain shape control
- Material providers
- Props system
- Official biomes (Emerald Wilds, Whisperfrost Frontier, Howling Sands)
- Experimental feature packs
- Future roadmap (procedural rivers, architecture, fauna, waterfalls)
- World Designer job roles (15+ positions)

### Blockbench Modeling (17-blockbench-modeling-guide.md)
- Four art pillars (Immersive, Fantasy, Stylized, Flexible)
- Hytale art style definition
- Geometry constraints (cubes and quads only)
- Hytale proportions
- Triangle count optimization
- Texture size and density (64px for characters, 32px for props)
- Stretching guidelines (0.7X to 1.3X)
- Texturing brushes and techniques
- Color picking guidelines
- Shading modes and materials
- Hytale renderer details
- Official tutorial videos and model examples

### Useful Tools & Links Updates
- Blockbench Plugin (official, releasing soon)
- Hytale Asset Editor (available now)
- Asset Graph Editor / Node Editor (being released)
- Creative Mode Tools (detailed list)
- Machinima Tools
- Official art style guidelines
- Texture density requirements
- Download links for official model examples

### Creative Mode Tools
- Scripted Brushes
- Shape Brush
- Selection Tool
- Paste Tool
- Ruler/Laser Pointer
- Prefab Browser/Editor
- Player Model Changer
- Machinima Camera
- Customizable flight
- Quick Settings Panel

**Sources:**
- [The Future of World Generation](https://hytale.com/news/2026/1/the-future-of-world-generation)
- [An Introduction to Making Models for Hytale](https://hytale.com/news/2025/12/an-introduction-to-making-models-for-hytale)
- [Hytale Creative Mode](https://hytale.com/news/2025/11/hytale-creative-mode)
- [Hytale's 1st FAQ](https://hytale.com/news/2025/12/hytale-s-1st-faq)

---

## Version 1.2 - January 10, 2026

### Major Update: Official Hytale Modding Strategy Integration

**Added Official Information:**
- Updated [Hytale Modding Overview](01-hytale-modding-overview.md) with official modding strategy from Hytale
- Added four official modding categories (Server Plugins, Data Assets, Art Assets, Save Files)
- Added information about Visual Scripting (planned feature)
- Clarified that text-based scripting (Lua) will NOT be supported
- Added official tool information (Asset Editor, Blockbench Plugin, Asset Graph Editor, etc.)
- Added server source code release timeline (March 2026)
- Added official GitBook documentation status
- Added NoesisGUI as official UI framework
- Added data safety warnings and backup recommendations
- Added long-term vision (Node Editors, Visual Scripting, Development Bounties)

**Source:** [Hytale Modding Strategy and Status](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status) by Slikey (Technical Director)

**Updated Files:**
- `01-hytale-modding-overview.md` - Complete rewrite with official information
- `README.md` - Updated intro, modding categories, official resources section
- `CHANGELOG.md` - This file

**Key Additions:**
- Official modding philosophy (Server-side first, One community/one client, Modding for longevity)
- Current state of modding (Early Access reality check)
- Official tools roadmap
- Community & support channels
- Long-term vision for modders

---

## Version 1.1 - January 9, 2026

### Changes
-  **Removed all CurseForge branding** - Made documentation platform-neutral
-  **Updated all source links** - Changed from CurseForge support to generic community documentation
-  **Replaced external links** - Changed CurseForge-specific URLs to generic/Hytale official links
-  **Updated credits** - Attributed to community contributors instead of specific platform
-  **Neutralized references** - Changed "CurseForge Discord" to "Community Discord" throughout
-  **Updated book.json** - Changed author and sidebar links
-  **Made platform-agnostic** - Documentation now works independently of any platform

### Files Modified
- All 10 tutorial markdown files (01-10)
- README.md
- book.json
- SUMMARY.md (no changes needed)
- .gitbook.yaml (no changes needed)

### What Was Changed

#### Before:
- "Source: CurseForge Support - [Article Name]"
- "CurseForge Discord"
- "CurseForge Support"
- Links to support.curseforge.com

#### After:
- "Source: Community Documentation"
- "Community Discord"
- "Community Documentation"
- Links to hytale.com or generic references

### Compatibility
-  All files remain 100% GitBook compatible
-  Markdown syntax unchanged
-  Links and navigation still functional
-  Code examples and tutorials unchanged
-  Structure and organization preserved

---

## Version 1.0 - January 9, 2026

### Initial Release
-  Created 10 comprehensive tutorial files
-  Added README.md with full table of contents
-  Created SUMMARY.md for GitBook navigation
-  Added .gitbook.yaml for GitBook Cloud
-  Added book.json for GitBook CLI
-  Created GITBOOK_README.md with setup instructions
-  Made all files GitBook-compatible

### Content
- Hytale Modding Overview
- Getting Started with Packs
- Adding a Block
- Block State Changing
- Item Categories
- Block Animations
- Getting Started with Plugins
- Custom Config Files
- Bootstrap/Early Plugins
- Useful Tools & Links

---

*Documentation maintained by the Hytale modding community*
