// Test Case 1: CoreElement with child elements
const div = document.createElement("div");
const span = document.createElement("span");
const p = document.createElement("p");

const result1 = CoreElement(div, span, p);
console.log(result1); // Output: <div><span></span><p></p></div>

// Test Case 2: CoreElement with applied functions
const div2 = document.createElement("div");

const addClassFn = AddClass("red");
const textFn = Text("Hello, World!");
const applyStyleFn = ApplyStyle({ backgroundColor: "blue" });

const result2 = CoreElement(div2, addClassFn, textFn, applyStyleFn);
console.log(result2); // Output: <div class="red">Hello, World!</div>

// Test Case 3: CoreElement with both child elements and applied functions
const div3 = document.createElement("div");
const span2 = document.createElement("span");

const addClassFn2 = AddClass("blue");
const textFn2 = Text("Hello, GitHub Copilot!");

const result3 = CoreElement(div3, span2, addClassFn2, textFn2);
console.log(result3); // Output: <div><span class="blue">Hello, GitHub Copilot!</span></div>
// Test Case 4: Tag with no applied functions
const result4 = Tag("div")();
console.log(result4); // Output: <div></div>

// Test Case 5: Tag with applied functions
const addClassFn3 = AddClass("red");
const textFn3 = Text("Hello, Tag!");

const result5 = Tag("span")(addClassFn3, textFn3);
console.log(result5); // Output: <span class="red">Hello, Tag!</span>

// Test Case 6: Tag with multiple applied functions
const addClassFn4 = AddClass("blue");
const applyStyleFn2 = ApplyStyle({ backgroundColor: "yellow" });

const result6 = Tag("p")(addClassFn4, applyStyleFn2);
console.log(result6); // Output: <p class="blue" style="background-color: yellow;"></p>
