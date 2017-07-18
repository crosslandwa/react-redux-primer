# Webpack and Webpack Dev server

Webpack is primarily a build tool to **bundle** your application into a few small files to minimise the amount of JS the browser has to download.

Why do we need it...

## Step 1 - Many <script>s

Here our app across multiple HTML/Javascript files (where the JS is loaded via <script> tags)

- Open webpack/indexA.html in your browser
- Reduce the timeout time in webpack/indexA.js and break the app

Note how this implementation introduces the following [connasences](https://en.wikipedia.org/wiki/Connascence_(computer_programming))
- Connascence of name (global function names)
- Connascence of execution/timing (code in indexA.js is dependent on code in halloWeltA.js having executed)

## Step 2 - Declaring dependencies...

- Run nodeIndexB.js in node with: ```node nodeIndexB.js```

Everything is cool! nodeIndexB.js has explicitly brought in it's dependencies through use of node's `require` function

*Note that `require` is [one of many ways](https://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs) to declare and bring in dependencies in JS, but we'll stick with it for this tutorial*

## Step 3 - ...and making them work in the browser...

- Open indexB.html in the browser
- Be sad because `require` doesn't work...

## Step 4 - ...with a rocket powered development cycle

### Webpack
 - JS script in page (drawing some DOM, maybe with a setTimeout)
 - Why do we split scripts? Why require not multiple <script> tags?
 - No require in the browser
 - Webpack is a bundler, myApp.js -> bundle.js

### Webpack dev server
 - hot reloading

## Much more info

https://webpack.js.org/
