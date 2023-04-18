function todoList() {
  const list = [];

  function add(item) {
    list.push(item);
  }

  function markAsComplete(index) {
    list[index].completed = true;
  }

  function overdue() {
    const today = new Date().toISOString().split("T")[0];
    return list.filter((item) => !item.completed && item.dueDate < today);
  }

  function dueToday() {
    const today = new Date().toISOString().split("T")[0];
    return list.filter((item) => !item.completed && item.dueDate === today);
  }

  function dueLater() {
    const today = new Date().toISOString().split("T")[0];
    return list.filter((item) => !item.completed && item.dueDate > today);
  }

  return {
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    get all() {
      return list;
    },
  };
}

module.exports = {
  todoList,
};
