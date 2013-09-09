/* global deletePhotos: false */

import App from 'ember-crud-example/app';
import Photo from 'ember-crud-example/models/photo';
import LocalStorage from 'ember-crud-example/utils/local-storage';

var storage;

module("Unit - LocalStorage", {
  setup: function(){
    storage = App.__container__.lookup('storage:main');
  },
  teardown: function() {
    deletePhotos();
  }
});

test("it exists", function(){
  ok(storage instanceof LocalStorage);
});

test("create Photo", function() {
  var model, guid, found;

  model = Em.run(Photo, 'create', {
    title: "this is a test",
    description: "nice"
  });

  Em.run(storage, 'create', model);
  ok(!Em.isEmpty(model.get('guid')), "guid was created");
  guid = model.get('guid');
  found = storage.read( Photo, guid );

  ok( !Em.isEmpty(found) );
  equal( model.get('guid'), found.get('guid') );

});