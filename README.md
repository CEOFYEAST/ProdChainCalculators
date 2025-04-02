# Production Chain Calculators

A package used to create, modify, and parse data representations of production chains from Factorio factories

## Summary

Functionality of the package is exported through four main modules, irptu (at @ceofyeast/prodchaincalculators/irptu), utility (at @ceofyeast/prodchaincalculators/utility), config (at @ceofyeast/prodchaincalculators/config), and recipes (at @ceofyeast/prodchaincalculators/recipes). Other modules in the package are exported, but this is done for testing purposes. 

The irptu module exposes methods to add and subtract user demand for individual items from a production chain; the demand for the intermediary items required to make said item is automatically calculated, and then added or subtracted from the production chain.

The utility module exposes methods to create, parse, and recalculate the time unit of a production chain. 

The config module exposes an object whose properties determine the behavior of the package; these properties can be changed by the program during runtime, or the defaults can be set within the module itself. Once the properties are changed, all the resources that depend on the properties are automatically reloaded. The available properties can be found under the Config Properties header. The resources are able to be reloaded automatically because, similar to the recipes module described below, the config module has a "configChanged" event.

The recipes module exposes a recipes object, which most of the other modules depend on; this object is automatically loaded via a fetch to the server, the details of which can be specified at runtime using the config (I'm working on adding a static file to support pre-compilation configuration). More importantly to the developer, the recipes module also has a recipesLoaded event; while not directly exposed, "listener" methods can be subscribed to the event via the addRecipesLoadedListeners method. As you can imagine, every method added through this method will be called whenever the recipes object is successfully loaded. Finally, the recipes module also exposes a "recipesLoaded" bool variable.


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
