# Adding a Block

**Source:** [Adding a Block](https://hytale.com/)  
**Last Modified:** Friday, January 9, 2026 at 12:01 PM

---

## Overview

This guide teaches you how to add a custom block to Hytale using Packs. You'll learn how to create the block definition, add textures, and modify properties using the Asset Editor.

---

## Prerequisites

Before starting, ensure you have:
- Created a Pack folder structure (see "Getting Started with Packs")
- A `manifest.json` file in your Pack root
- `Common/` and `Server/` folders created

---

## Step 1: Creating the Block Manifest File

Create a JSON file for your block in the Items directory:

**Path:** `./AppData/Roaming/Hytale/UserData/Packs/YourPackName/Server/Item/Items/your_block.json`

### Block Manifest Template:

```json
{
  "TranslationProperties": {
    "Name": "server.Example_Block.name"
  },
  "MaxStack": 100,
  "Icon": "Icons/ItemsGenerated/Example_Block.png",
  "Categories": [
    "Blocks.Rocks"
  ],
  "PlayerAnimationsId": "Block",
  "Set": "Rock_Stone",
  "BlockType": {
    "Material": "Solid",
    "DrawType": "Cube",
    "Group": "Stone",
    "Flags": {},
    "Gathering": {
      "Breaking": {
        "GatherType": "Rocks",
        "ItemId": "Rock_Stone_Cobble"
      }
    },
    "BlockParticleSetId": "Stone",
    "Textures": [
      {
        "All": "BlockTextures/Example_Block.png"
      }
    ],
    "ParticleColor": "#aeae8c",
    "BlockSoundSetId": "Stone",
    "BlockBreakingDecalId": "Breaking_Decals_Rock"
  },
  "ResourceTypes": [
    {
      "Id": "Rock"
    }
  ]
}
```

---

## Block Properties Explained

### Top-Level Properties

| Property | Description | Example |
|----------|-------------|---------|
| `TranslationProperties.Name` | Translation key for block name | `"server.Example_Block.name"` |
| `MaxStack` | Maximum stack size in inventory | `100` |
| `Icon` | Path to inventory icon | `"Icons/ItemsGenerated/Example_Block.png"` |
| `Categories` | Creative menu categories | `["Blocks.Rocks"]` |
| `PlayerAnimationsId` | Animation set when placing | `"Block"` |
| `Set` | Block set identifier | `"Rock_Stone"` |

### BlockType Properties

| Property | Description | Options/Example |
|----------|-------------|-----------------|
| `Material` | Block material type | `"Solid"`, `"Liquid"`, `"Gas"` |
| `DrawType` | Rendering method | `"Cube"`, `"Cross"`, `"Model"` |
| `Group` | Block group for behavior | `"Stone"`, `"Wood"`, `"Dirt"` |
| `Flags` | Special block flags | `{}` (varies by block type) |
| `ParticleColor` | Color of break particles | `"#aeae8c"` (hex color) |
| `BlockSoundSetId` | Sound set for interactions | `"Stone"`, `"Wood"`, `"Grass"` |
| `BlockBreakingDecalId` | Breaking animation overlay | `"Breaking_Decals_Rock"` |

### Gathering Properties

```json
"Gathering": {
  "Breaking": {
    "GatherType": "Rocks",    // Tool type required
    "ItemId": "Rock_Stone_Cobble"  // Item dropped when broken
  }
}
```

### Texture Properties

```json
"Textures": [
  {
    "All": "BlockTextures/Example_Block.png"  // Same texture all sides
  }
]
```

**Alternative - Different Textures Per Side:**
```json
"Textures": [
  {
    "Top": "BlockTextures/Example_Block_Top.png",
    "Bottom": "BlockTextures/Example_Block_Bottom.png",
    "Sides": "BlockTextures/Example_Block_Sides.png"
  }
]
```

---

## Step 2: Creating Texture Files

Create texture files in the Common folder:

**Texture Path:** `./AppData/Roaming/Hytale/UserData/Packs/YourPackName/Common/BlockTextures/your_block_texture.png`

### Texture Requirements:
- **Format:** PNG
- **Recommended Size:** 16x16 or 32x32 pixels
- **Transparency:** Supported (for non-solid blocks)
- **Naming:** Match the path in your block JSON

### Icon Path:
Also create an icon for the inventory:

**Icon Path:** `./AppData/Roaming/Hytale/UserData/Packs/YourPackName/Common/Icons/ItemsGenerated/Example_Block.png`

---

## Step 3: Creating Translation File

Create a translation file to define the block's display name:

**Path:** `./AppData/Roaming/Hytale/UserData/Packs/YourPackName/Server/Languages/en-US/server.lang`

### Translation Format:

```
Example_Block.name = Example Block
```

The key (`Example_Block.name`) must match the `TranslationProperties.Name` in your block JSON (without the `"server."` prefix).

### Multiple Languages:

Create additional `.lang` files for other languages:
- `es-ES/server.lang` - Spanish
- `fr-FR/server.lang` - French
- `de-DE/server.lang` - German
- etc.

---

## Step 4: Modify in Asset Editor

Now you can visually edit your block using the in-game Asset Editor:

### Steps to Access Asset Editor:

1. **Add Pack to World:**
   - Open Hytale
   - Visit the "Worlds" tab
   - Right-click on your world
   - Toggle on your Pack

![Adding Pack to World](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/9242438698/original/W1aHFifMfGPRtqp7DTqLiudGZ7IvyRWPkA.png?1767794986)

2. **Enter the World:**
   - Join the world with your Pack enabled

3. **Open Asset Editor:**
   - Open your inventory
   - Click on the "Creation Tools" tab
   - Click on "Asset Editor"

![Asset Editor Interface](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/9242488837/original/YyJgcUx4zPCJxESiFE5CuhoJljgSverQ8w.png?1767864858)

4. **Edit Your Block:**
   - Select your Pack from the list
   - Find your block in the items list
   - Modify any settings you desire
   - Changes are saved automatically

![Asset Editor Block Settings](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/9242488840/original/tPkYp5a_xw0dNDhWjiue43_Q9y9iD72XJw.png?1767864858)

### What You Can Edit in Asset Editor:
- Material properties
- Breaking behavior
- Sounds
- Particle effects
- Textures (paths)
- Drop items
- Stack size
- Categories
- And much more!

---

## Complete Folder Structure Example

```
YourPackName/
–”œ–”€–”€ manifest.json
–”œ–”€–”€ Common/
–”‚   –”œ–”€–”€ BlockTextures/
–”‚   –”‚   –””–”€–”€ Example_Block.png
–”‚   –””–”€–”€ Icons/
–”‚       –””–”€–”€ ItemsGenerated/
–”‚           –””–”€–”€ Example_Block.png
–””–”€–”€ Server/
    –”œ–”€–”€ Item/
    –”‚   –””–”€–”€ Items/
    –”‚       –””–”€–”€ your_block.json
    –””–”€–”€ Languages/
        –””–”€–”€ en-US/
            –””–”€–”€ server.lang
```

---

## Testing Your Block

1. Launch Hytale with your Pack enabled
2. Open Creative Mode
3. Open your inventory
4. Find your block in the category you specified
5. Place it in the world
6. Test breaking it to verify drops and sounds

---

## Troubleshooting

### Block doesn't appear in game:
- Verify `manifest.json` is correct
- Check that Pack is enabled in world settings
- Ensure JSON syntax is valid (use a JSON validator)

### Texture is missing/pink:
- Verify texture path matches JSON exactly
- Check texture file exists at specified path
- Ensure texture is PNG format

### Translation shows key instead of name:
- Verify translation key matches in JSON and `.lang` file
- Check that `en-US` folder and `server.lang` file exist
- Ensure no typos in translation key

---

## Credits

Thank you to **Sketch Macaw** for their help creating this tutorial.

---


