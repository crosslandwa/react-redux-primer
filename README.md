# React-Redux Primer

**What**
One (of many) getting started guides for React/Redux

**Why?**
On a recent work project I started my team down the path of adopting these tools in production. This tutorial is a resource to get those in my team (and in collaborating teams) up to a shared useful base level of understanding of these tools, so we can collaborate and learn together.

It assumes *almost zero* prior exposure to React/Redux (and *nearly zero* exposure to client side JS development) but does assume a degree of programming familiarity, i.e. you should show no fear of `functions`, `types`, `classes`, `objects` etc.

It *does not* aim to be an exhaustive documentation resource for those tools (I'll link out to better docs where appropriate), nor does it promise to offer **the best way** to solve the problems/areas covered...

## How to play along

### Pre-requisites

- Install node (version 6) and npm from here: https://nodejs.org/en/download/
- Install some sort of editor/IDE (I've been pretty happy with [Atom](https://atom.io/))

### Getting started

Get the code
```
git clone git@github.com:crosslandwa/react-redux-primer.git
cd react-redux-primer
npm install
```
then open the react-redux-primer folder in your IDE

Work through the technologies in the links below (note they build on each other so follow them in order) - each section links through to another directory/README in this repo with further steps/resources

**The play along steps throughout this tutorial have been written with the assumption you're using OS X**

## What is covered

- [Webpack/Webpack dev server](webpack)
- [React](react)
- [Redux](redux)
- [Redux and async actions](redux-async)

Once you've covered the four areas above that's it, you're ready to build powerful web apps!

The tutorials above are basic introductions to each area, but give enough context and information to get going. Be sure to check out the linked documentation in each section (generally links to the official docs)

After that, I've collected some thoughts here on [techniques to manage complexity](MANAGING_COMPLEXITY.md) as your application grows
