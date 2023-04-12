const { todoList } = require("../todo");

describe("Todo List", () => {
  let todos;

  beforeEach(() => {
    todos = todoList();
  });

  it("can add a new todo", () => {
    const todo = {
      title: "Test Todo",
      dueDate: "2023-04-30",
      completed: false,
    };
    todos.add(todo);
    expect(todos.all).toContain(todo);
  });

  it("can mark a todo as completed", () => {
    const todo = {
      title: "Test Todo",
      dueDate: "2023-04-30",
      completed: false,
    };
    todos.add(todo);
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  it("can retrieve overdue items", () => {
    todos.add({
      title: "Overdue Todo",
      dueDate: "2023-04-01",
      completed: false,
    });
    todos.add({
      title: "Completed Overdue Todo",
      dueDate: "2023-04-01",
      completed: true,
    });
    todos.add({
      title: "Upcoming Todo",
      dueDate: "2023-04-30",
      completed: false,
    });
    const overdue = todos.overdue();
    expect(overdue).toContainEqual({
      title: "Overdue Todo",
      dueDate: "2023-04-01",
      completed: false,
    });
    expect(overdue).not.toContainEqual({
      title: "Completed Overdue Todo",
      dueDate: "2023-04-01",
      completed: true,
    });
    expect(overdue).not.toContainEqual({
      title: "Upcoming Todo",
      dueDate: "2023-04-30",
      completed: false,
    });
  });

  it("can retrieve due today items", () => {
    todos.add({
      title: "Due Today Todo",
      dueDate: new Date().toISOString().split("T")[0],
      completed: false,
    });
    todos.add({
      title: "Completed Due Today Todo",
      dueDate: new Date().toISOString().split("T")[0],
      completed: true,
    });
    todos.add({
      title: "Upcoming Todo",
      dueDate: "2023-04-30",
      completed: false,
    });
    const dueToday = todos.dueToday();
    expect(dueToday).toContainEqual({
      title: "Due Today Todo",
      dueDate: new Date().toISOString().split("T")[0],
      completed: false,
    });
    expect(dueToday).not.toContainEqual({
      title: "Completed Due Today Todo",
      dueDate: new Date().toISOString().split("T")[0],
      completed: true,
    });
    expect(dueToday).not.toContainEqual({
      title: "Upcoming Todo",
      dueDate: "2023-04-30",
      completed: false,
    });
  });

  it("can retrieve due later items", () => {
    todos.add({
      title: "Due Later Todo",
      dueDate: "2023-04-30",
      completed: false,
    });
    todos.add({
      title: "Completed Due Later Todo",
      dueDate: "2023-04-30",
      completed: true,
    });
    todos.add({
      title: "Overdue Todo",
      dueDate: "2023-04-01",
      completed: false,});
