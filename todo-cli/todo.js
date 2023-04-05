const todoList = () => {
  const all = [];
  
  const add = (todoItem) => {
    all.push(todoItem);
  };
  
  const markAsComplete = (index) => {
    all[index].completed = true;
  };
  
  const overdue = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter(todo => !todo.completed && todo.dueDate < today);
  };
  
  const dueToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter(todo => !todo.completed && todo.dueDate === today);
  };
  
  const dueLater = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter(todo => !todo.completed && todo.dueDate > today);
  };
  
  const toDisplayableList = (list) => {
    let displayableList = "";
    for (let item of list) {
      let checkbox = item.completed ? "[x]" : "[ ]";
      let title = item.title;
      let dueDate = "";
      if (item.dueDate === new Date().toISOString().split("T")[0]) {
        dueDate = "Today";
      } else if (item.dueDate < new Date().toISOString().split("T")[0]) {
        dueDate = item.dueDate;
      } else {
        dueDate = item.dueDate;
      }
      displayableList += `${checkbox} ${title} ${dueDate}\n`;
    }
    return displayableList;
  };
  
  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList
  };
};

const todos = todoList();

todos.add({ title: 'Submit assignment', dueDate: '2022-07-21', completed: false });
todos.add({ title: 'Pay rent', dueDate: '2023-04-05', completed: true });
todos.add({ title: 'Service vehicle', dueDate: '2023-04-05', completed: false });
todos.add({ title: 'File taxes', dueDate: '2022-07-23', completed: false });
todos.add({ title: 'Pay electric bill', dueDate: '2022-07-23', completed: false });

const overdueList = todos.overdue();
const todayList = todos.dueToday();
const laterList = todos.dueLater();

const formattedOverdueList = todos.toDisplayableList(overdueList);
const formattedTodayList = todos.toDisplayableList(todayList);
const formattedLaterList = todos.toDisplayableList(laterList);

console.log("My Todo-list\n");
console.log("Overdue");
console.log(formattedOverdueList);
console.log("\n");
console.log("Due Today");
console.log(formattedTodayList);
console.log("\n");
console.log("Due Later");
console.log(formattedLaterList);
console.log("\n");
