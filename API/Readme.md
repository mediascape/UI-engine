# UI-engine API

## Navigation
[Overview][] | [API][] | [Layout Construction: Structure][] | [Layout Construction: Implementation][] | [Layout Construction: Validation][] | [Example][]

## Overview
[Top][]

The UI-engine library (User Interface Engine) provides mechanisms to create reponsive and adaptive user interface layouts for multi-device media applications. When application developers are facing a single-device user interface, they define CSS templates to organise the items in the layout, usually creating a different template for each target device. However, when application developers are dealing with multi-device applications, this approximation becomes unapproachable. For instance, for an application with 6 different items, within a multi-device scenario, a single device could show all the components, only 5 of them, 4 of them, etc. Furthermore, when for example 4 items are shown on a device, the combinatory of selecting 4 components from a total of 6 rises 15 different options. As a result, an application of 6 items has 64 different combinations to create a layout template for each target device. This library provides a more versatile solution in order to create responsive and adaptive User Interfaces depending the multi-device context of the user, based on layout templates.

## API
[Top][]

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

It registers all the layouts that are sent as a parameter to the UIAdaptation module. It also validates the implementation of each one of the layouts.

Example:

It is used internally in the UIAdaptation module to record all the available layouts:

```javascript
define(
  ["AdaptationToolkit/adaptation/UIAdaptation/layouts/pip"],
…
this.registerLayouts();
```
**useLayout (layoutName)**

It defines the layout to be used when the system is initialised; it is mandatory in the STATIC mode. Otherwise, a default one will be used. Example:

```javascript
UI.useLayout(‘pip’);

```

**onComponentsChange (components, commands)**

It is a callback function associated whenever a change on any of the components happens. It receives as input parameters the components to be rendered and optionally, the commands sent by the multiDeviceAdaptation module. Example:

```javascript
/* mda = multideviceAdaptation */
mda.on(‘update’, onComponentsChange);
```

**onOrientationChange ()**

If the orientation of the device changes (e.g. from landscape to portrait), it is possible to associate the event to this function. Every layout must have implemented this function mandatorily. Example:

```javascript
window.addEventListener(‘deviceorientation’,onOrientationChange,false);
```

**onLayoutChangeEvent ()**

This callback will be able to handle the request from the user to change the layout, for example when the user presses a button in the User Interface:
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

## Layout Construction: Structure
[Top][]
       
Since the UI-engine in based on layout templates, it is essential to have a generic and structured way to create new layouts. Each included layout must implement the following functions:

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
What to do when the layout is unloaded
```javascript
onUnload = function (cmps){
      console.log("unloading layout ");
    }
  ```

## Layout Construction: Implementation
[Top][]

These is the guideline to add a new layout to UIAdaptation module.

The first thing is to create a new file with the .js extension in the following folder:

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

## Layout Construction: Validation
[Top][]

The following codes verifies the adequate registry of the new layout:

```javascript
var layouts = mediascape.AdaptationToolkit.Adaptation.UIAdaptation.getLayouts());
console.log(layouts[1].checkForImplementation());
```
For a successful validation it will return 0 errors. It means the layout is ready to use.

## Example
[Top][]

You can find the implementation of an example for the use of the code in the web:

https://github.com/mediascape/UI-engine/tree/master/helloworld

[Top]: #navigation
[Overview]: #overview
[API]: #api
[Layout Construction: Structure]: #layout-construction-structure
[Layout Construction: Implementation]: #layout-construction-implementation
[Layout Construction: Validation]: #layout-construction-validation
[Example]: #example

