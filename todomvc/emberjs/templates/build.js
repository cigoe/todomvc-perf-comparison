var fs = require('fs');
var compiler = require('../bower_components/ember/ember-template-compiler');
var input = fs.readFileSync('todos.hbs', { encoding: 'utf8' });
var template = compiler.precompile(input, false);
var output = 'var TODOS_TEMPLATE = Ember.HTMLBars.template(' + template + ');';

fs.writeFileSync('todos.hbs.js', output, { encoding: 'utf8' });


var input = fs.readFileSync('todo_list.hbs', { encoding: 'utf8' });
var template = compiler.precompile(input, false);
var output = 'var TODO_LIST_TEMPLATE = Ember.HTMLBars.template(' + template + ');';

fs.writeFileSync('todo_list.hbs.js', output, { encoding: 'utf8' });