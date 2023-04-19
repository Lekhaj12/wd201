// models/todo.js
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
      dueTodayTasks.forEach(task => console.log(task.displayableString()));
      console.log("\n");

      console.log("Due Later");
      const dueLaterTasks = await Todo.dueLater();
      dueLaterTasks.forEach(task => console.log(task.displayableString()));
    }

    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date()
          }
        }
      });
    }

    static async dueToday() {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: today
          }
        }
      });
    }

    static async dueLater() {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: today
          }
        }
      });
    }

    static async markAsComplete(id) {
      const task = await Todo.findByPk(id);
      task.completed = true;
      await task.save();
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let dueDate = this.dueDate;
      if (this.completed) {
        dueDate = "(completed)";
      } else if (this.dueDate.getTime() === new Date().setUTCHours(0, 0, 0, 0)) {
        dueDate = "";
      }
      return `${this.id}. ${checkbox} ${this.title} ${dueDate}`;
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
