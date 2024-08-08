export type ElementFunction = (el: HTMLElement) => HTMLElement;
export type ElementInput = HTMLElement | ElementFunction;
export type ElementInputs = ElementInput[];

/**
 * Creates a core element and appends child elements or applies functions to it.
 */
export const CoreElement = (el: HTMLElement, ...fns: ElementInputs) => {
  fns.forEach((fn) => {
    if (fn instanceof HTMLElement) {
      el.appendChild(fn);
      return el;
    } else {
      return fn(el);
    }
  });
  return el;
};

/**
 * Creates a higher-order function that generates a CoreElement with the specified tag.
 */
export const Tag =
  (tag: keyof HTMLElementTagNameMap) =>
  (...fns: ElementInputs) =>
    CoreElement(document.createElement(tag), ...fns);

/**
 * Sets an attribute on an element.
 */
export const SetAttr =
  (k: string, v: string): ElementFunction =>
  (el: HTMLElement) => {
    el.setAttribute(k, v);
    return el;
  };

/**
 * Adds one or more CSS classes to an element.
 *
 * @param {...string} c - The CSS classes to add.
 * @returns {ElementFunction} A function that accepts an element and adds the CSS classes to it.
 */
export function AddClass(...c: string[]): ElementFunction {
  return (el: HTMLElement) => {
    el.classList.add(...c);
    return el;
  };
}

/**
 * Removes one or more CSS classes from an element's class list.
 */
export function RmClass(...c: string[]): ElementFunction {
  return (el) => {
    el.classList.remove(...c);
    return el;
  };
}

/**
 * Creates a text node and appends it to the given element.
 */
export function Text(text: string): ElementFunction {
  return (el) => {
    el.appendChild(document.createTextNode(text));
    return el;
  };
}

/**
 * Applies the given style object to an element.
 *
 */
export function ApplyStyle(
  style: Partial<CSSStyleDeclaration>
): ElementFunction {
  return (el) => {
    Object.assign(el.style, style);
    return el;
  };
}

export function HTML(html: string): ElementFunction {
  return (el) => {
    el.innerHTML = html;
    return el;
  };
}

export const Macro =
  (...fns: ElementInputs): ElementFunction =>
  (el) =>
    CoreElement(el, ...fns);
