/*global Todos, Ember, TODO_LIST_TEMPLATE */
'use strict';

var TodosComponent = Ember.Component.extend({

  layoutName: 'todo-list',

  actions: {
    createTodo: function () {
      var title, todo;

      // Get the todo title set by the "New Todo" text field
      title = this.get('newTitle').trim();
      if (!title) {
        return;
      }

      // Create the new Todo model
      todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });
      todo.save();

      // Clear the "New Todo" text field
      this.set('newTitle', '');
    },

    clearCompleted: function () {
      var completed = this.get('completed');
      completed.invoke('deleteRecord');
      completed.invoke('save');
    },
  },

  /* properties */

  remaining: Ember.computed.filterBy('items', 'isCompleted', false),
  completed: Ember.computed.filterBy('items', 'isCompleted', true),

  allAreDone: function (key, value) {
    if (value !== undefined) {
      this.setEach('isCompleted', value);
      return value;
    } else {
      var length = this.get('length');
      var completedLength = this.get('completed.length');

      return length > 0 && length === completedLength;
    }
  }.property('length', 'completed.length')
});


Ember.Application.initializer({
  name: 'todo-list',
  initialize: function(app) {
    app.register('component:todo-list', TodosComponent);
  }
});