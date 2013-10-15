var App;

module('Acceptances - Index', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test("index renders", function(){
  expect(1);
  visit('/photos').then(function(){
    equal(exists(".btn.new:contains('New photo')"), true);
  });
});