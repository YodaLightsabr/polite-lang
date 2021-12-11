# PoLite lang

Be more polite while you code with PoLite lang. PoLite lang is the polite superset of JavaScript.

## Install
```sh
npm i -g polite-lang
```

## Usage
Compile
```sh
politec main.po
```

## Features

### Just use your words
Want to declare a function?
```js
please create function main with no arguments and the code
  /* Hello :) */
ok
```

Want to set a variable or a constant?
```js
please set variable foo to 'foo'
please set constant bar to 'bar'
```

Want to call a function?
```js
run function foo with no arguments.
```

### Express yourself
As much as you want to uwu and owo in your JavaScript code, you just can't. PoLite lang changes that. (Note: Requires `--uwu-safe` flag and restricts variable naming)
```js
uwu please create function main uwu with no arguments owo and the code
  /* Hello :) */
ok
```

### Use complex data types
You can use objects.
```js
please set variable object to a group of things (
  foo is 'bar', and
  bar is 'foo'
)
run function println with arguments foo from object.
/* prints 'bar' */
```

You can use arrays.
```js
please set variable object to a list of things (
  'foo', and 'bar'
)
```

### Loops, ifs, logic, and math
Run a loop.
```js
create loop and check index is less than 10 and on every iteration do
  run function println with arguments index.
ok
```

Use an if.
```js
if foo equals bar then do
  run function println with arguments "They are equal".
ok
```

Use standard JavaScript math and logic.
```js
if math(foo == bar) then do
  run function println with arguments "They are equal".
ok
```

### Use it like a normal language
Like all real languages, PoLite lang has some special and seemingly random rules to follow to make it feel more realistic. For example, you must use `please` when you're defining a variable or a function. PoLite lang also only uses characters you would find in a written text, such as `, () . "`.

### ...and LOTS more

If there's a missing feature, feel free to make a pull request.


## Politefile
The Politefile is a way to configure the compilation of PoLite lang. You can add flags from the Politefile, as well as configure the compilation target.

To use one, follow this syntax:
```
[key]
value1, optionalValue2, optionalValue3, etc

[key2]
value1, optionalValue2, optionalValue3, etc
```