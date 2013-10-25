var App;

module("Acceptances - Photos", {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("index renders", function(){
  visit('/photos').then(function(){
    ok(exists(".btn.new:contains('New photo')"));
  });
});
