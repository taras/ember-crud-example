var App;

module("Acceptances - Index", {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("index renders", function(){
  visit('/').then(function(){
    ok(exists(".btn.new:contains('New photo')"));
  });
});
