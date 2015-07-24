##UI-Engine Hello World

This HelloWorld shows UI-Engine of [MediaScape project](http://mediascapeproject.eu/) in action. On this example,
you will find an application based on three components that reorganize and render contents responsive way depending on the capabilities of the device.

## Navigation
[Installation][] | [Prerequisite][] | [Deployment][]  | [Run][] | [Result][]

###Installation
####Prerequisite
#####Production
* WebServer (example:apache)
* Chrome (web platform flag activated, for now)

#####Development
* Install git
* Install node.js and npm
* Install mongodb
* Start mongodb

####Deployment

#####Production
Clone the repository to root folder of the webserver, or download it and extract the files into that folder.
Ensure that index.html file has reference to the [minimized javascript file](https://github.com/mediascape/UI-engine/blob/master/helloworld/js/mediascape.uiengine.min.js)

#####Development
Next to this file you will find a script called `deploy.sh`.  
This script will:

1. clone the git and install everything in a folder called `deploy` relative to the file itsself
2. copy the [server](https://github.com/mediascape/application-context/tree/master/Server) and [Discovery API](https://github.com/mediascape/discovery-self/tree/master/API) including this HelloWorld sample
3. install all needed dependencies for the backend and start a small setup-script to configure it.

*Please dont execute it inside the git folder. Best practice is to download just the the `.sh` file and execute.*

### run

#####Production

After ensure the webserver is running you could run the UI-Engine helloworl at this URL:
```
    http://localhost/helloworld/
```

#####Development
```
    http://localhost:8080/index.html
```

# Result

Pip Layout
---------

![Pip](https://raw.githubusercontent.com/itamayo/mediascape-images/master/images/pip.png)

Menu Layout
---------
![Pip](https://raw.githubusercontent.com/mediascape/UI-engine/master/helloworld/images/menu.png)

Accordion Layout
------------------
![Horizontal](https://raw.githubusercontent.com/mediascape/UI-engine/master/helloworld/images/Accordion.png)

Grid Layout
------------------
![grid](https://raw.githubusercontent.com/mediascape/UI-engine/master/helloworld/images/grid.png)

VerticalMenu Layout
------------------
![verticalMenu](https://raw.githubusercontent.com/mediascape/UI-engine/master/helloworld/images/verticalmenu.png)

Spinner Layout
------------------
![spinner](https://raw.githubusercontent.com/mediascape/UI-engine/master/helloworld/images/spinner.png)

On Tablet
------------------
![tablet](https://raw.githubusercontent.com/mediascape/UI-engine/master/helloworld/images/accordion-tablet.png)

On Mobile
------------------
![mobile](https://raw.githubusercontent.com/mediascape/UI-engine/master/helloworld/images/horizontalMobil.png)

[Installation]: #installation
[Prerequisite]: #prerequisite
[Deployment]: #deployment
[Run]: #run
[Result]: #result
