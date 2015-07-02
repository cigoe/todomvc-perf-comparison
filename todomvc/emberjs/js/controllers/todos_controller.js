/*global Todos, Ember */
'use strict';

Todos.TodosController = Ember.Controller.extend({

  /* properties */

  remaining: Ember.computed.filterBy('filteredTodos', 'isCompleted', false),
  completed: Ember.computed.filterBy('filteredTodos', 'isCompleted', true),
  length: Ember.computed.alias('filteredTodos.length'),

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
   }

});
