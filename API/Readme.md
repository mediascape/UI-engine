UIENGINE API DESCRIPTION
========================

UIENGINE (User Interface Engine) is a module created by Vicomtech-IK4 to create reponsive and adaptive user interface layouts for multi-device media applications.

API DEFINITION
--------------

**init (components, LAYOUTMODE)**

It activates the user interface module. The ``components`` parameter defines the components to be displayed, while the ``LAYOUTMODE`` parameter can be defined as three different modes:

       * STATIC: The application developer chooses a user interface layout. This will be used for all the circumstances. The selected layout should be defined in the `layouts` folder.
       * CUSTOM: The application developer chooses a user interface layout, but provides the user the option to change it on run-time. When the user decides to change the layout, the UIENGINE will swicth between the layouts available in the `layouts` folder.
       * ADAPTABLE: The UIENGINE decides the most appropriate layout depending on the context and provides the user the option to change it on run-time. When the user decides to change the layout, the UIENGINE will swicth between the layouts available in the `layouts` folder.
       
Example:
```javascript
 document.addEventListener('adaptationToolkit-ready',function(data){
    var UI = mediascape.AdaptationToolkit.Adaptation.UIAdaptation;
    UI.init(data.detail.components,UI.LAYOUTMODE.ADAPTABLE);
  },false);
```
Or for static use

```javascript
 document.addEventListener('adaptationToolkit-ready',function(data){
    var UI = mediascape.AdaptationToolkit.Adaptation.UIAdaptation;
    UI.init(data.detail.components,UI.LAYOUTMODE.STATIC);
    UI.useLayout(‘pip’);
  },false);
```

**registerLayouts()**

It is responsible for registering all the layouts that are passed as a parameter to the UIAdaptation module. It also validates the implementation of each of the layouts.

Example:

It is used internally in the UIAdaptation module to record all layouts that are passed:

```javascript
define(
  ["AdaptationToolkit/adaptation/UIAdaptation/layouts/pip"],
…
this.registerLayouts();
```
**useLayout (layoutName)**

It defines the layout with the one the system is initialized; in the STATIC mode, it is necessary because otherwise, it will be used the default one. Example:

```javascript
UI.useLayout(‘pip’);

```

**onComponentsChange (components, commands)**

It is a callback function that must be associated whenever a change of the components occurs. It receives as input parameters the components to be rendered and optionally, the commands sent by the multiDeviceAdaptation module. Example:

```javascript
/* mda = multideviceAdaptation */
mda.on(‘update’, onComponentsChange);
```

**onOrientationChange ()**

If the orientation of the device changes, it will be possible to associate the event to this function. Every layout must have implemented this function, is not optional. Example:

```javascript
window.addEventListener(‘deviceorientation’,onOrientationChange,false);
```

**onLayoutChangeEvent ()**

This callback will be able to handle the request for a change of layout, for example when a button is pressed:
```html
<button onclick=”onLayoutChangeEvent”>Change Layout</button>
```
**getLayouts ()**

Returns the layouts registered in the system. Example:

```javascript
var layouts = getLayouts();
/* returns list of layouts ['pip','menu']*/
```

**findBestLayout ()**

Returns a sorted array of the registered layouts, giving priority to the optimum layouts for the current device. Example:
```javascript
var bestL = findBestLayout();
console.log( bestL[0].name );
/* returns ['menu','pip']*/
```

**LAYOUT CONSTRUCTION**
       
It is essential to have a generic layout structure in order to manage it heterogeneously. Carrying out a structured development of the layouts, it will be possible to create a system of intelligent,automatic and easily defined layouts.

On the one hand, the system must be flexible to the needs of the developer, allowing to articulate different ways of rendering the content. Therefore, three different modes have been established: STATIC, CUSTOM and ADAPTABLE. The developer is the one who makes the choice.

On the other hand, the system must be capable of managing different events that arise in the application, so it has to be able to support those different events. In this sense, the platform has the ability to validate the implementations and display when any event is not being treated. Finally, it is interesting for the system to be able to sort the layouts depending on the context.

Considering what has been discussed above, it has been generated a predefined structure to make easier the building of new layouts, and also to validate the implementation done.

Each developed layout must implement the following functions:

What to do when a component has changed.
 ```javascript
   onComponentsChange = function (cmps,cmds){
        console.log("test");
    }
```
Rendering the content once the decisions have been taken
```javascript
render = function (cmps){
      console.log("test");
    }
```
What to do when the orientation is changed
```javascript
onOrientationChange = function (cmps){
      console.log("test");
    }
```
What to do when the layout changes
```javascript
onLayoutChangeEvent = function (cmps){
      console.log("layout changed");
    }
```    
What to do when layout is unloaded
```javascript
onUnload = function (cmps){
      console.log("unloading layout ");
    }
  ```

**AN ACTUAL IMPLEMENTATION**

These are the guidelines to follow in order to add a new layout to UIAdaptation module.
The first thing to do is to create a new file with the .js extension in the folder:

mediascape/AdaptationToolkit/Adaptation/UIAdaptation/layouts/

For example: menuLayout.js

The next step is to add the following structure to the new file:

```javascript
define(["AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor"],
  function(LayoutConstructor){

    var menuLayout = new LayoutConstructor('pip');
    menuLayout.onComponentsChange = function (cmps){
        console.log("test");
    }
    menuLayout.render = function (cmps){
      console.log("test");
    }
    menuLayout.onOrientationChange = function (cmps){
      console.log("test");
    }
    menuLayout.onLayoutChangeEvent = function (cmps){
      console.log("layout changed");
    }
    menuLayout.onUload = function (cmps){
      console.log("unloading layout ");
    }
    menuLayout.__moduleName = menuLayout.name;
    return menuLayout;

  });
```
And finally, add a new module parameter within UIAdaptation 
(mediascape/AdaptationToolkit/adaptation/UIAdaptation/UIAdaptation.js):

```javascript

define(
  ["AdaptationToolkit/adaptation/UIAdaptation/layouts/pip","AdaptationToolkit/adaptation/UIAdaptation/layouts/menuLayout"]

```

**VALIDATE THE LAYOUT**

To verify that the system has registered the new layout and that it can be used, testing can be performed through mediascape module:

```javascript
var layouts = mediascape.AdaptationToolkit.Adaptation.UIAdaptation.getLayouts());
console.log(layouts[1].checkForImplementation());
```
If all goes well, it will return 0 errors and you can start using your new layout.

