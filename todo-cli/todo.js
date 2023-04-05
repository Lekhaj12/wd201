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
    return all.filter(item => !item.completed && new Date(item.dueDate) <= today && new Date(item.dueDate) >= today)
  }

  const dueLater = () => {
    const today = new Date()
    return all.filter(item => !item.completed && new Date(item.dueDate) > today)
  }

  const toDisplayableList = (list) => {
    let displayableList = ''
    let overdueItems = list.filter(item => !item.completed)
    let completedItems = list.filter(item => item.completed)
    if (overdueItems.length > 0) {
      displayableList += 'Overdue\n'
      overdueItems.forEach(item => {
        displayableList += `[ ] ${item.title} ${formattedDate(new Date(item.dueDate))}\n`
      })
      displayableList += '\n'
    }
    if (list.length > 0) {
      displayableList += 'Due Today\n'
      list.forEach(item => {
        if (!item.completed && new Date(item.dueDate) <= today && new Date(item.dueDate) >= today) {
          const status = item.completed ? 'x' : ' '
          displayableList += `[${status}] ${item.title}\n`
        }
      })
      displayableList += '\n'

      displayableList += 'Due Later\n'
      list.forEach(item => {
        if (!item.completed && new Date(item.dueDate) > today) {
          displayableList += `[ ] ${item.title} ${formattedDate(new Date(item.dueDate))}\n`
        }
      })
      displayableList += '\n'
    }
    return displayableList
  }

  const formattedDate = d => {
    return d.toISOString().split("T")[0]
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

const todos = todoList();

const today = new Date().toISOString().split("T")[0];
const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split("T")[0];
const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];

todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
todos.add({ title: 'Pay rent', dueDate: today, completed: true })
todos.add({ title: 'Service vehicle', dueDate: today, completed: false })
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })

const overdues = todos.overdue()
const formattedOverdues = todos.toDisplayableList(overdues)

const dueTodayList = todos.dueToday()
const formattedDueTodayList = todos.toDisplayableList(dueTodayList)

const dueLaterList = todos.dueLater()
const formattedDueLaterList = todos.toDisplayableList(dueLaterList)
