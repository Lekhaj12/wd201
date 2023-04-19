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
      console.log("My Todo list\n");

      console.log("Overdue");
      const overdueItems = await Todo.overdue();
      overdueItems.forEach(item => console.log(item.displayableString()));

      console.log("\nDue Today");
      const todayItems = await Todo.dueToday();
      todayItems.forEach(item => console.log(item.displayableString()));

      console.log("\nDue Later");
      const laterItems = await Todo.dueLater();
      laterItems.forEach(item => console.log(item.displayableString()));
    }

    static async overdue() {
      const items = await Todo.findAll({
        where: {
          dueDate: { [sequelize.Op.lt]: new Date() }
        }
      });

      return items;
    }

    static async dueToday() {
      const items = await Todo.findAll({
        where: {
          dueDate: { [sequelize.Op.eq]: new Date().toISOString().split('T')[0] },
        },
      });

      return items;
    }

    static async dueLater() {
      const items = await Todo.findAll({
        where: {
          dueDate: { [sequelize.Op.gt]: new Date() },
        },
      });

      return items;
    }

    static async markAsComplete(id) {
      const item = await Todo.findByPk(id);

      if (item) {
        item.completed = true;
        await item.save();
      }
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let dateString = "";

      if (!this.completed) {
        const dueDate = new Date(this.dueDate);
        const today = new Date();

        if (dueDate.toDateString() === today.toDateString()) {
          dateString = "";
        } else {
          dateString = this.dueDate;
        }
      }

      return `${this.id}. ${checkbox} ${this.title} ${dateString}`;
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
