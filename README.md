# Production Chain Calculators

A package used to create, modify, and parse data representations of production chains from Factorio factories

## Summary

Functionality of the package is exported through five main modules, irptu (at @ceofyeast/prodchaincalculators/irptu), utility (at @ceofyeast/prodchaincalculators/utility), config (at @ceofyeast/prodchaincalculators/config), recipes (at @ceofyeast/prodchaincalculators/recipes), and validators (at @ceofyeast/prodchaincalculators/validators). Other modules in the package are exported, but this is done for testing purposes. 

The irptu module exposes methods to add and subtract user demand for individual items from a production chain; the demand for the intermediary items required to make said item is automatically calculated, and then added or subtracted from the production chain.

The utility module exposes methods to create, parse, and recalculate the time unit of a production chain. 

The config module exposes an object whose properties determine the behavior of the package; these properties can be changed by the program during runtime, or the defaults can be set within the module itself. Once the properties are changed, all the resources that depend on the properties are automatically reloaded. The available properties can be found under the Config Properties header.

The recipes module exposes a recipes object, which most of the other modules depend on; this object is automatically loaded via a fetch to the server, the details of which can be specified at runtime using the config (I'm working on adding a static file to support pre-compilation configuration). More importantly to the developer, the recipes module also has a recipesLoaded event, and a "recipesLoaded" bool variable.

The validators module handles validation of various inputs and outputs used by the package; the module exposes a "validation failed" event, which is described under the Events header

## Events

Several modules expose synchronous events that are listened to within the package, and can be subscribed to from sources outside the package as well. Every module that has event/s exposes a method for each event to add subscribers to that event. The naming convention for each method is add{event name}Listener; for example, to add a listener to the recipesLoaded event in the recipes module, the listener is passed to the addRecipesLoadedListener method. Some listeners can accept arguments, but most are empty. The available events are listed below:

- recipesLoaded: Exposed in the recipes module, this event is invoked when the recipes object is successfully loaded in; listeners for this event take no args
- configChanged: Exposed in the config module, this event is invoked when the config object is updated at runtime; listeners for this event take no args
- validationFailed: Exposed in the validators module, this event is invoked when a validation attempt fails; listeners for this event take an error object argument, err

## Config Properties

- baseURL (string): stores the base URL used to make http fetch requests from the package (default is "http://localhost:3000")
- recipesRoute (string): stores the route used to fetch the recipes object from the server (default is "/recipes")
- axiosInstance (object): the stored instance can act as an alternative to the default behavior of making fetch requests from the package; this is helpful if a developer has a pre-configured Axios instance they wish to use (default is null)
- initialRecipesLoad (bool): indicates whether recipes will be loaded when the recipes module is first required; this uses a top-level await, and therefore causes the website to visually stall on load; this must be set to true when running unit tests; outside of testing, this setting will be pretty pointless until I add some pre-runtime configuration method (default: false)
- debugMode (bool): indicates whether the package is in debug mode; in debug mode, the package does some things to ease development such as log various status messages to the console (default: true)

## Installation

npm i @ceofyeast/prodchaincalculators

## Keep Up With Updates

Link:
https://www.instagram.com/ceofyeast/?igsh=MXRyOXRycjR3M3piMw%3D%3D&utm_source=qr
