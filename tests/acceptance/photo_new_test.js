/* global deletePhotos: false */

import App from 'ember-crud-example/app';

module("Acceptances - Photos New", {
  setup: function(){
    App.reset();
  },
  teardown: function() {
    deletePhotos();
  }
});

test("renders", function(){
  visit('/photo/new').then(function(){
    ok(exists("legend:contains('New photo')"));
    ok(exists("button:contains('Create')"));
  });
});

test("creates", function(){

  var itemCount;

  visit('/')
    .then(function(){
      itemCount = find("tr").length;
    })
    .then(function(){
      return click("button:contains('New photo')");
    })
    .then(function(){
      return fillIn("#inputTitle", "Photo 1 Title");
    })
    .then(function(){
      return fillIn("#textareaDescription", "Photo 1 Description");
    })
    .then(function(){
      return click( "button:contains('Create')");
    })
    .then(function(){
      ok(exists("button:contains('New photo')"));
      equal( find('tr').length, itemCount + 1 );
    });

});