import New from 'ember-crud-example/routes/photo/new';
import Storage from 'ember-crud-example/storage/main';

var route;

module("Unit - PhotosNewRoute", {
  setup: function(){
    var container = isolatedContainer([
      'route:photo.new'
    ]);

    route = container.lookup('route:photo.new');
  }
});

test("it exists", function(){
  ok(route);
  ok(route instanceof Ember.Route);
});

test("has storage", function() {
	ok(route.storage);
	ok(route.storage instanceof Storage);
});