var fs = require('fs');
var compiler = require('./bower_components/ember/ember-template-compiler');
var path = require('path');

fs.readdirSync('./templates/').forEach(function(name) {
  if (path.extname(name) == '.hbs') {
    name = name.replace(path.extname(name), '');
    var tpath = './templates/' + name;
    var input = fs.readFileSync(tpath + '.hbs', { encoding: 'utf8' });
    var template = compiler.precompile(input, false);
    var output = 'Ember.TEMPLATES[\'' + name + '\'] = Ember.HTMLBars.template(' + template + ');';

    fs.writeFileSync(tpath + '.hbs.js', output, { encoding: 'utf8' });
  }
});
