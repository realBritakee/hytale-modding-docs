# Block State Changing

**Source:** [Block State Changing](https://hytale.com/)  
**Last Modified:** Friday, January 9, 2026 at 12:01 PM

---

## Overview

This is a basic beginner's guide on how to modify block state changes and cycling. Block states allow you to create blocks that can change appearance, behavior, or properties when interacted with, similar to doors, lights, or buttons in the game.

---

## What are Block States?

Block states allow a single block to have multiple configurations or modes:
- **Lamps** that can be on or off
- **Doors** that can be open or closed
- **Machines** that can be active or inactive
- **Any block** with multiple visual or functional states

---

## Step 1: Select Your Block

First, locate your block definition file:

**Path:** `Packs/YourPackName/Server/Item/Items/your_block.json`

---

## Step 2: Create an Interaction

Define an interaction that will trigger the state change. This tells the game what should happen when the player interacts with the block.

### Interaction Structure:

```json
"Interactions": {
  "Use": {
    "Interactions": [
      {
        "Type": "ChangeState",
        "Changes": {
          "default": "Off",
          "On": "Off",
          "Off": "On"
        }
      }
    ]
  }
}
```

### Interaction Properties Explained:

| Property | Description |
|----------|-------------|
| `"Use"` | The interaction type (player right-clicks/uses the block) |
| `"Type": "ChangeState"` | Tells the game to change the block's state |
| `"Changes"` | Maps current state –†’ next state |

### State Cycling Logic:

```json
"Changes": {
  "default": "Off",  // Initial state when placed
  "On": "Off",       // When "On", change to "Off"
  "Off": "On"        // When "Off", change to "On"
}
```

This creates a toggle behavior: On –†’ Off –†’ On –†’ Off...

---

## Step 3: Define States

Now define what each state looks like and behaves like:

### State Definition Structure:

```json
"State": {
  "Definitions": {
    "On": {
      "InteractionHint": "interactionHints.turnoff",
      "CustomModel": "Blocks/model_one.blockymodel",
      "CustomModelTexture": [
        {
          "Texture": "Blocks/Texture/textureone.png"
        }
      ]
    },
    "Off": {
      "InteractionHint": "interactionHints.turnon",
      "CustomModel": "Blocks/model_two.blockymodel",
      "CustomModelTexture": [
        {
          "Texture": "Blocks/Texture/textureone.png"
        }
      ]
    }
  }
}
```

### State Properties:

| Property | Description | Example |
|----------|-------------|---------|
| `InteractionHint` | Tooltip shown when hovering | `"interactionHints.turnoff"` |
| `CustomModel` | Model file for this state | `"Blocks/model_one.blockymodel"` |
| `CustomModelTexture` | Texture(s) for this state | Array of texture objects |

---

## Complete Example Block

Here's a full example of a block with state changing:

```json
{
  "TranslationProperties": {
    "Name": "server.Toggle_Block.name"
  },
  "MaxStack": 100,
  "Icon": "Icons/ItemsGenerated/Toggle_Block.png",
  "Categories": [
    "Blocks.Decoration"
  ],
  "BlockType": {
    "DrawType": "Model",
    "CustomModel": "Blocks/model_one.blockymodel",
    "CustomModelTexture": [
      {
        "Texture": "Blocks/your_texture.png"
      }
    ],
    
    "Interactions": {
      "Use": {
        "Interactions": [
          {
            "Type": "ChangeState",
            "Changes": {
              "default": "Off",
              "On": "Off",
              "Off": "On"
            }
          }
        ]
      }
    },
    
    "State": {
      "Definitions": {
        "On": {
          "InteractionHint": "interactionHints.turnoff",
          "CustomModel": "Blocks/model_one.blockymodel",
          "CustomModelTexture": [
            {
              "Texture": "Blocks/Texture/textureone.png"
            }
          ]
        },
        "Off": {
          "InteractionHint": "interactionHints.turnon",
          "CustomModel": "Blocks/model_two.blockymodel",
          "CustomModelTexture": [
            {
              "Texture": "Blocks/Texture/textureone.png"
            }
          ]
        }
      }
    }
  }
}
```

---

## Advanced State Features

You can add additional properties to each state:

### Sounds

```json
"On": {
  "InteractionHint": "interactionHints.turnoff",
  "CustomModel": "Blocks/model_one.blockymodel",
  "BlockSoundSetId": "Metal_On"
}
```

### Animations

```json
"On": {
  "InteractionHint": "interactionHints.turnoff",
  "CustomModel": "Blocks/model_one.blockymodel",
  "CustomModelAnimation": "Blocks/Animations/Light_On.blockyanim"
}
```

### Particles

```json
"On": {
  "InteractionHint": "interactionHints.turnoff",
  "CustomModel": "Blocks/model_one.blockymodel",
  "ParticleColor": "#ffff00"
}
```

---

## Multiple States (Beyond On/Off)

You can have more than two states:

```json
"Interactions": {
  "Use": {
    "Interactions": [
      {
        "Type": "ChangeState",
        "Changes": {
          "default": "State1",
          "State1": "State2",
          "State2": "State3",
          "State3": "State1"
        }
      }
    ]
  }
}
```

Then define all three states:

```json
"State": {
  "Definitions": {
    "State1": { /* ... */ },
    "State2": { /* ... */ },
    "State3": { /* ... */ }
  }
}
```

---

## Interaction Hints Translation

Remember to add translations for your interaction hints:

**Path:** `YourPackName/Server/Languages/en-US/interactionHints.lang`

```
turnon = Turn On
turnoff = Turn Off
```

---

## Required Files

For a state-changing block with custom models, you need:

```
YourPackName/
|-- Common/
|   `-- Blocks/
|       |-- model_one.blockymodel
|       |-- model_two.blockymodel
|       `-- Texture/
|           `-- textureone.png
`-- Server/
    |-- Item/
    |   `-- Items/
    |       `-- your_block.json
    `-- Languages/
        `-- en-US/
            `-- interactionHints.lang
```

---

## Testing Your State-Changing Block

1. Enable your Pack in a world
2. Place the block
3. Observe its initial state (default)
4. Right-click/use the block
5. Verify it changes to the next state
6. Check that the model/texture updates
7. Verify the interaction hint displays correctly

---

## Troubleshooting

### States don't change:
- Verify `"Type": "ChangeState"` is set correctly
- Check that state names match in `Changes` and `Definitions`
- Ensure interaction type is correct (`"Use"`)

### Wrong initial state:
- Check `"default"` value in `Changes`
- Verify the default state is defined in `Definitions`

### Models/textures don't update:
- Verify model paths are correct for each state
- Check that texture paths exist
- Ensure models are properly formatted `.blockymodel` files

### Interaction hints don't show:
- Verify translation keys exist in `interactionHints.lang`
- Check that language file is in correct location
- Ensure no typos in translation keys

---

## Credits

Thank you to **Sketch Macaw** for helping to write this article!

---


