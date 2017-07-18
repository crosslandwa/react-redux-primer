# Webpack and Webpack Dev server

Webpack is primarily a build tool to **bundle** your application into a few small files to minimise the amount of JS the browser has to download.

Why do we need it...

## Step 1 - Many <script>s

Here our app across multiple HTML/Javascript files (where the JS is loaded via <script> tags)

- Open index.html in your browser
- Reduce the timeout time in indexA.js and break the app

Note how this implementation introduces the following [connasences](https://en.wikipedia.org/wiki/Connascence_(computer_programming))
- Connascence of name (global function names)
- Connascence of execution/timing (code in indexA.js is dependent on code in halloWeltA.js having executed)

## Step 2 - Declaring dependencies...

- Run indexB.js in node
  - ```node indexB.js```

Everything is cool! indexB.js has explicitly brought in it's dependencies through use of node's `require` function

*Note that `require` is [one of many ways](https://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs) to declare and bring in dependencies in JS, but we'll stick with it for this tutorial*

## Step 3 - ...and making them work in the browser...

- Modify index.html to bring in only indexB.js
- Reload index.html in the browser
- Be sad because `require` doesn't work (check your browser's dev tools)...

But fear not **webpack to the rescue!**
- Use webpack to create a bundle of all your JS
  - ```../node_modules/webpack/bin/webpack.js --entry ./indexB.js --output-filename bundle.js```
- Update index.html to load your new bundled application JS

## Step 4 - ...with a rocket powered development cycle

Webpack dev server is an add on for webpack that adds some real nice tooling to aid your development flow. At it's simplest it combines
- a webserver to serve up your application whilst you develop it *(note so far we've been opening our HTML via file:// in our browser)*
- a tool to automatically rebuild your app when changes occur

Let's fire it up
- ```../node_modules/webpack-dev-server/bin/webpack-dev-server.js  --entry ./indexB.js --output-filename bundle.js```
- open the output URL in your browser
- make some edits to indexB.js or halloweltB.js - see them take effect in your browser without even reloading the page!

## Summary

At it's simplest, webpack is a tool for **bundling** all your application's javascript into a single file for distribution to client browsers. It can do much much much much more, including
 - build time transpilation (we'll touch on this in the React section of this tutorial)
 - bundling other assets (CSS, images, fonts, etc) into your applications JS!
 - minification
 - splitting your app into multiple JS files to optimize browser loading

Both webpack and it's dev-server can take command line options (as we've done here), but is typically used with a JS config file (`webpack.config.js` by default). All subsequent usage in this tutorial will be via config files

There's loads more about webpack (and it's dev server) here: https://webpack.js.org/
