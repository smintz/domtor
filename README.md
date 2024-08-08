# Domtor Library

Domtor is a library for creating structured, reusable UI components with a functional approach.

## Motivation

There was no motivation for writing this actually. I inherit a code base with simple javascript without any use of React or any other UI framework, so I started to build simple functions to make my life easier and ended up with this.

## Table of Contents

1. [Creating a Basic HTML Element](#creating-a-basic-html-element)
2. [Adding Classes, Applying Styles, and Setting Attributes](#adding-classes-applying-styles-and-setting-attributes)
3. [Attaching Events to Elements](#attaching-events-to-elements)
4. [Using ContextManager to Re-write Elements](#using-contextmanager-to-re-write-elements)

## Creating a Basic HTML Element

To create a basic HTML element and add it to the DOM, you can use the `Div`, `Span`, `Button`, etc., functions provided by Domtor.

### Example

```typescript
import { Text } from "domtor/core";
import { Div } from "domtor/base";

const element = Div(Text("Hello, World!"));

document.getElementById("app").replaceChildren(element);
```

This will create a `div` element containing the text "Hello, World!" and append it to the element with the ID `app`.

## Adding Classes, Applying Styles, and Setting Attributes

You can add classes, apply styles, and set attributes to elements using the `AddClass`, `ApplyStyle`, and `SetAttr` functions.

### Example

```typescript
import { Div, Text, AddClass, ApplyStyle, SetAttr } from "domtor/core";
import { Div } from "domtor/base";

const element = Div(
  AddClass("my-class"),
  ApplyStyle({ color: "red", fontSize: "20px" }),
  SetAttr({ id: "my-element" }),
  Text("Styled Element")
);

document.getElementById("app").replaceChildren(element);
```

This will create a `div` element with the class `my-class`, red text color, font size of 20px, and an ID of `my-element`.

## Attaching Events to Elements

You can attach events to elements using the `OnClick`, `OnChange`, etc., functions.

### Example

```typescript
import { Div, Button } from "domtor/base";
import { OnClick } from "domtor/events";
import { Text } from "domtor/core";

const handleClick = () => {
  alert("Button clicked!");
};

const element = Div(Button(OnClick(handleClick), Text("Click Me")));

document.getElementById("app").replaceChildren(element);
```

This will create a button that shows an alert when clicked.

## Using ContextManager to Re-write Elements

The ContextManager allows you to manage and re-write elements dynamically.

### Example

```typescript
import { Div, Button } from "domtor/base";
import { Context, ContextManager } from "domtor/context";

type CounterContext = Context & { count: number };

const App: ContextFunction = (ctx) =>
  Div(
    Text(`Count: ${ctx.count}`),
    Button(
      OnClick((e) => {
        ctx.dispatch({ count: ctx.count + 1 });
      }),
      Text("Increment")
    )
  );

const context = ContextManager(
  App,

  // Register external Dispatchers which can dispatch an update to the context and trigger a re-render of the component. see CommonDispatcher code for inspiration.
  Dispatcher((ctx, next) => {
    return next(ctx);
  }),
  // Add mutators which can manipulate the context, store/load it validate it etc.
  Mutator(async (ctx, next) => {
    // Get context from localStorage or initialize the context
    const ctxStr = localStorage.getItem("ctx") || "{count: 0}";

    // Run the next Mutator in the chain
    ctx = await next(Object.assign(ctx, JSON.parse(ctxStr)));

    // Store the context in localStorage
    localStorage.setItem("ctx", JSON.stringify(ctx));
    return ctx;
  }),
  // Add Render hooks to run logic around the re-rendering of the element, you can
  // use Renderers to cancel re-rendering or to run some post-rendering functions
  Renderer((ctx, next) => {
    if (ctx.cancelRendering) {
      console.log("re-rendering was canceled");
      return ctx;
    } else {
      ctx = next(ctx);
      alert("element was re-rendered");
    }
    return ctx;
  })
);

document.getElementById("app").replaceChildren(context);
```

This will create a counter that increments when the button is clicked, demonstrating how to use `ContextManager` to manage state and re-write elements.

### Conclusion

Domtor provides a functional approach to creating and managing UI components.

### License

This project is licensed under the MIT License. See the [LICENSE] file for more details.
