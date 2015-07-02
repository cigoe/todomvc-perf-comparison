Ember.TEMPLATES['todo-list-item'] = Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "revision": "Ember@1.13.2",
        "loc": {
          "source": null,
          "start": {
            "line": 2,
            "column": 2
          },
          "end": {
            "line": 4,
            "column": 2
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        return morphs;
      },
      statements: [
        ["inline","edit-todo",[],["class","edit","value",["subexpr","@mut",[["get","item.bufferedTitle"]],[]],"focus-out","doneEditing","insert-newline","doneEditing","escape-press","cancelEditing"]]
      ],
      locals: [],
      templates: []
    };
  }());
  var child1 = (function() {
    return {
      meta: {
        "revision": "Ember@1.13.2",
        "loc": {
          "source": null,
          "start": {
            "line": 4,
            "column": 2
          },
          "end": {
            "line": 8,
            "column": 2
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("label");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        dom.setAttribute(el1,"class","destroy");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [3]);
        var element1 = dom.childAt(fragment, [5]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        morphs[1] = dom.createElementMorph(element0);
        morphs[2] = dom.createMorphAt(element0,0,0);
        morphs[3] = dom.createElementMorph(element1);
        return morphs;
      },
      statements: [
        ["inline","input",[],["type","checkbox","class","toggle","checked",["subexpr","@mut",[["get","item.isCompleted"]],[]]]],
        ["element","action",["editTodo"],["on","doubleClick"]],
        ["content","item.title"],
        ["element","action",["removeTodo"],[]]
      ],
      locals: [],
      templates: []
    };
  }());
  return {
    meta: {
      "revision": "Ember@1.13.2",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 9,
          "column": 5
        }
      }
    },
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("li");
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element2 = dom.childAt(fragment, [0]);
      var morphs = new Array(2);
      morphs[0] = dom.createAttrMorph(element2, 'class');
      morphs[1] = dom.createMorphAt(element2,1,1);
      return morphs;
    },
    statements: [
      ["attribute","class",["concat",[["subexpr","if",[["get","item.isCompleted"],"completed"],[]]," ",["subexpr","if",[["get","item.isEditing"],"editing"],[]]]]],
      ["block","if",[["get","item.isEditing"]],[],0,1]
    ],
    locals: [],
    templates: [child0, child1]
  };
}()));