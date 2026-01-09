# Item Categories

**Source:** [Item Categories](https://hytale.com/)  
**Last Modified:** Friday, January 9, 2026 at 12:01 PM

---

## Overview

Item Categories are the different tabs shown in the Creative Menu. This guide provides a basic introduction to creating your own categories and subcategories for organizing your custom items and blocks.

---

## What are Item Categories?

Item Categories allow you to:
- Create custom tabs in the Creative Menu
- Organize items and blocks logically
- Add subcategories for better organization
- Customize icons for each category

---

## Step 1: Creating the Category File

Create a JSON file for your custom category:

**Path:** `AppData/Roaming/Hytale/UserData/Packs/YourPackName/Server/Item/Category/CreativeLibrary/MyItemCategory.json`

### Category Template:

```json
{
  "Id": "MyCategory",
  "Name": "ui.itemcategory.mycategory",
  "Icon": "Icons/ItemCategories/MyCategory.png",
  "Order": 6,
  "Children": [
    {
      "Id": "Example_Category",
      "Name": "ui.itemcategory.example_category",
      "Icon": "Icons/ItemCategories/My_Example_Category.png"
    },
    {
      "Id": "Example_Category_Two",
      "Name": "ui.itemcategory.example_category_two",
      "Icon": "Icons/ItemCategories/My_Example_Category_Two.png"
    }
  ]
}
```

---

## Category Properties Explained

### Main Category Properties

| Property | Description | Example |
|----------|-------------|---------|
| `Id` | Unique identifier for the category | `"MyCategory"` |
| `Name` | Translation key for tooltip text | `"ui.itemcategory.mycategory"` |
| `Icon` | Path to the category icon | `"Icons/ItemCategories/MyCategory.png"` |
| `Order` | Position in Creative Menu (lower = left) | `6` |
| `Children` | Array of subcategories | See template above |

### Subcategory Properties (Children)

Each child/subcategory has:
- `Id` - Unique identifier for the subcategory
- `Name` - Translation key for the subcategory tooltip
- `Icon` - Path to the subcategory icon

---

## Step 2: Adding Translations

Define the display names for your categories by creating translation files:

**Path:** `YourPackName/Server/Languages/en-US/ui.lang`

### Translation Format:

```
itemcategory.mycategory = My Custom Category
itemcategory.example_category = Example Tab One
itemcategory.example_category_two = Example Tab Two
```

### Key Points:
- Translation keys in JSON start with `"ui."` but the `.lang` file omits this prefix
- The text after `=` is what displays when hovering over the category icon
- Create files for other languages (e.g., `es-ES/ui.lang`) for internationalization

---

## Step 3: Adding Icons

Create icon images for your categories:

**Main Category Icon Path:**  
`YourPackName/Common/Icons/ItemCategories/MyCategory.png`

**Subcategory Icon Paths:**  
`YourPackName/Common/Icons/ItemCategories/My_Example_Category.png`  
`YourPackName/Common/Icons/ItemCategories/My_Example_Category_Two.png`

### Icon Requirements:
- **Format:** PNG with transparency support
- **Recommended Size:** 32x32 pixels
- **Style:** Should match Hytale's UI aesthetic
- **Naming:** Must match exactly the path in your JSON file

---

## Step 4: Adding Blocks/Items to Categories

To add your custom blocks or items to your new categories, edit the item/block JSON file:

**Path:** `YourPackName/Server/Item/Items/your_block.json`

### Add Category Reference:

```json
{
  "TranslationProperties": {
    "Name": "server.Your_Block.name"
  },
  "Categories": [
    "MyCategory.Example_Category"
  ],
  // ... rest of block properties
}
```

### Category Path Format:
- **Main Category Only:** `"MyCategory"`
- **Subcategory:** `"MyCategory.Example_Category"`
- **Multiple Categories:** Add multiple strings to the array

### Example - Multiple Categories:

```json
"Categories": [
  "MyCategory.Example_Category",
  "Blocks.Rocks",
  "MyCategory.Example_Category_Two"
]
```

---

## Finding Vanilla Category Names

To use Vanilla categories in your items, look in the game's asset files:

**Path:** `Assets/Server/Item/Category/CreativeLibrary`

### Common Vanilla Categories:
- `Blocks.Rocks`
- `Blocks.Wood`
- `Blocks.Nature`
- `Items.Tools`
- `Items.Weapons`
- `Items.Food`

---

## Complete Folder Structure Example

```
YourPackName/
|-- manifest.json
|-- Common/
|   `-- Icons/
|       `-- ItemCategories/
|           |-- MyCategory.png
|           |-- My_Example_Category.png
|           `-- My_Example_Category_Two.png
`-- Server/
    |-- Item/
    |   |-- Category/
    |   |   `-- CreativeLibrary/
    |   |       `-- MyItemCategory.json
    |   `-- Items/
    |       `-- your_block.json
    `-- Languages/
        `-- en-US/
            `-- ui.lang
```

---

## Advanced: Category Order

The `Order` property determines the position of your category in the Creative Menu:

- **Lower numbers** = Further left
- **Higher numbers** = Further right
- **Vanilla categories** typically use orders 0-5
- **Custom categories** should use 6+

### Example Order:
```json
"Order": 6,  // Appears after vanilla categories
```

---

## Testing Your Categories

1. Enable your Pack in a world
2. Enter the world
3. Open your inventory in Creative Mode
4. Look for your custom category icon(s) in the Creative Menu
5. Click the icon to see your subcategories
6. Verify items appear in the correct subcategories

---

## Troubleshooting

### Category doesn't appear:
- Verify JSON syntax is valid
- Check that icon paths are correct
- Ensure translation file exists
- Verify Pack is enabled in world

### Icon is missing:
- Check icon file exists at specified path
- Verify PNG format
- Ensure path in JSON matches file location exactly

### Items don't appear in category:
- Verify category ID matches in both files
- Check subcategory path format: `"MainCategory.SubCategory"`
- Ensure item JSON includes `Categories` array

### Tooltip shows translation key:
- Check `ui.lang` file exists
- Verify translation key matches (without `ui.` prefix)
- Ensure no typos in the key

---

## Credits

Thank you to **Sketch Macaw** for helping to create this tutorial.

---


