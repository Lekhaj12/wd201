const todoList = () => {
  all = []
  const add = (todoItem) => {
    all.push(todoItem)
  }
  const markAsComplete = (index) => {
    all[index].completed = true
  }

  const overdue = () => {
    const today = new Date();
    return all.filter(item => item.dueDate < today && !item.completed);
  }

  const dueToday = () => {
    const today = new Date();
    return all.filter(item => item.dueDate.toDateString() === today.toDateString() && !item.completed);
  }

  const dueLater = () => {
    const today = new Date();
    return all.filter(item => item.dueDate > today && !item.completed);
  }

  const toDisplayableList = (list) => {
    return list.map((item, index) => {
      const checkbox = item.completed ? "[x]" : "[ ]";
      return `${checkbox} ${item.title} ${item.dueDate.toISOString().split("T")[0]}`;
    }).join("\n");
  }

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

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

todos.add({ title: 'Submit assignment', dueDate: new Date('2022-07-21'), completed: false })
todos.add({ title: 'Pay rent', dueDate: new Date(), completed: true })
todos.add({ title: 'Service vehicle', dueDate: new Date(), completed: false })
todos.add({ title: 'File taxes', dueDate: new Date('2022-07-23'), completed: false })
todos.add({ title: 'Pay electric bill', dueDate: new Date('2022-07-23'), completed: false })

console.log("My Todo-list\n");

console.log("Overdue");
var overdues = todos.overdue();
var formattedOverdues = todos.toDisplayableList(overdues);
console.log(formattedOverdues);
console.log("\n");

console.log("Due Today");
let itemsDueToday = todos.dueToday();
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
console.log(formattedItemsDueToday);
console.log("\n");

console.log("Due Later");
let itemsDueLater = todos.dueLater();
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);
console.log(formattedItemsDueLater);
console.log("\n\n");
