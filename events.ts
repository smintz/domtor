import { ElementFunction } from "./core";

type Listener = (this: HTMLElement, ev: any) => any;
type Options = boolean | AddEventListenerOptions;
// Events
function OnEvent(type: any, listener: Listener, options?: Options): ElementFunction {
  return (el: HTMLElement) => {
    el.addEventListener(type, listener, options);
    return el;
  };
}

export const OnChange = (listener: Listener, options?: Options) => OnEvent("change", listener, options);
export const OnClick = (listener: Listener, options?: Options) => OnEvent("click", listener, options);
export const OnMouseHover = (listener: Listener, options?: Options) => OnEvent("mouseover", listener, options);
export const OnMouseOut = (listener: Listener, options?: Options) => OnEvent("mouseleave", listener, options);
export const OnFocus = (listener: Listener, options?: Options) => OnEvent("focus", listener, options);
export const OnBlur = (listener: Listener, options?: Options) => OnEvent("blur", listener, options);
export const OnKeyDown = (listener: Listener, options?: Options) => OnEvent("keydown", listener, options);
export const OnKeyUp = (listener: Listener, options?: Options) => OnEvent("keyup", listener, options);
export const OnSubmit = (listener: Listener, options?: Options) => OnEvent("submit", listener, options);
export const OnInput = (listener: Listener, options?: Options) => OnEvent("input", listener, options);
export const OnDblClick = (listener: Listener, options?: Options) => OnEvent("dblclick", listener, options);
export const OnContextMenu = (listener: Listener, options?: Options) => OnEvent("contextmenu", listener, options);
export const OnLoad = (listener: Listener, options?: Options) => OnEvent("load", listener, options);
export const OnUnload = (listener: Listener, options?: Options) => OnEvent("unload", listener, options);
export const OnResize = (listener: Listener, options?: Options) => OnEvent("resize", listener, options);
export const OnScroll = (listener: Listener, options?: Options) => OnEvent("scroll", listener, options);
export const OnDrag = (listener: Listener, options?: Options) => OnEvent("drag", listener, options);
export const OnDrop = (listener: Listener, options?: Options) => OnEvent("drop", listener, options);
