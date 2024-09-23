---
title: 'Tech Art Crash Course (Part II): Creating an FBX Exporter from Blender to Unreal Engine 5'
description: 'I wrapped up my initial venture into the field of technical art, by creating a Blender add-on to address a common task - automating the transfer of FBX assets between DCCs, or digital content creation applications.'
pubDate: 'Sep 22 2024'
heroImage: '/blog/blender2unreal.png'
---
From February 2024 to April 2024, I had the chance to take a [technical art course through ELVTR](https://elvtr.com/course/technical-art) - 
I had heard that the role mostly required a degree of proficiency in Python programming, in addition to art sensibilities in the case of shaders and VFX. 
Before taking the course, I had some understanding of Unreal Engine 5, having downloaded the free game engine and starter assets. 
I was also familar with Python, but not within the context of games.

A few weeks into the coursework (from late February to early March), I was tasked with implementing a batch renamer script, 
firstly as a command line script, and later on as a [PyQt6 application](https://doc.qt.io/qtforpython-6/) built on top of the previous script. 

The assignment was meant to introduce a common pain point with game asset management - renaming the hundreds or even thousands 
of texture exports, 3D renders and configuration files located in some repository, somewhere. A batch renaming utility such as this one would
be called upon to target files with typos, or files which need to be moved to some other directory, or files in need of an update to a 
new naming convention ... and so on.

## The Dilemma ##

At the time of taking the course, the batch renaming utility needed to complete the following steps per rename operation:

1. Validate if the current filepath points to a folder
2. Select file(s) in the current folder
3. Construct a path from the *current* folder and a path to a *destination* folder             
4. Rename the selected file(s) in place, or copy to the destination folder

Optionally, the utility could do one or more of the following steps per operation:
- Filter file(s) to select by file extension
- Find and replace one or more substrings in the selected file(s)
- Add a *prefix* and/or *suffix* to the selected file(s)
- Enable overwriting the selected file(s), if the file(s) already exists in the destination folder

Given the following test files, the output files were to be free of noise such as the version number of the file, 
or words such as "file", "final", et cetera. At the same time, the keywords per filename were to be surrounded by short, 
descriptive text which indicated the type of game asset each file was:
| Initial Filenames | Target |
|---|---|
|texture_metal_diffuse.png | T_metal_C.png
|grass_file_01.ma          | M_grass.ma
|hello_world.txt           | NOTE_hello_world_TEMP.txt

For example, a diffuse map could have a <mark>"T"</mark> prefix instead of "texture", and a <mark>"C"</mark> suffix instead of "diffuse" or "color".

### Tools and Boilerplate ###
[Qt Designer](https://build-system.fman.io/qt-designer-download) was introduced early on as a free tool for quickly 
prototyping graphical user interfaces with widgets from the Qt GUI framework (though the possibility remained open to 
build out a GUI from scratch). 

A batch file was also provided to help with translating the `.ui` file produced from Qt Designer to an equivalent `.py` file - 
the batch file made use of the `pyuic.py` module included with `PyQt6`, and would map Qt widget names directly to the data attributes 
of a Python class named `Ui_MainWindow` when run:

``` shell
python -m PyQt6.uic.pyuic -x batch_renamer.ui -o batch_renamer_ui.py
```
The output file was to be included as a dependency in another Python file, which included starter code demonstrating how 
to connect a button click event to an event handler. Or in Qt terms, connecting a `clicked()` [signal](https://doc.qt.io/qt-6/signalsandslots.html) 
to a [slot](https://doc.qt.io/qt-6/signalsandslots.html):

``` python
# Our Qt Designer GUI as a Python class
from batch_renamer_ui import Ui_MainWindow

class BatchRenamerWindow(QMainWindow, Ui_MainWindow):

    def __init__(self):
            # UI Setup
            super().__init__()
            super(Ui_MainWindow).__init__()
            self.setupUi(self)
            # Connect button to a function
            # Make sure that there is a Qt Widget named "browseBtn"
            self.browseBtn.clicked.connect(self.get_filepath)

    def get_filepath(self):
        self.filepath = QFileDialog().getExistingDirectory()

```

## Implementation ##
I came to appreciate the drag-and-drop functionality provided by Qt Designer while using it to prototype my graphical user interface.
I extended the starter code and included a QSS stylesheet (with credits to [DevSec Studio stylesheets](https://qss-stock.devsecstudio.com/templates.php)).

### Syntax

```markdown
![Alt text](./full/or/relative/path/of/image)
```

### Output

![blog placeholder](/husky.jpg)

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