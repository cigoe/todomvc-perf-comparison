/*global Todos, Ember, TODO_LIST_TEMPLATE */
'use strict';

var TodoListItem = Ember.Component.extend({
  layoutName: 'todo-list-item',
  isEditing: false,

  // We use the bufferedTitle to store the original value of
  // the item's title so that we can roll it back later in the
  // `cancelEditing` action.
  bufferedTitle: Ember.computed.oneWay('title'),

  actions: {
    editTodo: function () {
      this.set('isEditing', true);
    },

    doneEditing: function () {
      var bufferedTitle = this.get('bufferedTitle').trim();

      if (Ember.isEmpty(bufferedTitle)) {
        // The `doneEditing` action gets sent twice when the user hits
        // enter (once via 'insert-newline' and once via 'focus-out').
        //
        // We debounce our call to 'removeTodo' so that it only gets
        // made once.
        Ember.run.debounce(this, 'removeTodo', 0);
      } else {
        var todo = this.get('item');
        todo.set('title', bufferedTitle);
        todo.save();
      }

      // Re-set our newly edited title to persist its trimmed version
      this.set('bufferedTitle', bufferedTitle);
      this.set('isEditing', false);
    },

    cancelEditing: function () {
      this.set('bufferedTitle', this.get('title'));
      this.set('isEditing', false);
    },

    removeTodo: function () {
      this.removeTodo();
    }
  },

  removeTodo: function () {
    var todo = this.get('item');

    todo.deleteRecord();
    todo.save();
  },

  saveWhenCompleted: function () {
    this.get('item').save();
  }.observes('isCompleted')

});

Ember.Application.initializer({
  name: 'todo-list-item',
  initialize: function(app) {
    app.register('component:todo-list-item', TodoListItem);
  }
});