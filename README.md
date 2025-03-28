# Production Chain Calculators

A package used to create, modify, and parse data representations of production chains from Factorio factories

## Summary

Functionality of the package is exported through three main modules, irptu (at @ceofyeast/prodchaincalculators/irptu), utility (at @ceofyeast/prodchaincalculators/utility), and config (at @ceofyeast/prodchaincalculators/config). Other modules in the package are exported, but this is done for testing purposes. 

The irptu module exposes methods to add and subtract user demand for individual items from a production chain; the demand for the intermediary items required to make said item is automatically calculated, and then added or subtracted from the production chain.

The utility module exposes methods to create, parse, and recalculate the time unit of a production chain. 

The config module exposes an object whose properties determine the behavior of the package; these properties can be changed by the program during runtime, or the defaults can be set within the module itself. Once the properties are changed, all the resources that depend on the properties are automatically reloaded. The properties are as follows:
- baseURL: stores the base URL used to make http fetch requests from the package (default is "http://localhost:3000")
- recipesRoute: stores the route used to fetch the recipes object from the server (default is "/recipes")
- axiosInstance: stores an Axios instance, which can act as an alternative to the default behavior of making fetch requests from the package; this is helpful if a developer has a pre-configured Axios instance they wish to use (default is null)
- initialRecipesLoad: stores a bool indicating whether recipes will be loaded as soon as the recipes module is required; this uses a top-level await, and therefore causes the website to visually stall on load; this must be set to true when running unit tests (default: false)

## Installation

npm i @ceofyeast/prodchaincalculators

## Keep Up With Updates

Link:
https://www.instagram.com/ceofyeast/?igsh=MXRyOXRycjR3M3piMw%3D%3D&utm_source=qr
