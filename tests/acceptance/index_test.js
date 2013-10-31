var App;

module("Acceptances - Index", {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

asyncTest("index renders", function(){
  expect(1);
  
  wait().then(function(){
    visit('/');
    wait().then(function(){
      start();      
      ok(exists(".btn.new:contains('New photo')"));
    });    
  });
  
});