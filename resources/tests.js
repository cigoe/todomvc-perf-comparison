var numberOfItemsToAdd = 100;
var Suites = [];

Suites.push({
    name: 'Backbone',
    url: 'todomvc/backbone/index.html',
    version: '1.1.2',
    prepare: function (runner, contentWindow, contentDocument) {
    contentWindow.Backbone.sync = function () {}
        return runner.waitForElement('#new-todo').then(function (element) {
            element.focus();
            return element;
        });
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', function (newTodo, contentWindow, contentDocument) {
            var appView = contentWindow.appView;
            for (var i = 0; i < numberOfItemsToAdd; i++) {
                var keypressEvent = document.createEvent('Event');
                keypressEvent.initEvent('keypress', true, true);
                keypressEvent.which = 13;
                newTodo.value = 'Something to do ' + i;
                newTodo.dispatchEvent(keypressEvent)
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', function (newTodo, contentWindow, contentDocument) {
            var checkboxes = contentDocument.querySelectorAll('.toggle');
            for (var i = 0; i < checkboxes.length; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingAllItems', function (newTodo, contentWindow, contentDocument) {
            var deleteButtons = contentDocument.querySelectorAll('.destroy');
            for (var i = 0; i < deleteButtons.length; i++)
                deleteButtons[i].click();
        })
    ]
});

Suites.push({
    name: 'Ember',
    url: 'todomvc/emberjs/index.html',
    version: '1.13.2 (htmlbars)',
    prepare: function (runner, contentWindow, contentDocument) {
        contentWindow.Todos.Store = contentWindow.DS.Store.extend({
            revision: 12,
            adapter: 'Todos.LSAdapter',
            commit: function () { }
        });

        return runner.waitForElement('#new-todo').then(function (element) {
            element.focus();
            return {
                newTodo: element,
                emberRun: contentWindow.Ember.run,
                $: contentWindow.Ember.$
            }
        });
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', function (params, contentWindow) {
            params.emberRun(function () {
                for (var i = 0; i < numberOfItemsToAdd; i++) {
                    params.emberRun(function () {
                        params.newTodo.value = 'Something to do ' + i;
                    });

                    var keyupEvent = document.createEvent('Event');
                    keyupEvent.initEvent('keyup', true, true);
                    keyupEvent.keyCode = 13;
                    params.newTodo.dispatchEvent(keyupEvent);
                }
            });
        }),
        new BenchmarkTestStep('CompletingAllItems', function (params, contentWindow, contentDocument) {
            params.emberRun(function () {
                var checkboxes = contentDocument.querySelectorAll('.ember-checkbox');
                for (var i = 0; i < checkboxes.length; i++) {
                    params.$(checkboxes[i]).trigger('click');
                }
            });
        }),
        new BenchmarkTestStep('DeletingItems', function (params, contentWindow, contentDocument) {
            params.emberRun(function () {
                var deleteButtons = contentDocument.querySelectorAll('.destroy');
                for (var i = 0; i < deleteButtons.length; i++) {
                    params.$(deleteButtons[i]).trigger('click');
                }
            });
        })
    ]
});

Suites.push({
    name: 'Angular',
    url: 'todomvc/angularjs-perf/index.html',
    version: '1.2.14',
    prepare: function (runner, contentWindow, contentDocument) {
        return runner.waitForElement('#new-todo').then(function (element) {
            element.focus();
            return element;
        });
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', function (newTodo, contentWindow, contentDocument) {
            var submitEvent = document.createEvent('Event');
            submitEvent.initEvent('submit', true, true);
            for (var i = 0; i < numberOfItemsToAdd; i++) {
                var inputEvent = document.createEvent('Event');
                inputEvent.initEvent('input', true, true);
                newTodo.value = 'Something to do ' + i;
                newTodo.dispatchEvent(inputEvent);
                newTodo.form.dispatchEvent(submitEvent);
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', function (newTodo, contentWindow, contentDocument) {
            var checkboxes = contentDocument.querySelectorAll('.toggle');
            for (var i = 0; i < checkboxes.length; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingAllItems', function (newTodo, contentWindow, contentDocument) {
            var deleteButtons = contentDocument.querySelectorAll('.destroy');
            for (var i = 0; i < deleteButtons.length; i++)
                deleteButtons[0].click();
        })
    ]
});

Suites.push({
    name: 'React',
    url: 'todomvc/react/index.html',
    version: '0.10.0',
    prepare: function (runner, contentWindow, contentDocument) {
        contentWindow.Utils.store = function () {}
        return runner.waitForElement('#new-todo').then(function (element) {
            element.focus();
            return element;
        });
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', function (newTodo, contentWindow, contentDocument) {
            for (var i = 0; i < numberOfItemsToAdd; i++) {
                var keydownEvent = document.createEvent('Event');
                keydownEvent.initEvent('keydown', true, true);
                keydownEvent.which = 13; // VK_ENTER
                newTodo.value = 'Something to do ' + i;
                newTodo.dispatchEvent(keydownEvent);
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', function (newTodo, contentWindow, contentDocument) {
            var checkboxes = contentDocument.querySelectorAll('.toggle');
            for (var i = 0; i < checkboxes.length; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingAllItems', function (newTodo, contentWindow, contentDocument) {
            var deleteButtons = contentDocument.querySelectorAll('.destroy');
            for (var i = 0; i < deleteButtons.length; i++)
                deleteButtons[i].click();
        })
    ]
});

Suites.push({
    name: 'Om',
    url: 'todomvc/om/index.html',
    version: '0.5.0 + React 0.9.0',
    prepare: function (runner, contentWindow, contentDocument) {
        return runner.waitForElement('#new-todo').then(function (element) {
            element.focus();
            return element;
        });
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', function (newTodo, contentWindow, contentDocument) {
            var todomvc = contentWindow.todomvc;
            for (var i = 0; i < numberOfItemsToAdd; i++) {
                var keydownEvent = document.createEvent('Event');
                keydownEvent.initEvent('keydown', true, true);
                keydownEvent.which = 13; // VK_ENTER
                newTodo.value = 'Something to do ' + i;
                newTodo.dispatchEvent(keydownEvent);
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', function (newTodo, contentWindow, contentDocument) {
            var checkboxes = contentDocument.querySelectorAll('.toggle');
            for (var i = 0; i < checkboxes.length; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingAllItems', function (newTodo, contentWindow, contentDocument) {
            var deleteButtons = contentDocument.querySelectorAll('.destroy');
            for (var i = 0; i < deleteButtons.length; i++)
                deleteButtons[i].click();
        })
    ]
});

Suites.push({
    name: 'Mercury',
    url: 'todomvc/mercury/index.html',
    version: '3.1.7 + virtual-dom 0.8',
    prepare: function (runner, contentWindow, contentDocument) {
        return runner.waitForElement('#new-todo').then(function (element) {
            element.focus();
            return element;
        });
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', function (newTodo, contentWindow, contentDocument) {
            for (var i = 0; i < numberOfItemsToAdd; i++) {
                var inputEvent = document.createEvent('Event');
                inputEvent.initEvent('input', true, true);
                newTodo.value = 'Something to do ' + i;
                newTodo.dispatchEvent(inputEvent);

                var keydownEvent = document.createEvent('Event');
                keydownEvent.initEvent('keydown', true, true);
                keydownEvent.keyCode = 13; // VK_ENTER
                newTodo.dispatchEvent(keydownEvent);
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', function (newTodo, contentWindow, contentDocument) {
            var checkboxes = contentDocument.querySelectorAll('.toggle');
            for (var i = 0; i < checkboxes.length; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingAllItems', function (newTodo, contentWindow, contentDocument) {
            var deleteButtons = contentDocument.querySelectorAll('.destroy');
            for (var i = 0; i < deleteButtons.length; i++)
                deleteButtons[i].click();
        })
    ]
});

Suites.push({
    name: 'Elm',
    url: 'todomvc/elm/index.html',
    version: '0.12.3 + virtual-dom 0.8',
    prepare: function (runner, contentWindow, contentDocument) {
        return runner.waitForElement('#new-todo').then(function (element) {
            element.focus();
            return element;
        });
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', function (newTodo, contentWindow, contentDocument) {
            for (var i = 0; i < numberOfItemsToAdd; i++) {
                var inputEvent = document.createEvent('Event');
                inputEvent.initEvent('input', true, true);
                newTodo.value = 'Something to do ' + i;
                newTodo.dispatchEvent(inputEvent);

                var keydownEvent = document.createEvent('Event');
                keydownEvent.initEvent('keydown', true, true);
                keydownEvent.keyCode = 13; // VK_ENTER
                newTodo.dispatchEvent(keydownEvent);
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', function (newTodo, contentWindow, contentDocument) {
            var checkboxes = contentDocument.querySelectorAll('.toggle');
            for (var i = 0; i < checkboxes.length; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingAllItems', function (newTodo, contentWindow, contentDocument) {
            var deleteButtons = contentDocument.querySelectorAll('.destroy');
            for (var i = 0; i < deleteButtons.length; i++)
                deleteButtons[i].click();
        })
    ]
});

Suites.push({
    name: 'Polymer',
    url: 'todomvc/polymer/build.html',
    version: '0.5.2',
    prepare: function (runner, contentWindow, contentDocument) {
        return runner.waitForShadowElement('td-todos', '#new-todo').then(function (element) {
            element.focus();
            return element;
        });
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', function (newTodo, contentWindow, contentDocument) {
            for (var i = 0; i < numberOfItemsToAdd; i++) {
                var keypressEvent = document.createEvent('Event');
                keypressEvent.initEvent('keypress', true, true);
                keypressEvent.which = 13;
                keypressEvent.keyCode = 13;
                newTodo.value = 'Something to do ' + i;
                //newTodo.dispatchEvent(keypressEvent)
                newTodo.keypressAction(keypressEvent)
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', function (newTodo, contentWindow, contentDocument) {
            var lis = contentDocument
                .querySelector('td-todos')
                .shadowRoot
                .querySelectorAll('#todo-list li');
            for (var i = 0; i < lis.length; i++)
                lis[i].shadowRoot.querySelector('.toggle').click();
        }),
        new BenchmarkTestStep('DeletingAllItems', function (newTodo, contentWindow, contentDocument) {
            var deleteButtons = contentDocument
                .querySelector('td-todos')
                .shadowRoot
                .querySelectorAll('#todo-list li');
            for (var i = 0; i < deleteButtons.length; i++)
                deleteButtons[i].shadowRoot.querySelector('.destroy').click();
        })
    ]
});