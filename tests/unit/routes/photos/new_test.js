import App from 'ember-crud-example/app';
import New from 'ember-crud-example/routes/photo/new';
import LocalStorage from 'ember-crud-example/utils/local-storage';

var route;

module("Unit - PhotosNewRoute", {
  setup: function(){
    route = App.__container__.lookup('route:photo.new');
  }
});

test("it exists", function(){
  ok(route);
  ok(route instanceof Ember.Route);
});

test("has storage", function() {
	ok(route.storage);
	ok(route.storage instanceof LocalStorage);
});