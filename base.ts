import { Tag, SetAttr } from "./core";

// HTML Elements
export const A = Tag("a");
export const Abbr = Tag("abbr");
export const Address = Tag("address");
export const Area = Tag("area");
export const Article = Tag("article");
export const Aside = Tag("aside");
export const Audio = Tag("audio");
export const B = Tag("b");
export const Base = Tag("base");
export const Bdi = Tag("bdi");
export const Bdo = Tag("bdo");
export const Blockquote = Tag("blockquote");
export const Body = Tag("body");
export const Br = Tag("br");
export const Button = Tag("button");
export const Canvas = Tag("canvas");
export const Caption = Tag("caption");
export const Cite = Tag("cite");
export const Code = Tag("code");
export const Col = Tag("col");
export const Colgroup = Tag("colgroup");
export const Data = Tag("data");
export const Datalist = Tag("datalist");
export const Dd = Tag("dd");
export const Del = Tag("del");
export const Details = Tag("details");
export const Dfn = Tag("dfn");
export const Dialog = Tag("dialog");
export const Div = Tag("div");
export const Dl = Tag("dl");
export const Dt = Tag("dt");
export const Em = Tag("em");
export const Embed = Tag("embed");
export const Fieldset = Tag("fieldset");
export const Figcaption = Tag("figcaption");
export const Figure = Tag("figure");
export const Footer = Tag("footer");
export const Form = Tag("form");
export const H1 = Tag("h1");
export const H2 = Tag("h2");
export const H3 = Tag("h3");
export const H4 = Tag("h4");
export const H5 = Tag("h5");
export const H6 = Tag("h6");
export const Head = Tag("head");
export const Header = Tag("header");
export const Hgroup = Tag("hgroup");
export const Hr = Tag("hr");
export const Html = Tag("html");
export const I = Tag("i");
export const Iframe = Tag("iframe");
export const Img = (src, ...fns) => Tag("img")(SetAttr("src", src), ...fns);
export const Input = Tag("input");
export const Ins = Tag("ins");
export const Kbd = Tag("kbd");
export const Label = Tag("label");
export const Legend = Tag("legend");
export const Li = Tag("li");
export const Link = Tag("link");
export const Main = Tag("main");
export const Map = Tag("map");
export const Mark = Tag("mark");
export const Meta = Tag("meta");
export const Meter = Tag("meter");
export const Nav = Tag("nav");
export const Noscript = Tag("noscript");
export const Object = Tag("object");
export const Ol = Tag("ol");
export const Optgroup = Tag("optgroup");
export const Option = Tag("option");
export const Output = Tag("output");
export const P = Tag("p");
export const Picture = Tag("picture");
export const Pre = Tag("pre");
export const Progress = Tag("progress");
export const Q = Tag("q");
export const Rp = Tag("rp");
export const Rt = Tag("rt");
export const Ruby = Tag("ruby");
export const S = Tag("s");
export const Samp = Tag("samp");
export const Script = Tag("script");
export const Section = Tag("section");
export const Select = Tag("select");
export const Slot = Tag("slot");
export const Small = Tag("small");
export const Source = Tag("source");
export const Span = Tag("span");
export const Strong = Tag("strong");
export const Style = Tag("style");
export const Sub = Tag("sub");
export const Summary = Tag("summary");
export const Sup = Tag("sup");
export const Table = Tag("table");
export const Tbody = Tag("tbody");
export const Td = Tag("td");
export const Template = Tag("template");
export const Textarea = Tag("textarea");
export const Tfoot = Tag("tfoot");
export const Th = Tag("th");
export const Thead = Tag("thead");
export const Time = Tag("time");
export const Title = Tag("title");
export const Tr = Tag("tr");
export const Track = Tag("track");
export const U = Tag("u");
export const Ul = Tag("ul");
export const Var = Tag("var");
export const Video = Tag("video");
export const Wbr = Tag("wbr");
