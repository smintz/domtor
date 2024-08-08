export type ContextDispatch = (ctx: Context) => Context | Promise<Context>;
export type Context = {
  dispatch: ContextDispatch;
  dispatchFunc: (dispatchFn: ContextDispatch) => void;
};
export type ContextFunction = (ctx: Context) => HTMLElement;
export type ContextHookNextFunction = (ctx: Context) => Context;
export type ContextHookFunction = (
  ctx: Context,
  next: ContextHookNextFunction
) => Context;
export type ContextHook = {
  ContextDispatcher?: ContextHookFunction;
  ContextMutator?: ContextHookFunction;
  ContextRenderer?: ContextHookFunction;
};

const noop = (fn: ContextHookFunction | undefined) => {
  return fn ? fn : (ctx: Context, next: ContextHookNextFunction) => next(ctx);
};
type ContextHooks = ContextHook[];
/**
 * Creates a context manager that handles dispatching and rendering based on provided hooks.
 *
 * @param {...Object} hooks - The hooks to be used for context mutators, renderers, and dispatchers.
 * @returns {HTMLElement} - The created context manager element.
 */
export const ContextManager = (
  fn: ContextFunction,
  ...hooks: ContextHooks
): HTMLElement => {
  let el = document.createElement("div");
  let ctx: Context = {
    dispatch: (ctx) => ctx,
    dispatchFunc: (ctx) => ctx,
  };

  const dispatchFunc = async (dispatchFn: ContextDispatch) => {
    let mutators = hooks.filter((hook) => hook.ContextMutator);
    mutators.push(
      Mutator(async (newCtx: Context, _: ContextHookFunction) => {
        return dispatchFn(newCtx);
      })
    );
    ctx = await Chain(
      ...mutators.map(
        (hook: ContextHook): ContextHookFunction => noop(hook.ContextMutator)
      )
    )(ctx);
    let renderers = hooks.filter((hook) => hook.ContextRenderer);
    renderers.push(
      Renderer((c: Context, _: ContextFunction) => {
        return new Promise((resolve, reject) => {
          const newEl = fn(c);
          el.replaceChildren(newEl);
          resolve(newEl);
        });
      })
    );
    Chain(
      ...renderers.map(
        (hook: ContextHook): ContextHookFunction => noop(hook.ContextRenderer)
      )
    )(ctx); //tslint:disable-line
    return ctx;
  };

  const dispatch = (newCtx: Context) => {
    return dispatchFunc((incomingCtx: Context) => {
      const ret = Object.assign({}, incomingCtx, newCtx);
      ret.dispatch = incomingCtx.dispatch;
      ret.dispatchFunc = incomingCtx.dispatchFunc;
      return ret;
    });
  };

  ctx = Object.assign({}, ctx, {
    dispatch: dispatch,
    dispatchFunc: dispatchFunc,
  });

  const dispatchers = hooks.filter((hook) => hook.ContextDispatcher);
  const newCtx = Chain(
    ...dispatchers.map(
      (hook: ContextHook): ContextHookFunction => noop(hook.ContextDispatcher)
    )
  )(ctx);
  if (newCtx instanceof Promise) {
    newCtx.then((c) => {
      dispatch(c);
    });
  } else {
    dispatch(newCtx);
  }

  return el;
};

/**
 * Creates a Dispatcher object.
 */
export const Dispatcher = (callback: ContextHookFunction): ContextHook => {
  return {
    ContextDispatcher: callback,
  };
};

/**
 * Represents a common dispatcher.
 * @returns {Object} The common dispatcher object.
 */
export const CommonDispatcher = () => {
  let localDispatch = (_) => {
    console.error("dispatcher hook not ran yet");
  };
  let localDispatchFunc = (_) => {
    console.error("dispatcher hook not ran yet");
  };
  return {
    Hook: Dispatcher((ctx, next) => {
      localDispatch = ctx.dispatch;
      localDispatchFunc = ctx.dispatchFunc;
      return next(ctx);
    }),
    dispatch: (ctx) => {
      localDispatch(ctx);
    },
    dispatchFunc: (dispatchFn) => {
      localDispatchFunc(dispatchFn);
    },
  };
};

export const DispatcherGroup = (...dispatchers) => {
  return {
    add: (dispatcher) => {
      dispatchers.push(dispatcher);
    },
    dispatch: (ctx) => {
      dispatchers.forEach((dispatcher) => {
        dispatcher.dispatch(ctx);
      });
    },
    dispatchFunc: (dispatchFn) => {
      dispatchers.forEach((dispatcher) => {
        dispatcher.dispatchFunc(dispatchFn);
      });
    },
  };
};

export const Mutator = (callback) => {
  return {
    ContextMutator: callback,
    Noop: (ctx, next) => next(ctx),
  };
};

export const DebugMutator = (prefix) =>
  Mutator((ctx, next) => {
    console.log(prefix, "before mutating", ctx);
    ctx = next(ctx);
    console.log(prefix, "after mutating", ctx);
    return ctx;
  });

export const EventMutator = Mutator((ctx, next) => {
  ctx.OnEvent =
    (event, ...callbacks) =>
    (el) => {
      el.addEventListener(event, () => {
        for (const callback of callbacks) {
          callback(ctx);
        }
      });
      return el;
    };
  ctx.OnChange = (...callbacks) => ctx.OnEvent("change", ...callbacks);
  ctx.OnClick = (...callbacks) => ctx.OnEvent("click", ...callbacks);
  ctx.OnMouseHover = (...callbacks) => ctx.OnEvent("mouseover", ...callbacks);
  ctx.OnMouseOut = (...callbacks) => ctx.OnEvent("mouseleave", ...callbacks);
  return next(ctx);
});

export const Renderer = (callback) => {
  return {
    ContextRenderer: callback,
    Noop: (ctx, next) => next(ctx),
  };
};

function Chain(...funcList: ContextHookFunction[]): ContextDispatch {
  funcList = funcList.filter((fn) => fn);
  if (funcList.length === 0) {
    return (obj) => obj;
  }
  return function (initialObject) {
    // Helper function to execute the next function in the list
    function executeNext(index, obj) {
      if (index < funcList.length) {
        // Call the current function with the object and a function to execute the next one
        return funcList[index](obj, () => executeNext(index + 1, obj));
      } else {
        // When the end of the function list is reached, return the mutated object
        return obj;
      }
    }
    // Start the chain with the first function and the initial object
    return executeNext(0, initialObject);
  };
}
