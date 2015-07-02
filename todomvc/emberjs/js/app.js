/*global Ember, DS, Todos:true */
window.Todos = Ember.Application.create({
  EXTEND_PROTOTYPES: true
});

Ember.TEMPLATES.todos = TODOS_TEMPLATE;
Ember.TEMPLATES['todo-list'] = TODO_LIST_TEMPLATE;

Todos.ApplicationAdapter = DS.LSAdapter.extend({
	namespace: 'todos-emberjs'
});
