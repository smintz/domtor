import { OnSubmit, OnClick } from "domtor/events";
import {
  Div,
  Button,
  Input,
  Ul,
  Li,
  Form,
  Section,
  Header,
  H2,
  Dl,
  Dd,
  Dt,
} from "domtor/base";
import { SetAttr, Text, AddClass, HTML } from "domtor/core";
import {
  ContextManager,
  Mutator,
  Context,
  ContextFunction,
} from "domtor/context";
// State
type Task = { text: string; completed: boolean };
type TasksContext = Context & {
  tasks?: Task[];
};

// Render Functions
const renderTask = (ctx: TasksContext) => (task: Task) => {
  return Li(
    AddClass(
      "flex"
      // "w-full"
    ),
    Div(
      AddClass(
        "hover:bg-blue-500",
        "hover:ring-blue-500",
        "hover:shadow-md",
        "group",
        "rounded-md",
        "p-3",
        "bg-white",
        "ring-1",
        "ring-slate-200",
        "shadow-sm",
        "w-full"
      ),
      Dl(
        AddClass("flex", "sm:grid", "lg:grid", "xl:block", "items-center"),
        Div(
          Dt(AddClass("sr-only"), Text("Task:")),
          Dd(
            AddClass(
              "hover:text-slate-400",
              "group-hover:text-white",
              "font-semibold",
              "text-slate-900",
              "col-span-3"
            ),
            task.completed ? AddClass("line-through") : AddClass(),
            Text(task.text)
          )
        ),
        Div(
          AddClass(
            "flex",
            "items-center",
            "justify-end",
            "space-x-2",
            "content-bottom",
            "content-right"
          ),
          Button(
            task.completed
              ? HTML(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
<path stroke-linecap="round" stroke-linejoin="round" d="m15 15-6 6m0 0-6-6m6 6V9a6 6 0 0 1 12 0v3" />
</svg>
`)
              : HTML(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
`),
            AddClass(
              "group-hover:text-white",
              "group-hover:ring-white",
              "w-8",
              "h-8",
              "p-1",
              "rounded-full",
              "ring-2",
              "ring-black",
              "content-right"
            ),
            OnClick(() =>
              ctx.dispatchFunc((incomingCtx: TasksContext) => {
                incomingCtx.tasks = incomingCtx.tasks?.map((t) => {
                  if (t.text === task.text) {
                    t.completed = !t.completed;
                  }
                  return t;
                });
                return incomingCtx;
              })
            )
          ),
          Button(
            AddClass(
              "group-hover:text-white",
              "group-hover:bg-blue-500",
              "group-hover:ring-white",
              "w-8",
              "h-8",
              "p-1",
              "rounded-full",
              "ring-2",
              "ring-black"
            ),
            HTML(
              `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"> <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /> </svg>`
            ),
            OnClick(() =>
              ctx.dispatchFunc((incomingCtx: TasksContext) => {
                incomingCtx.tasks = incomingCtx.tasks?.filter(
                  (t) => t.text !== task.text
                );
                return incomingCtx;
              })
            )
          )
        )
      )
    )
  );
};

const TodoApp: ContextFunction = (ctx: TasksContext) => {
  console.log(ctx);
  return Div(
    AddClass("mx-auto", "max-w-7xl", "py-6", "px-4", "sm:px-6", "lg:px-8"),
    Section(
      AddClass("rounded-xl", "shadow"),
      Header(
        AddClass(
          "bg-white",
          "space-y-4",
          "p-4",
          "sm:px-8",
          "sm:py-6",
          "lg:p-4",
          "xl:px-8",
          "xl:py-6",
          "rounded-t-xl",
          "shadow-sm"
        ),
        Div(
          AddClass("flex", "items-center", "justify-between"),
          H2(AddClass("font-semibold", "text-slate-900"), Text("Todo List"))
        ),
        NewTask(ctx)
      ), // Header
      Ul(
        AddClass(
          "bg-slate-50",
          "p-4",
          "sm:px-8",
          "sm:pt-6",
          "sm:pb-8",
          "lg:p-4",
          "xl:px-8",
          "xl:pt-6",
          "xl:pb-8",
          "grid",
          "grid-cols-1",
          "sm:grid-cols-2",
          "lg:grid-cols-3",
          "xl:grid-cols-4",
          "gap-4",
          "text-sm",
          "leading-6",
          "rounded-b-xl"
        ),
        ...(ctx.tasks || []).map(renderTask(ctx))
      )
    )
  );
};

// Initial Render
const NewTask = (ctx: TasksContext) =>
  Div(
    Form(
      AddClass("flex", "flex-row"),
      OnSubmit((e) => {
        e.preventDefault();
        ctx.dispatchFunc((incomingCtx: TasksContext) => {
          const newTask = {
            text: e.target.querySelector("#taskInput").value,
            completed: false,
          };
          incomingCtx.tasks?.push(newTask);
          return incomingCtx;
        });
        return false;
      }),
      Input(
        SetAttr("id", "taskInput"),
        SetAttr("placeholder", "Enter a new task..."),
        AddClass(
          "focus:ring-2",
          "focus:ring-blue-500",
          "focus:outline-none",
          "appearance-none",
          "basis-5/6",
          "w-full",
          "text-sm",
          "leading-6",
          "text-slate-900",
          "placeholder-slate-400",
          "rounded-md",
          "pl-4",
          "m-5",
          "ring-1",
          "ring-slate-200",
          "shadow-sm"
        )
      ),
      Button(
        AddClass(
          "hover:bg-blue-400",
          "group",
          "flex",
          "items-center",
          "rounded-md",
          "bg-blue-500",
          "text-white",
          "text-sm",
          "center",
          "font-medium",
          "pl-2",
          "pr-3",
          "py-2",
          "m-5",
          "shadow-sm"
        ),
        Text("Add Task")
      )
    )
  );

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  if (main) {
    main.appendChild(
      ContextManager(
        TodoApp,
        Mutator(async (ctx, next) => {
          const ctxStr = localStorage.getItem("ctx") || "{}";
          ctx = await next(Object.assign(ctx, JSON.parse(ctxStr)));
          localStorage.setItem("ctx", JSON.stringify(ctx));
          return ctx;
        }),
        Mutator((ctx, next) => {
          ctx.tasks = ctx.tasks || [{ text: "hello", completed: false }];
          return next(ctx);
        })
      )
    );
  }
});
