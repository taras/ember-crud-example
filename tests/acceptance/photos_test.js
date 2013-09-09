import App from 'ember-crud-example/app';

module("Acceptances - Photos", {
  setup: function(){
    App.reset();
  }
});

test("index renders", function(){
  visit('/photos').then(function(){
    ok(exists(".btn.new:contains('New photo')"));
  });
});
