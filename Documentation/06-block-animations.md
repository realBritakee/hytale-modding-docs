# Block Animations

**Source:** [Block Animations](https://hytale.com/)  
**Last Modified:** Friday, January 9, 2026 at 12:01 PM

---

## Overview

This guide explains how to add animations to blocks in Hytale. Animations can make your blocks come alive with moving parts, opening mechanisms, or any other dynamic movement.

---

## Prerequisites

- Basic understanding of block states (see "Block State Changing" guide)
- Blockbench installed ([https://www.blockbench.net/](https://www.blockbench.net/))
- A block model with named groups

---

## What Can Be Animated?

Block animations can modify:
- **Position** - Move elements in X, Y, Z coordinates
- **Orientation** - Rotate elements
- **ShapeStretch** - Stretch or scale elements
- **ShapeVisible** - Show or hide elements
- **ShapeUvOffset** - Animate textures (advanced)

---

## Step 1: Add Animation to Block State

First, reference your animation file in the block's state definition:

```json
"State": {
  "Definitions": {
    "On": {
      "CustomModelAnimation": "Blocks/Animations/Rising_Water.blockyanim"
    },
    "Off": {
      "CustomModelAnimation": "Blocks/Animations/Empty_Water.blockyanim"
    }
  }
}
```

---

## Step 2: Create Groups in Blockbench

Open your block model in Blockbench:

1. **Create a Group:**
   - In Blockbench, create a new group
   - Give it a descriptive name (e.g., "Water", "Door", "Drawer")
   - This group name will be referenced in your animation file

2. **Add Elements:**
   - Place the elements you want to animate inside the group
   - You can have multiple elements in one group
   - All elements in the group will animate together

3. **Export:**
   - Export as `.blockymodel` format for Hytale

---

## Step 3: Create Animation File

Create a `.blockyanim` file in your Pack's animation folder:

**Path:** `YourPackName/Common/Blocks/Animations/Rising_Water.blockyanim`

### Basic Animation Structure:

```json
{
  "formatVersion": 1,
  "duration": 50,
  "holdLastKeyframe": true,
  "nodeAnimations": {
    "Water": {
      "position": [ /* keyframes */ ],
      "orientation": [ /* keyframes */ ],
      "shapeStretch": [ /* keyframes */ ],
      "shapeVisible": [ /* keyframes */ ],
      "shapeUvOffset": [ /* keyframes */ ]
    }
  }
}
```

### Animation Properties:

| Property | Description | Example |
|----------|-------------|---------|
| `formatVersion` | Animation format version | `1` |
| `duration` | Animation length in ticks | `50` (2.5 seconds) |
| `holdLastKeyframe` | Whether to hold at final position | `true` or `false` |
| `nodeAnimations` | Object containing group animations | See below |

---

## Animation Types

### Position Animation

Moves elements in 3D space:

```json
"position": [
  {
    "time": 0,
    "delta": {
      "x": 0,
      "y": 0,
      "z": 0
    },
    "interpolationType": "smooth"
  },
  {
    "time": 50,
    "delta": {
      "x": 0,
      "y": 8.5,
      "z": 0
    },
    "interpolationType": "smooth"
  }
]
```

**This example:** Moves the element 8.5 units up on the Y-axis over 50 ticks.

### Orientation Animation (Rotation)

Rotates elements using quaternions:

```json
"orientation": [
  {
    "time": 0,
    "delta": {
      "x": 0,
      "y": 0,
      "z": 0,
      "w": 1
    },
    "interpolationType": "smooth"
  },
  {
    "time": 15,
    "delta": {
      "x": 0,
      "y": 0.866025,
      "z": 0,
      "w": 0.5
    },
    "interpolationType": "smooth"
  }
]
```

**Note:** Quaternions are complex. Common rotation values:
- **No rotation:** `{x:0, y:0, z:0, w:1}`
- **90Â° Y-axis:** `{x:0, y:0.707, z:0, w:0.707}`
- **180Â° Y-axis:** `{x:0, y:1, z:0, w:0}`

---

## Example 1: Rising Water Animation

This animation makes water rise from 0 to 8.5 units upward:

**File:** `Rising_Water.blockyanim`

```json
{
  "formatVersion": 1,
  "duration": 50,
  "holdLastKeyframe": true,
  "nodeAnimations": {
    "Water": {
      "position": [
        {
          "time": 0,
          "delta": {
            "x": 0,
            "y": 0,
            "z": 0
          },
          "interpolationType": "smooth"
        },
        {
          "time": 50,
          "delta": {
            "x": 0,
            "y": 8.5,
            "z": 0
          },
          "interpolationType": "smooth"
        }
      ],
      "orientation": [],
      "shapeStretch": [],
      "shapeVisible": [],
      "shapeUvOffset": []
    }
  }
}
```

---

## Example 2: Wardrobe Opening Animation

A complex example with multiple animated groups (doors, knockers, drawer):

**File:** `Wardrobe_Open.blockyanim`

```json
{
  "formatVersion": 1,
  "duration": 50,
  "holdLastKeyframe": true,
  "nodeAnimations": {
    "Door-L": {
      "position": [],
      "orientation": [
        {
          "time": 0,
          "delta": {"x": 0, "y": 0, "z": 0, "w": 1},
          "interpolationType": "smooth"
        },
        {
          "time": 15,
          "delta": {"x": 0, "y": 0.866025, "z": 0, "w": 0.5},
          "interpolationType": "smooth"
        },
        {
          "time": 25,
          "delta": {"x": 0, "y": 0.793353, "z": 0, "w": 0.608761},
          "interpolationType": "smooth"
        }
      ],
      "shapeStretch": [],
      "shapeVisible": [],
      "shapeUvOffset": []
    },
    "Door-R": {
      "position": [],
      "orientation": [
        {
          "time": 0,
          "delta": {"x": 0, "y": 0, "z": 0, "w": 1},
          "interpolationType": "smooth"
        },
        {
          "time": 20,
          "delta": {"x": 0, "y": -0.866025, "z": 0, "w": 0.5},
          "interpolationType": "smooth"
        },
        {
          "time": 30,
          "delta": {"x": 0, "y": -0.793353, "z": 0, "w": 0.608761},
          "interpolationType": "smooth"
        }
      ],
      "shapeStretch": [],
      "shapeVisible": [],
      "shapeUvOffset": []
    },
    "Drawer": {
      "position": [
        {
          "time": 0,
          "delta": {"x": 0, "y": 0, "z": 0},
          "interpolationType": "smooth"
        },
        {
          "time": 10,
          "delta": {"x": 0, "y": 0, "z": 12},
          "interpolationType": "smooth"
        },
        {
          "time": 20,
          "delta": {"x": 0, "y": 0, "z": 10},
          "interpolationType": "smooth"
        }
      ],
      "orientation": [],
      "shapeStretch": [],
      "shapeVisible": [],
      "shapeUvOffset": []
    },
    "Door-Knocker": {
      "position": [],
      "orientation": [
        {
          "time": 0,
          "delta": {"x": 0, "y": 0, "z": 0, "w": 1},
          "interpolationType": "smooth"
        },
        {
          "time": 17,
          "delta": {"x": -0.5, "y": 0, "z": 0, "w": 0.866025},
          "interpolationType": "smooth"
        },
        {
          "time": 24,
          "delta": {"x": 0, "y": 0, "z": 0, "w": 1},
          "interpolationType": "smooth"
        },
        {
          "time": 32,
          "delta": {"x": -0.130526, "y": 0, "z": 0, "w": 0.991445},
          "interpolationType": "smooth"
        },
        {
          "time": 40,
          "delta": {"x": 0, "y": 0, "z": 0, "w": 1},
          "interpolationType": "smooth"
        }
      ],
      "shapeStretch": [],
      "shapeVisible": [],
      "shapeUvOffset": []
    }
  }
}
```

### Breakdown of Wardrobe Animation:

- **Door-L:** Left door swings open (rotates on Y-axis)
- **Door-R:** Right door swings open (opposite direction)
- **Drawer:** Pulls out (moves on Z-axis)
- **Door-Knocker:** Bounces back and forth (multiple rotation keyframes)

---

## Keyframe Properties

Each keyframe contains:

| Property | Description |
|----------|-------------|
| `time` | When this keyframe occurs (in ticks) |
| `delta` | The transformation values |
| `interpolationType` | How to transition (`"smooth"`, `"linear"`, `"step"`) |

### Interpolation Types:

- **smooth:** Gradual acceleration/deceleration (natural)
- **linear:** Constant speed (mechanical)
- **step:** Instant change (no interpolation)

---

## Complete File Structure

```
YourPackName/
|-- Common/
|   `-- Blocks/
|       |-- Animations/
|       |   |-- Rising_Water.blockyanim
|       |   |-- Empty_Water.blockyanim
|       |   `-- Wardrobe_Open.blockyanim
|       |-- your_model.blockymodel
|       `-- Texture/
|           `-- your_texture.png
`-- Server/
    `-- Item/
        `-- Items/
            `-- your_block.json
```

---

## Tips for Creating Animations

1. **Start Simple:** Begin with single-axis position animations
2. **Use Vanilla as Reference:** Look at wardrobe, door, and chest animations
3. **Plan Timing:** Map out when each group should start/stop moving
4. **Test Iteratively:** Test in-game frequently, adjust values
5. **Empty Arrays:** Use `[]` for animation types you don't need

---

## Testing Your Animations

1. Enable your Pack in a world
2. Place the animated block
3. Trigger the state change (e.g., right-click)
4. Observe the animation
5. Adjust timing and delta values as needed
6. Reload the Pack to see changes

---

## Troubleshooting

### Animation doesn't play:
- Verify animation file path in block JSON
- Check that group names match exactly (case-sensitive)
- Ensure `.blockyanim` extension is correct

### Animation is choppy:
- Increase duration for smoother movement
- Use "smooth" interpolation instead of "linear"
- Add more intermediate keyframes

### Wrong elements animate:
- Check group names in Blockbench
- Verify correct elements are in the group
- Ensure animation references the right group name

### Animation plays backwards:
- Check time values increase correctly
- Verify keyframes are in chronological order

---

## Advanced: Studying Vanilla Animations

To learn more, examine vanilla Hytale animations:

**Path:** `Assets/Common/Blocks/Animations/`

Look at:
- Door animations
- Chest animations
- Wardrobe animations
- Machine animations

---

## Getting Help

**Official Channels:**
- **Discord:** [Official Hytale Discord](https://discord.gg/hytale)
- **Blog:** [Hytale News](https://hytale.com/news)


