const todoList = () => {
  all = []
  const add = (todoItem) => {
    all.push(todoItem)
  }
  const markAsComplete = (index) => {
    all[index].completed = true
  }

  const overdue = () => {
    const today = new Date()
    return all.filter(item => !item.completed && new Date(item.dueDate) < today)
  }

  const dueToday = () => {
    const today = new Date()
    return all.filter(item => !item.completed && new Date(item.dueDate).toDateString() === today.toDateString())
  }

  const dueLater = () => {
    const today = new Date()
    return all.filter(item => !item.completed && new Date(item.dueDate) > today)
  }

  const toDisplayableList = (list) => {
    let displayableList = ""
    list.forEach((item, index) => {
      const checkbox = item.completed ? "[x]" : "[ ]"
      const title = item.title
      const dueDate = formattedDate(new Date(item.dueDate))
      displayableList += `${index + 1}. ${checkbox} ${title} ${dueDate}\n`
    })
    return displayableList
  }

  const formattedDate = (date) => {
    return date.toISOString().split("T")[0]
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

const formattedDate = d => {
  return d.toISOString().split("T")[0]
}

todos.add({ title: 'Submit assignment', dueDate: '2023-04-04', completed: false })
todos.add({ title: 'Pay rent', dueDate: formattedDate(new Date()), completed: true })
todos.add({ title: 'Service Vehicle', dueDate: formattedDate(new Date()), completed: false })
todos.add({ title: 'File taxes', dueDate: '2023-04-06', completed: false })
todos.add({ title: 'Pay electric bill', dueDate: '2023-04-06', completed: false })

console.log("My Todo-list\n")

console.log("Overdue")
var overdues = todos.overdue()
var formattedOverdues = todos.toDisplayableList(overdues)
console.log(formattedOverdues)
console.log("\n")

console.log("Due Today")
let itemsDueToday = todos.dueToday()
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
console.log(formattedItemsDueToday)
console.log("\n")

console.log("Due Later")
let itemsDueLater = todos.dueLater()
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
console.log(formattedItemsDueLater)
console.log("\n\n")
