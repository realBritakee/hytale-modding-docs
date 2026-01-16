# Getting Started with Packs

**Source:** [Getting Started with Packs](https://hytale.com/)  
**Last Modified:** Friday, January 16, 2026 at 12:47 PM

---

## Overview

This guide walks you through creating your first Hytale Pack. Packs are asset/content packs that allow you to add new blocks, items, mobs, and behavior to Hytale without requiring coding knowledge.[web:3]

---

## Step 1: Creating a Folder

First, create a folder for your Pack:

**Path:** `./AppData/Roaming/Hytale/UserData/Mods/YourPackName`

Replace `YourPackName` with the desired name of your Pack.

### Example:
```bash
C:\Users\YourUsername\AppData\Roaming\Hytale\UserData\Mods\MyFirstPack
```

## Asset Editor (Alternative)

Use the in-game Asset Editor for a quicker start:

1. Launch Hytale and create a new **Creative World**.
2. Grant yourself OP status by typing `/op self` in chat.
3. Open your **Inventory**, then navigate to **Creative Tools** > **Assets** > **Asset Editor**.
4. In the Asset Editor, click the three dots in the top left and select **Add Pack**.
5. Enter your pack details.
6. Proceed to Step 3.

> **Note:** Check our [YouTube Tutorials](00-youtube-tutorials.md) for more on the Asset Editor.

---

## Step 2: Manifest File

Create a `manifest.json` file in your Pack folder. This file contains metadata about your Pack.

### Manifest Template:

```json
{
  "Group": "YourGroupName",
  "Name": "PackName",
  "Version": "1.0.0",
  "Description": "Add the pack description here",
  "Authors": [
    {
      "Name": "AuthorName",
      "Email": "example@example.com",
      "Url": "https://your-url.com"
    }
  ],
  "Website": "https://your-website.com",
  "ServerVersion": "*",
  "Dependencies": {},
  "OptionalDependencies": {},
  "DisabledByDefault": false
}
```

### Manifest Fields Explained:

| Field                  | Description                                      | Required |
|------------------------|--------------------------------------------------|----------|
| `Group`                | Your organization or group name                  | Yes      |
| `Name`                 | The name of your Pack                            | Yes      |
| `Version`              | Version number (semantic versioning)             | Yes      |
| `Description`          | A brief description of what your Pack does       | Yes      |
| `Authors`              | Array of author information                      | Yes      |
| `Website`              | Your website or project page                     | Optional |
| `ServerVersion`        | Compatible server version (`*` for all)          | Yes      |
| `Dependencies`         | Packs required for this to work                  | Optional |
| `OptionalDependencies` | Packs that enhance but aren't required           | Optional |
| `DisabledByDefault`    | Whether Pack loads automatically                 | Optional |

---

## Step 3: Common and Server Folders

Create two main folders inside your Pack directory:

### Folder Structure:
```bash
./AppData/Roaming/Hytale/UserData/Packs/YourPackName/
|-- manifest.json
|-- Common/
`-- Server/
```

### Common Folder
**Path:** `./AppData/Roaming/Hytale/UserData/Packs/YourPackName/Common`

**Handles:**
- Models
- Textures
- Visual assets

### Server Folder
**Path:** `./AppData/Roaming/Hytale/UserData/Packs/YourPackName/Server`

**Handles:**
- Item creation
- Block creation
- Translations
- Particle creation
- Game logic and behavior

---

## Complete Folder Structure Example

```bash
MyFirstPack/
|-- manifest.json
|-- Common/
|   |-- BlockTextures/
|   |-- Icons/
|   `-- Models/
`-- Server/
    |-- Item/
    |   |-- Items/
    |   `-- Category/
    |-- Languages/
    |   `-- en-US/
    `-- Block/
```

> **Note:** This shows key folders; full structures vary. For a complete overview:
>
> 1. Open the Hytale launcher.
> 2. Click **Settings** (top left).
> 3. Select **Open Directory**.
> 4. Navigate to `install\release\package\game\latest` and explore `Assets.zip`.

---

## Activating Your Pack

To use your Pack in Hytale:

1. Open Hytale.
2. Go to the **Worlds** tab.
3. Right-click the target world.
4. Toggle on your Pack.
5. Enter the world to test changes.

---

## Getting Help

**Official Channels:**
- **Discord:** [Official Hytale Discord](https://discord.gg/hytale)
- **Blog:** [Hytale News](https://hytale.com/news)