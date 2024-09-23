---
title: 'Tech Art Crash Course (Part I): Creating a Batch Renamer with Qt Designer and PyQt'
description: 'During my initial foray into the field of technical art, I was tasked with building a batch renaming utility with the help of publicly available tools such as Qt Designer and the PyQt GUI toolkit.'
pubDate: 'Sep 01 2024'
heroImage: '/blog/batchrenametex.png'
heroImageCaption: 'Credits to Poly Haven for the stone and metal textures used in this image.'
---
From February 2024 to April 2024, I had the chance to take a [technical art course through ELVTR](https://elvtr.com/course/technical-art) - 
I had heard that the tech art role mostly required a degree of proficiency in Python programming, in addition to art sensibilities in the case of shaders and VFX. Before taking the course, I was acquainted with Python, but not within the context of games. I was also somewhat familiar with Qt and C++, but had not yet tried PyQt/Qt for Python.

A few weeks into the coursework (from late February to early March), I was given a task - I was to implement a batch renamer utility, 
firstly as a command line script, and later on as a [PyQt6 application](https://doc.qt.io/qtforpython-6/) built on top of the previous script.

The assignment was meant to introduce a common pain point with game asset management - finding a way to quickly rename hundreds (or thousands) 
of texture exports, 3D renders and configuration files located in a repository somewhere, while retaining some flexibility in configuring said
operation. A utility such as this would be called upon to target files with typos, or files which needed to be moved to some other directory, 
or files in need of an update to a new naming convention ... and so on.

## The Dilemma ##

At the time of taking the course, the renaming utility was expected to do at least the following per rename operation:

1. <a class="anchor-nohover" name="requirement-one">Get a valid filepath to the current folder</a>
2. <a class="anchor-nohover" name="requirement-two">Get a valid filepath to a target folder</a>   
3. <a class="anchor-nohover" name="requirement-three">Select file(s) in the current folder</a>          
4. <a class="anchor-nohover" name="requirement-four">Rename the selected file(s) in place, or copy to the target folder</a>

Optionally, the utility could do one or more of the following steps per operation:
- Filter selected file(s) by file extension
- Find and replace one or more substrings in the selected file(s)
- Add a *prefix* and/or *suffix* to the selected file(s)
- Enable overwriting the selected file(s), if the file(s) already exists in the target folder

Given the following test files, the output files were to be free of noise such as the version number of the file, 
or extraneous words such as "file", "final", et cetera. At the same time, each filename was to be wrapped with short, 
descriptive text indicating the type of game asset the file represented:
| Initial Filenames | Target |
|---|---|
|texture_metal_diffuse.png | T_metal_C.png
|grass_file_01.ma          | M_grass.ma
|hello_world.txt           | NOTE_hello_world_TEMP.txt

For example, the filename for a diffuse map could have a <mark>"T"</mark> prefix instead of "texture", and a 
<mark>"C"</mark> suffix instead of "diffuse" or "color".

## Tools and Boilerplate ##
[Qt Designer](https://build-system.fman.io/qt-designer-download) was introduced early on as a free tool for quickly 
prototyping graphical user interfaces with widgets from the Qt GUI framework (though the possibility remained open to 
build out a GUI from scratch). 

A batch file was also provided to help with translating the XML based `.ui` file produced from Qt Designer to an equivalent `.py` file - 
the batch file made use of the `pyuic.py` module included with `PyQt6`, and would map Qt widget names directly to the data attributes 
of a Python class named `Ui_MainWindow` when run:

``` shell
python -m PyQt6.uic.pyuic -x batch_renamer.ui -o batch_renamer_ui.py
```
Then, the output file would be included as a dependency in another Python file, which included some starter code that demonstrated how 
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
*This* Python file, which contained the class definition for the `BatchRenamerWindow`, would become the primary working file 
over those next couple of weeks.

## Implementation ##

As I was unfamiliar with Python bindings for Qt beforehand, note that the following implementation details will primarily cover discoveries made while working with PyQt.

### The GUI ###

After prototyping in Qt Designer and converting my Qt Designer `.ui` file to `.py`, I eventually landed on the GUI shown below, which I styled with a <a href="https://doc.qt.io/qt-6/stylesheet.html" target="_blank">Qt Style Sheet</a> (credits to <a href="https://qss-stock.devsecstudio.com/templates.php" target="_blank">DevSec Studio</a>):

<br/>
<div class=div-center>
    <img src="/batch_renamer_screenshot.png" alt="Batch Renamer Utility Screenshot" style="max-width: 720px;"/>
</div>
<br/>

Though I had a GUI to interface with, I still needed to handle user interaction with Qt's edit fields, buttons, and other clickable widgets in order 
to meet the requirements, which leads into: 

### The Requirements ###

After perusing the PyQt documentation, I extended the starter code and leaned on the <a href="https://docs.python.org/3/library/os.html" target="_blank">`os`</a> module for file navigation, <a href="https://docs.python.org/3/library/os.path.html#module-os.path" target="_blank">`os.path`</a> for pathname manipulation, and <a href="https://docs.python.org/3/library/re.html#module-re" target="_blank">`re`</a> for regular expression matching in tandem with built-in string methods such as <a href="https://docs.python.org/3/library/stdtypes.html#str.replace" target="_blank">`str.replace()`</a>. 

To fulfill the <a href="#requirement-one">first</a> requirement, I reused the `browseBtn` in the starter code, 
which I mapped to a <a href="https://doc.qt.io/qt-6/qpushbutton.html" target="_blank">`QPushButton`</a> to react to the 
<a href="https://doc.qt.io/qt-6/qabstractbutton.html#clicked" target="_blank">`clicked()`</a> signal. I added one line to the `get_filepath()` 
function in order to set the display text of the corresponding <a href="https://doc.qt.io/qt-6/qlineedit.html" target="_blank">`QLineEdit`</a> widget:

``` python
self.lineEditFilepath.setText(self.filepath)
```

Since the second requirement was similar to that of the first, I set the second filepath to the target folder
with some reused code and swapped variable names:

``` python
self.lineEditNewFolder.setText(self.new_folder)
```

To fulfill the <a href="#requirement-three">third</a> requirement and to check for valid filepaths, I looked at the `QLineEdit` 
widget which held the value for the current folder. I wanted to handle the resulting value after clicking on the `browseBtn`, *and* 
the resulting value after editing the contents of the `QLineEdit` widget directly. I accomplished this by doing the following:

1. Refactored the `get_filepath()` function; moved the set functionality to a function called `set_filepath()`
2. Moved the remaining code from `get_filepath()` to a new function called `btn_filepath()`
3. Connected the `QLineEdit` widget's <a href="https://doc.qt.io/qt-6/qlineedit.html#editingFinished" target="_blank">`editingFinished()`</a> signal 
  to a new function called `le_filepath()`

``` python
self.lineEditFilepath.editingFinished.connect(self.le_filepath)
```

Both the `btn_filepath()` and `le_filepath()` functions would pass their value to `set_filepath()`:

``` python
def btn_filepath(self):
    """
    Open a file dialog and browse to an existing directory
    """
    filepath = QFileDialog().getExistingDirectory()
    self.set_filepath(filepath)

def le_filepath(self):
    """
    Get the lineEdit text for filepath
    """
    filepath = self.lineEditFilepath.text()
    self.set_filepath(filepath)
```

Then, the `set_filepath()` function would be responsible for validating and setting the input; it would check if the incoming `filepath` 
stood for some valid directory. If so, the pending list of selected files (displayed via <a href="https://doc.qt.io/qt-6/qlistwidget.html" target="_blank">`QListWidget`</a>) would be updated with the help of <a href="https://docs.python.org/3/library/os.html#os.walk" target="_blank">`os.walk()`</a>:

``` python
def set_filepath(self, filepath):
    """
    Set the lineEdit text for filepath
    """
    if os.path.isdir(filepath):
        self.filepath = filepath
        self.lineEditFilepath.setText(filepath)
        self.update_list()
    else:
        # Log error to console

def update_list(self):
        """
        Clear listwidget
        read files in filepath with os.walk
        Add files as new items
        """
        self.listWidget.clear()
        for root, dirs, files in os.walk(self.filepath):
            self.listWidget.addItems(files)
```
<p class="caption">*I reused this code for the other widget which held the value for the target folder, 
once the results were as expected.</p>

To fulfill the <a href="#requirement-four">fourth</a> and final requirement, I included two 
<a href="https://doc.qt.io/qt-6/qradiobutton.html" target="_blank">`QRadioButtons`</a> which were set to exclusive
mode by default, meaning that if one radio button were to be enabled, then the other would be disabled and vice versa.
Depending on which radio button was toggled on, an internal flag named `copy_files` would be set to true or false:

``` python
self.radioButtonRename.toggled.connect(self.set_copy_files)
self.radioButtonCopy.toggled.connect(self.set_copy_files)
```
``` python
def set_copy_files(self):
    """
    Toggle between rename/move files mode and copy files mode
    """
    if self.radioButtonRename.isChecked():
        self.copy_files = False
    elif self.radioButtonCopy.isChecked():
        self.copy_files = True
```

### Optional Features ###

As for the optional steps per rename operation, I relied on `os.path.splitext()` to get the extension per filename, in order to
filter on the `.png`, `.ma`, and `.txt` file extensions. 

For the string replacement operation, I retrieved a space-delimited string from the corresponding `QLineEdit` widget, and 
called upon <a href="https://docs.python.org/3/library/stdtypes.html#str.split" target="_blank">`str.split()`</a> to get an array of
strings to search for. I retrieved *one* replacement string from the other, corresponding `QLineEdit` widget, and looped over
the individual array elements in order to <a href="https://docs.python.org/3/library/stdtypes.html#str.replace" target="_blank">`str.replace()`</a>
with the new string:
``` python
def find_and_replace(files)
    new_files = []
    for file in files:
        fname, ext = os.path.splitext(file)
        for s in self.strings_to_find:
            # replace with the new string
            fname = fname.replace(s, self.string_to_replace)
        new_file = fname + ext
        new_files.append(new_file)

    return files
```
For adding a prefix and/or suffix to each filename, a `os.path.splitext()` followed by a few string concatenations did the job.

For the overwrite flag, I found that the `toggled()` and `isChecked()` methods could be called upon a 
<a href="https://doc.qt.io/qt-6/qcheckbox.html" target="_blank">`QCheckBox`</a> in addition to the `QRadioButton`, as 
both Qt widgets inherit from the same <a href="https://doc.qt.io/qt-6/qabstractbutton.html" target="_blank">`QAbstractButton`</a> class. 
So, I came up with some setup/event handler code that was similar to the pre-existing code for the rename/copy flag. 

### QoL Improvements ###

I had time to add some additional behavior to the batch renamer utility to make it easier to use. I gave the tool the ability to:

- Enable the "Run" button only if a valid starting filepath is set
- Clear (most) `QLineEdit` contents after each batch rename operation
- Support comma-delimited strings to search for and replace
- Collapse consecutive whitepace in the strings to search for, into a single space
 
The consecutive whitespace issue was addressed with <a href="https://docs.python.org/3/library/re.html#re.sub" target="_blank">`re.sub()`</a> and a regular expression which described one or more whitespace characters, or `\s+`, as the pattern to match.

In time, I also gave the tool the ability to log color-coded <mark style="background: yellow;">errors</mark> and <mark style="background: yellow;">warnings</mark> 
in the dialog itself, in addition to logging to standard out. It even had the ability to log <mark style="background: lime;">successes</mark>, 
such as error-free rename operations.

One issue did arise while I worked on the logger behavior - I noticed that clicking, and then removing focus from a `QLineEdit` widget, would still trigger a warning.
I decided to address this case by detecting if the `QLineEdit` contents had changed between focus events. 

For example, in order to log an <mark style="background: yellow;">invalid filepath</mark> warning under the condition that the current folder value had changed, 
I connected the corresponding `QLineEdit` widget's <a href="https://doc.qt.io/qt-6/qlineedit.html#textChanged" target="_blank">`textChanged()`</a> signal 
to a slot, which updated an internal boolean flag to keep track of changes:

``` python
self.lineEditFilepath.textChanged.connect(self.update_filepath)
```

``` python
def update_filepath(self):
    """
    Check if lineEdit text for the filepath has changed
    """
    if not self.filepath_changed:
        self.filepath_changed = True
```

