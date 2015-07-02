/*global Ember, DS, Todos:true */
window.Todos = Ember.Application.create({
  EXTEND_PROTOTYPES: true
});

Todos.ApplicationAdapter = DS.LSAdapter.extend({
	namespace: 'todos-emberjs'
});
