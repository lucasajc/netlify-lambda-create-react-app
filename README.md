# Netlify lambda with create-react-app example

## Table of Contents

* [Instruction](#instruction)
* [How to run it](#how-to-run-it)
* [How to build it from scratch](#how-to-build-it-from-scratch)
* [License](#license)

## Instruction

This is an example project that uses `create-react-app` and `netlify-lambda` to fetch Star Wars characters from [SWAPI](https://swapi.co/)

## How to run it

Install dependencies:

```
yarn install
```

Start it locally:

```
yarn run start
```

Build the front-end application and lambda functions:

```
yarn run build
```

Build only netlify lambda functions:

```
yarn run build:functions
```

## How to build it from scratch

### Step 1: initializing the application

Initialize your application with `create-react-app` package typing:

`npx create-react-app your-project-name`

### Step 2: adding netlify lambda package

Add the `netlify-lambda` package, which helps build Netlify lambda builds using Webpack and Babel, and axios to fulfill our requests.

`yarn add netlify-lambda axios`

### Step 3: creating and saving the lambda function

Create a directory to store the lambda functions to be used. In our case, in `/src/functions`.

### Step 4: setting up the lambda build configuration file

Create the `netlify.toml` file at the root path of the project to map the build destination of our lambdas.

```toml
[build]
functions = "/build/lambda"
```

### Step 5: creating the lambda function

Create your [lambda function](https://github.com/lucasajc/netlify-lambda-create-react-app/blob/master/src/functions/fetchStarWarsCharacterInfo.js). In our case, to fetch Star Wars character information from [SWAPI](https://swapi.co/api/).

### Step 6: testing your lambda

Use `netlify-lambda` to test the lambda locally with:

```
npx netlify-lambda serve /src/functions
```

Access `http://localhost:XXXX/.netlify/functions/{FUNCTION NAME}` to get the lambda function response.

### Step 7: set build scripts

Set the following scripts in package.json:

```json
"scripts": {
  "start:server": "netlify-lambda serve /src/functions",
  "start": "react-scripts start & yarn run start:server",
  "build:functions": "netlify-lambda build /src/functions",
  "build": "react-scripts build && yarn run build:functions",
},
```

### Step 8: add proxy middleware

Add the `http-proxy-middleware` package with the following command:

```
yarn add http-proxy-middleware --dev
```

Then, set up the [setupProxy.js](https://github.com/lucasajc/netlify-lambda-create-react-app/blob/master/src/setupProxy.js) file.

### Step 9: call the lambda function

Develop the lambda function call at the front-end. In our case, in [App.js](https://github.com/lucasajc/netlify-lambda-create-react-app/blob/master/src/App.js) file.

### Step 10: connect and deploy

Connect and deploy your application to Netlify platform following [these instructions](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/).

## License

MIT
