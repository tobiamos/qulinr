# Qulinr

A slack bot and api for chefs in a tech workspace

## Project Structure

```js
C:.
|   .env
|   .env.example
|   .gitignore
|   LICENSE
|   package.json
|   README.md
|
+---src
|   |   app.js
|   |
|   +---config
|   |       development.js
|   |       production.js
|   |       staging.js
|   |       test.js
|   |
|   +---controllers
|   |       index.js
|   |
|   +---helpers
|   |       index.js
|   |
|   +---models
|   |       index.js
|   |
|   \---routes
|           index.js
|
\---test
    +---integration
    \---unit
```