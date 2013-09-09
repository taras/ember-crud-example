import Index from 'ember-crud-example/routes/index';
import App from 'ember-crud-example/app';

var route;

module("Unit - IndexRoute", {
  setup: function(){
    route = App.__container__.lookup('route:index');
  }
});

test("it exists", function(){
  ok(route);
  ok(route instanceof Ember.Route);
});
