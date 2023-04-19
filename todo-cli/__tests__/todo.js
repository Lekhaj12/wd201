const todoList = () => {
  const list = [];

  const add = (item) => {
    list.push(item);
  };

  const markAsComplete = (index) => {
    if (index >= 0 && index < list.length) {
      list[index].completed = true;
    }
  };

  const overdue = () => {
    const now = new Date();
    return list.filter((item) => !item.completed && new Date(item.dueDate) < now);
  };

  const dueToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return list.filter((item) => !item.completed && item.dueDate === today);
  };

  const dueLater = () => {
    const now = new Date().toISOString().split("T")[0];
    return list.filter((item) => !item.completed && item.dueDate > now);
  };

  const toDisplayableList = () => {
    return list.map((item, index) => {
      const status = item.completed ? "DONE" : "TODO";
      return `${index + 1}. ${item.title} - ${item.dueDate} [${status}]`;
    });
  };

  return { all: list, add, markAsComplete, overdue, dueToday, dueLater, toDisplayableList };
};

module.exports = { todoList };
