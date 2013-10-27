var App;

module("Acceptances - Index", {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    deleteDB(App);
    Ember.run(App, 'destroy');
  }
});

asyncTest("index renders", function(){
  expect(1);
  Ember.run.later(function(){
    visit('/').then(function(){
      ok(exists(".btn.new:contains('New photo')"));
      start();   
    });
  }, 30);
});
