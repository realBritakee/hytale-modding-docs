# Getting Started with Packs

**Source:** [Getting Started with Packs](https://hytale.com/)  
**Last Modified:** Friday, January 9, 2026 at 12:01 PM

---

## Overview

This guide walks you through creating your first Hytale Pack. Packs are asset/content packs that allow you to add new blocks, items, mobs, and behavior to Hytale without requiring coding knowledge.

---

## Step 1: Creating a Folder

First, create a folder for your Pack:

**Path:** `./AppData/Roaming/Hytale/UserData/Mods/YourPackName`

Replace `YourPackName` with the desired name of your Pack.

### Example:
```bash
C:\Users\YourUsername\AppData\Roaming\Hytale\UserData\Mods\MyFirstPack
```

## Alternate - using the asset editor

1. launch the game and create a new **Creative World**
2. Give yourself "OP", type in chat **/op self**
3. Open your **Inventory** go to **Creative Tools** -> **Assets** -> **Asset Editor**
4. Inside the **Asset Editor** click in the top left on the three little dots -> Add Pack
5. Fill in your desired information.
6. Proceed with Step 3

> **Note:** See our [Youtube Tutorials](00-youtube-tutorials.md) if you want to learn more about the Asset Editor!

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

| Field | Description | Required |
|-------|-------------|----------|
| `Group` | Your organization or group name | Yes |
| `Name` | The name of your Pack | Yes |
| `Version` | Version number (semantic versioning) | Yes |
| `Description` | A brief description of what your Pack does | Yes |
| `Authors` | Array of author information | Yes |
| `Website` | Your website or project page | Optional |
| `ServerVersion` | Compatible server version (`*` for all) | Yes |
| `Dependencies` | Packs required for this to work | Optional |
| `OptionalDependencies` | Packs that enhance but aren't required | Optional |
| `DisabledByDefault` | Whether Pack loads automatically | Optional |

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

> **Note:** I can't list every folder, as it would make the page too long!

1. Open your Hytale launcher
2. Top left on settings
3. Click on Open Directory
4. open the folders "install\release\package\game\latest" and see inside the Assets.zip which folders are available.
---

## Next Steps

Now that you have the basic Pack structure set up, you can:

1. **Add a Block** - Follow the "Adding a Block" tutorial
2. **Create Item Categories** - Follow the "Item Categories" tutorial
3. **Learn about Block Hitboxes** - Follow the "Block Hitboxes" tutorial
4. **Use the Asset Editor** - Modify your Pack settings in-game

---

## Activating Your Pack

To use your Pack in Hytale:

1. Open Hytale
2. Go to the "Worlds" tab
3. Right-click on the world you wish to add the Pack to
4. Toggle on your Pack from the list
5. Enter the world to see your changes

---


