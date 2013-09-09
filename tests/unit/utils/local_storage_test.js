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

test("create photo", function() {
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

test("update photo", function() {

  var model, updated, guid;

  model = Em.run(Photo, 'create', {
    'title': "To be updated"
  });
  guid = model.get('guid');
  storage.create(model);
  Em.run(model, 'set', 'title', "Updated");
  storage.update(model);
  updated = storage.find(Photo, guid);

  ok(updated);
  equal(updated.get('title'), 'Updated');

});

/**
 * I have not idea why this test is failing.
 */
test("delete photo", function() {
  var m1, m2, all;

  m1 = Em.run(Photo, 'create', {
    title: "title 1",
    description: "description 1"
  });

  m2 = Em.run(Photo, 'create', {
    title: "title 2",
    description: "description 2"
  });

  Em.run(storage, 'create', m1);
  Em.run(storage, 'create', m2);
  Em.run(storage, 'remove', m2);

  all = storage.findAll( Photo );
  equal( all.length, 1 );

});

