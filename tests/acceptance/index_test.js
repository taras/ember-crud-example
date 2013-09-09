import Index from 'ember-crud-example/routes/index';
import App from 'ember-crud-example/app';

module("Acceptances - Index", {
  setup: function(){
    App.reset();
  }
});

test("index renders", function(){
  visit('/').then(function(){
    ok(exists(".btn.new:contains('New photo')"));
  });
});
