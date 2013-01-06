[Sangu Package](http://www.sangu.be) - Warlord TW extension
=============

The Sangu Package is a Greasemonkey script for Firefox, 
Opera and Chrome (Tampermonkey) that improves [Tribal Wars](http://www.tribalwars.nl) gameplay speed by
adding extra features on pretty much every page, most notably the village overview pages.

Support
-------

**Worlds**
Currently only the .nl Tribal Wars server is supported. There is a `trans` JS object that should
make it (relatively) easy to make the script work on DE or US servers aswell. The use of Greasemonkey is (last
time I checked) not allowed on any other server, so NL, DE and US are the only ones translations
can be added for.

**Browsers**
All features should work in the latest versions of Opera, FireFox and Chrome (easiest to install and manage with the Tampermonkey extension). 
The script is least extensively tested in FireFox.

**Worlds**
Currently only NL worlds 1 to 26 are supported. Automatic loading of new worlds is high on the ToDo List :)

Building the script from source
-------------------------------

An [Autohotkey](http://www.autohotkey.com) script (mergeIt.ahk) can be used to assemble the different js files
into "sangupackage.user.js".
To do this: Download and install Autohotkey, then double click mergeIt.ahk when in the same directory as the source files
and it will create the complete Greasemonkey script. Change the following line (2nd line) in the script to change the path
to 

    savePath := "yourFullPathHere" ;this is a comment

This (Autohotkey) means the script can currently only be assembled on a Windows machine. (This was perhaps not really
tought through:). If a non Windows person wants to join the project, I'm sure we can come up with a solution that works
for both environments :)
