# Blockbench Modeling Guide for Hytale

**Source:** [An Introduction to Making Models for Hytale](https://hytale.com/news/2025/12/an-introduction-to-making-models-for-hytale)  
**Last Modified:** Friday, January 10, 2026

---

## Introduction

This guide covers the official Hytale art style and best practices for creating models using Blockbench. Written by Thomas Frick (Art Director), this represents a decade of art direction for Hytale.

> **Note:** *"These are best practices; you don't have to follow them strictly. You are the masters of your own craft, and there is no good or bad way to create as long as you are having fun."*

---

## Hytale Art Style

### Definition

**"A modern, stylized voxel game, with retro pixel-art textures"**

Hytale's art style combines:
- Modern game engine capabilities
- Charm of old-school pixel art
- Intersection of low-definition pixel art and hand-painted 3D

---

## The Four Art Pillars

Every piece of content in Hytale is evaluated against these core pillars:

### 1. Immersive
- World feels alive, digital nature vanishes
- Motion and detail everywhere
- Wind blows in leaves, creatures wander, clouds travel
- World reacts to the player
- Creatures interact, eyes express emotion
- Lasting impression on players' memories

### 2. Fantasy
- Deeply fantasy but not limited to medieval
- Art style remains consistent across universes and themes
- Each character has unique personality and twist
- Popular archetypes are reimagined

### 3. Stylized
- Iconic and easily identifiable proportions
- Carefully selected color palette
- Players can read the world regardless of clutter
- **Simplicity is key** - doesn't mean low quality
- Takes many iterations to achieve consistency

### 4. Flexible
- Composed of primitive shapes (cubes and quads)
- Easy to understand how models are made
- Technical structure is simple to comprehend and iterate
- **Empowering user creativity** - true goal of Hytale

---

## Getting Started

### Download Required Tools

1. **Blockbench** - [blockbench.net](https://www.blockbench.net/)
2. **Hytale Blockbench Plugin** - [Hytale Plugin](https://www.blockbench.net/plugins/hytale_plugin)
3. **Plugin Source Code** - [GitHub](https://github.com/JannisX11/hytale-blockbench-plugin)

> **Important:** The Blockbench plugin is in Early Access. You might encounter bugs, but it will continue to improve.

**Plugin Features:**
- Maintains consistent pixel ratio across textures
- Exports models and animations in correct format
- Quality-of-life improvements
- Tailored to Hytale engine needs

---

## Geometry Constraints

### Primitives

Hytale models use **only 2 primitives:**

1. **Cubes** (6 sides)
2. **Quads** (2 sides)

**Not Allowed:**
- ❌ Edge loops
- ❌ Special topology
- ❌ Triangles
- ❌ Pyramids
- ❌ Other traditional modeling shapes
- ❌ **No spheres allowed!**

**Benefits:**
- Easy to make, unwrap, and animate
- No weight painting required
- No rigging required
- No 3D art degree required to start
- Blockbench plugin helps maintain simplicity

---

## Hytale Proportions

### Character Bodies
- **Not realistic** - small, bulky, and cartoony
- Supports chunky style used throughout the game
- Blocks and furniture are "toylike"
- Pure and iconic shapes

### Bone Naming Convention
- Bones must be properly named for animation system
- Once bones are correctly named, they animate in-game automatically
- Refer to official player hierarchy for examples

---

## Triangle Count (Polygon Budget)

### Philosophy
- Work as simply as possible
- Increase geometry only when needed to improve silhouette
- Stylistic choice + performance reasons

### Performance Context
- Hytale renders **several thousand blocks and voxels simultaneously**
- Results in **several million triangles per frame**
- Triangles are major contributor to FPS loss

### Optimization Requirements
- Artists must ensure models are **highly optimized**
- Minimize impact on GPU
- Every triangle counts

---

## Texture Size and Density

### Texture Requirements
- **Non-square textures allowed**
- Must be **multiples of 32px** (32, 64, 96, 128, etc.)

### Texel Density Options

You have **two options** when modeling:

#### Option 1: Character/Attachment
- **Density:** 64px per unit
- **Use For:**
  - Characters
  - Cosmetics
  - Tools
  - Weapons
  - Food items

#### Option 2: Prop/Block
- **Density:** 32px per unit
- **Use For:**
  - Cubes
  - Furniture
  - Props
  - Any non-character objects

### Why Higher Density for Characters?

**Reasons for 64px density:**
1. **Emotion Conveyance** - Details on skin, tattoos, makeup, eye/mouth motion
2. **Close-Up Viewing** - Faces seen very close, especially in first-person
3. **Scene Readability** - Characters detach from environment, attract player's eyes
4. **Cosmetic Details** - More options for logos, materials, textures, ornaments
5. **First-Person Immersion** - Hand/weapon/tool looks better close to camera

> **Note:** Many avatar customization features will unlock progressively during Early Access.

---

## Stretching Geometry

### When to Use Stretching
- Fine adjustments (e.g., avoid Z-fighting when geometry overlaps)
- Slightly resize something
- Work around pixel density limitations

### Stretching Limits
- **Avoid:** Going under **0.7X** or over **1.3X** stretch on one axis
- Beyond these limits, pixel stretching becomes obvious
- Use sparingly and carefully

---

## Texturing Brushes

### Recommended Brushes

You don't need many special brushes! Use any painting software:
- Photoshop
- GIMP
- Clip Studio
- Affinity
- Krita
- Blockbench
- Procreate

**Two Simple Brushes:**

1. **Pencil Brush**
   - Opacity on for details
   - Use for color-blocking

2. **Round Soft Brush**
   - Opacity pressure on
   - For softening surfaces and creating volume
   - Use for smoothing and shading

3. **Opacity Pencil**
   - For polish and final details

### Texturing Philosophy
- Treat each texture as an **"illustration"**
- Paint/bake shadows, ambient occlusion, and highlights directly into texture
- Simulate more complex lighting than exists in-game
- Create illusion of detail
- **Avoid:**
  - Noise
  - Too much grain
  - Perfectly flat surfaces

---

## Color Picking Guidelines

### Color Theory Rules

**Do:**
- ✅ Add color in shadows (hint of purple makes models vibrant)
- ✅ Use nuanced, saturated shadows
- ✅ Test colors in-game once available

**Don't:**
- ❌ Use pure white (#FFFFFF)
- ❌ Use pure black (#000000)
- ❌ Create purely desaturated shadows

**Why Avoid Pure White/Black:**
- Breaks lighting in-game
- Adds too much contrast
- Ruins value balance

---

## Shading Mode and Materials

### Character Models
- **Recommendation:** Disable side shadows in Blockbench
- Avoids hard edge effect on body
- Better for simulating curvy organic volumes

### In-Game Materials
- Tight set of material types (shading modes)
- Performance and style reasons
- Blockbench can't display shading modes yet
- Can set and export shading modes for each node

---

## Hytale Renderer

### Rendering Approach
- **Not using PBR workflows** (no roughness, normal maps, displacement)
- Tailored to elevate unique art style
- Avoids effects that damage handcrafted texture style

### Rendering Features
- Paint lights and shadows inside textures
- Real lights/shadows bring everything together
- In-house light propagation techniques
- Selective shaders and post-processing:
  - Bloom
  - Depth of Field
  - Ambient Occlusion (SSAO)
  - Shadowmap
  - Fog

### Quality Standard
- Models should look good **without any effects**
- Effects are "cherry on top"
- Makes Hytale feel cozy and vibrant

### Future Rendering Features
- Light propagation improvements
- Colorimetry and gamma features
- Color grading control
- Godrays
- Transparent glass
- Many other surprises

---

## Official Tutorial Videos

**Magma Golem Tutorial** by Thomas Frick (Art Director)
- Concepting process
- Modeling workflow
- Available on official Hytale channels

**Download Official Models:**
- [Hytale Model Examples.zip](https://cdn.hytale.com/Hytale%20Model%20Examples.zip)
- Includes selection of official models for study and tinkering

---

## Best Practices Summary

### Geometry
1. Use only cubes and quads
2. Keep triangle count low
3. Optimize for performance
4. No spheres!

### Textures
1. Multiples of 32px only
2. Choose correct density (64px for characters, 32px for props)
3. Avoid pure white and pure black
4. Paint shadows and highlights into texture
5. Add color to shadows

### Workflow
1. Start simple
2. Iterate to improve silhouette
3. Test in-game when possible
4. Follow art pillars (Immersive, Fantasy, Stylized, Flexible)

### Character Models
1. Name bones correctly for animation
2. Use 64px density
3. Disable side shadows in Blockbench
4. Keep proportions cartoony and bulky

---

## Common Mistakes to Avoid

❌ **Using too many triangles** - Impacts performance significantly  
❌ **Pure white/black colors** - Breaks in-game lighting  
❌ **Stretching beyond 0.7X-1.3X** - Obvious pixel distortion  
❌ **Wrong texture density** - Inconsistent with game style  
❌ **Complex topology** - Keep it simple with cubes and quads  
❌ **Flat, noisy textures** - Add volume and avoid grain  
❌ **Spheres** - Not supported!

---

## Learning Resources

### Official
- **Blockbench Plugin** - Essential tool
- **Model Examples** - Download from official site
- **Tutorial Videos** - Art Director's workflow
- **Official Blog** - Latest art direction updates

### Community
- **Discord** - [Official Hytale Discord](https://discord.gg/hytale)
- **Share Your Work** - Get feedback from community
- **Learn from Others** - Study community creations

---

## Getting Started Checklist

- [ ] Download Blockbench
- [ ] Install Hytale Blockbench Plugin
- [ ] Download official model examples
- [ ] Study art pillars
- [ ] Practice with simple models
- [ ] Choose correct texture density
- [ ] Keep geometry simple (cubes and quads only)
- [ ] Avoid pure white and black
- [ ] Test stretching limits
- [ ] Share with community for feedback

---

## Future Updates

The Hytale art team will share more about:
- Advanced modeling techniques
- Animation workflows
- VFX creation
- UI art

Stay tuned for more comprehensive guides!

---

## Closing Words

> *"The Hytale art team's role is also to support the community by sharing our creative vision, our tools, and good practices, so you, whether you are an advanced creator or simply curious, can take the leap and have everything you need to dive into making beautiful models!"* - Thomas Frick (Art Director)

---

**Related:** [Block Animations](06-block-animations.md) | [Useful Tools & Links](10-useful-tools-and-links.md)

---

*Have fun creating! Your art style is yours, and don't let anyone tell you otherwise.*
