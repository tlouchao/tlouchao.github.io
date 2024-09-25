---
title: 'Tech Art Crash Course (Part II): Creating an FBX Exporter from Blender to Unreal Engine 5'
description: 'I wrapped up my initial venture into the field of technical art, by creating a Blender add-on to address a common task - automating the transfer of FBX assets between DCCs, or digital content creation applications.'
pubDate: 'Sep 22 2024'
heroImage: '/blog/blender2unreal.png'
---
This blog post covers the remainder of the work that I completed for a [technical art course](https://elvtr.com/course/technical-art)
which ran from February 2024 to April 2024. The previous blog post can be found [here](/blog/batch-renamer).

As the final weeks approached, I was given the choice of building either a Python tool, an Unreal Engine 5 
[Blueprint](https://dev.epicgames.com/documentation/en-us/unreal-engine/blueprints-visual-scripting-in-unreal-engine), a shader/material, 
or a [Niagara](https://dev.epicgames.com/documentation/en-us/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine) visual effect. 
Since I was familiar with Python, and since I had *just* brushed the surface of Unreal Engine 5 and was not yet fully comfortable within the game engine, 
I opted for the Python tool in order to implement features on time within a short window.

Within the Python subcategory, I was given some suggestions as to what to build - a skin-weight transfer tool, a file log parser, an FBX settings manager, et cetera.
I decided to go with the last suggestion, since I knew of the FBX file format from tinkering with 3D computer graphics software such as [Blender](https://www.blender.org/) 
and [Autodesk Maya](https://www.autodesk.com/products/maya/overview). And since I was better acquainted with Blender at that moment in time, I decided to focus on
building an <b>FBX exporter</b> specifically for Blender, with Unreal Engine 5 as the target application.

## Problem Space ##

The *most important* issue that I wanted to sort out between Blender and Unreal Engine 5, pertained to the unit system mismatch between the two 3D software packages.
The implicit unit of measurement in Blender is one *meter*, assuming that the unit system is set to either "None" or "Metric" under the project's [Scene Properties](https://docs.blender.org/manual/en/latest/scene_layout/scene/properties.html) tab. On the other hand, the default unit of measurement in Unreal Engine 5 is one *centimeter*, assuming that the unit system is set to the metric system:

| Software | Unit System | Unit
|---|---|---|
|Blender | None (Blender Units), Metric | Meter
|Unreal Engine 5 | Metric | Centimeter

<br/>

## Proposal ##

I was granted the go-ahead to build my exporter, under the conditions that it was similar in complexity to the [batch renamer](/blog/batch-renamer) 
from the previous assignment, and that it had a GUI with three or more meaningful options for the user to select from.

At the very minimum, I knew that the exporter had to:

1. Get a valid filepath for a target folder - ideally, this would be the top-level folder, or the `Content\` folder of an Unreal project
2. Apply a scale transform to the output FBX - ideally, this would be a <b>0.01</b> multiplier to handle the conversion from meters to centimeters 
3. Finally, export and place the FBX in the target folder

I proposed that the exporter should provide the following options:

- Allow the user to set the output filename. If not specified, then the name should be set to the `.blend` filename by default 
- todo
- todo

## Blockquotes

The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a `footer` or `cite` element, and optionally with in-line changes such as annotations and abbreviations.

### Blockquote without attribution

#### Syntax

```markdown
> Tiam, ad mint andaepu dandae nostion secatur sequo quae.  
> **Note** that you can use _Markdown syntax_ within a blockquote.
```

#### Output

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.  
> **Note** that you can use _Markdown syntax_ within a blockquote.

### Blockquote with attribution

#### Syntax

```markdown
> Don't communicate by sharing memory, share memory by communicating.<br>
> — <cite>Rob Pike[^1]</cite>
```

#### Output

> Don't communicate by sharing memory, share memory by communicating.<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: The above quote is excerpted from Rob Pike's [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) during Gopherfest, November 18, 2015.

## Tables

### Syntax

```markdown
| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |
```

### Output

| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |

## Code Blocks

### Syntax

we can use 3 backticks ``` in new line and write snippet and close with 3 backticks on new line and to highlight language specific syntax, write one word of language name after first 3 backticks, for eg. html, javascript, css, markdown, typescript, txt, bash

````markdown
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example HTML5 Document</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```
````

### Output

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example HTML5 Document</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```

## List Types

### Ordered List

#### Syntax

```markdown
1. First item
2. Second item
3. Third item
```

#### Output

1. First item
2. Second item
3. Third item

### Unordered List

#### Syntax

```markdown
- List item
- Another item
- And another item
```

#### Output

- List item
- Another item
- And another item

### Nested list

#### Syntax

```markdown
- Fruit
  - Apple
  - Orange
  - Banana
- Dairy
  - Milk
  - Cheese
```

#### Output

- Fruit
  - Apple
  - Orange
  - Banana
- Dairy
  - Milk
  - Cheese

## Other Elements — abbr, sub, sup, kbd, mark

### Syntax

```markdown
<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.
```

### Output

<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.
