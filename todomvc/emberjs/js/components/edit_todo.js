/*global Todos, Ember */
'use strict';

var EditTodo = Ember.TextField.extend({

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
      var todo = this.get('model');
      todo.set('title', bufferedTitle);
      todo.save();
    }

    // Re-set our newly edited title to persist its trimmed version
    this.setProperties({
      bufferedTitle: bufferedTitle,
      isEditing: false
    });
  },

  cancelEditing: function () {
    this.setProperties({
      bufferedTitle: this.get('title'),
      isEditing: false
    });
  },

  removeTodo: function () {
    this.removeTodo();
  }

});

Ember.Application.initializer({
  name: 'edit-todo',
  initialize: function(app) {
    app.register('component:edit-todo', EditTodo);
  }
});