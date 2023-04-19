'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueTasks = await Todo.overdue();
      overdueTasks.forEach(task => console.log(task.displayableString()));
      console.log("\n");

      console.log("Due Today");
      const dueTodayTasks = await Todo.dueToday();
      dueTodayTasks.forEach(task => console.log(task.displayableStringWithoutDate()));
      console.log("\n");

      console.log("Due Later");
      const dueLaterTasks = await Todo.dueLater();
      dueLaterTasks.forEach(task => console.log(task.displayableString()));
    }

    static async overdue() {
      return await Todo.findAll({
        where: {
          completed: false,
          dueDate: {
            [sequelize.Op.lt]: new Date()
          }
        }
      });
    }

    static async dueToday() {
      return await Todo.findAll({
        where: {
          dueDate: new Date().toISOString().slice(0, 10),
          completed: false
        }
      });
    }

    static async dueLater() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [sequelize.Op.gt]: new Date().toISOString().slice(0, 10)
          },
          completed: false
        }
      });
    }

    static async markAsComplete(id) {
      const task = await Todo.findByPk(id);
      task.completed = true;
      return await task.save();
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }

    displayableStringWithoutDate() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title}`;
    }
  }

  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });

  return Todo;
};
