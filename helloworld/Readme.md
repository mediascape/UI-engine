##UI-Engine Hello World

This Hello World example shows how the UI-Engine API of the [MediaScape project](http://mediascapeproject.eu/) works on a basic way. On this example, you will find an application with three elements (Web Components) and the UI-Engine (User Interface Engine) creates a layout organising the elements on a responsive interface.

## Navigation
[Installation][] | [Prerequisite][] | [Deployment][]  | [Run][] | [Minify][] | [Result][]

###Installation
This example provides two ways to run it: 'Production' and 'Development'. Use 'Production' to a quick deployment on a Web server to rapidly see how it works. Use 'Development' if you want to go deeper in the code and add more functionalities to the Hello World example.

####Prerequisites
#####Production
* WebServer (example:apache)
* Google Chrome Web browser (Currently ir requires to activate the Web Platform flag in chrome://flags/ )

#####Development
* Install git
* Install node.js and npm
* Install mongodb
* Start mongodb

####Deployment

#####Production
Clone the repository to the root folder of a Web server, or download it and extract the files into that folder.
Ensure that index.html file has the reference to the [minimized javascript file](https://github.com/mediascape/UI-engine/blob/master/helloworld/js/mediascape.uiengine.min.js)

#####Development
Download the [`deploy.sh`](https://raw.githubusercontent.com/mediascape/UI-engine/master/helloworld/deploy.sh) script (it works for Linux).  
This script will:

1. clone the git and install everything in a folder called `deploy` relative to the file itsself
2. copy the [server](https://github.com/mediascape/application-context/tree/master/Server) and [Discovery API](https://github.com/mediascape/discovery-self/tree/master/API) including this HelloWorld sample
3. install all needed dependencies for the backend and start a small setup-script to configure it.

*Please dont execute it inside the git folder. The best practice is to download just the `.sh` file and execute it.*

### run

#####Production

Run the Web server and find the Hello World at::
```
    http://localhost/UI-engine/helloworld/
```

#####Development
```
    http://localhost:8080/dev.html
```

### Minify

The minified version for the 'Production' is generated each time the deploy.sh script is executed. It will locate it at www/ folder.

# Result

Six different layouts are available in order to show the components in different organisations:

Pip Layout
---------
The component with the higher order is in fullscreen mode and the others are placed with a reduced size in a column at the right side of the screen and over the fullscreen component. When a component from the column is clicked, it is changed to the fullscreen position.
![Pip](https://raw.githubusercontent.com/itamayo/mediascape-images/master/images/pip.png)

Menu Layout
---------
The selected component is in fullscreen and the rest are not showed. A menu appears at the bottom of the screen whenever there is activity on the browser. When a name in the menu is clicked, the associated component gets the fullscreen place.
![Pip](https://raw.githubusercontent.com/mediascape/UI-engine/master/helloworld/images/menu.png)

Accordion Layout
------------------
All the components are showed at the same time imitating an accordion behaviour. At the beginnig, the screen is divided in equal size vertical areas, one for each component. When the mouse is over a component, that component is expanded and the others shrink. Furthermore, when the component is clicked it gets fullscreen mode.

![Accordion](https://raw.githubusercontent.com/mediascape/UI-engine/master/helloworld/images/Accordion.png)

Grid Layout
------------------
Having each component a given preferred size and the order, the screen is divided in cells of different sizes. The Grid layout iterates across the components with a priority-based order, and goes over the layout matrix from left to right and from top to down, filling empty slots with unplaced components.
![grid](https://raw.githubusercontent.com/mediascape/UI-engine/master/helloworld/images/grid.png)

VerticalMenu Layout
------------------
The selected component is in fullscreen and the rest are not showed. A menu appears at the top-right side of the screen whenever there is activity, showing the name of the remaining components. When a name is clicked, the associated component gets the fullscreen place.

![verticalMenu](https://raw.githubusercontent.com/mediascape/UI-engine/master/helloworld/images/verticalmenu.png)

Spinner Layout
------------------
A spinner is built with a small view of each one of the available components. The rotating movement of the spinner is controlled by left/right direction arrows. When a component is clicked, it takes the fullscreen mode.
![spinner](https://raw.githubusercontent.com/mediascape/UI-engine/master/helloworld/images/spinner.png)

Horizontal Layout
------------------
The screen is divided into equal size horizontal areas, one for each component. The components will be ordered taking into account the priority from the top to the bottom.

![horizontal](https://raw.githubusercontent.com/mediascape/UI-engine/master/helloworld/images/horizontal.png)

ScrollHorizontal Layout
------------------
The selected component is in fullscreen and the rest are not showed. It is possible to drag the components in both directions, from the top to the bottom, or from the bottom to the top of the screen, simulating a vertical carousel and changing the component that is in fullscreen. There are also two arrows (up/down) in order to control the mentioned carousel by clicking them. 

![scrollHorizontal](https://raw.githubusercontent.com/mediascape/UI-engine/master/helloworld/images/scrollHorizontal2.png)

All the previous layouts can also be used in other devices:

On Tablet
------------------
Accordion layout on a tablet.
![tablet](https://raw.githubusercontent.com/mediascape/UI-engine/master/helloworld/images/accordion-tablet.png)

On Mobile
------------------
Horizontal layout on a mobile.
![mobile](https://raw.githubusercontent.com/mediascape/UI-engine/master/helloworld/images/horizontalMobil.png)

[Installation]: #installation
[Prerequisite]: #prerequisite
[Deployment]: #deployment
[Run]: #run
[Minify]: #minify
[Result]: #result
