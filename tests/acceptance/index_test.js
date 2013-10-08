var App;

module('Acceptances - Index', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('index renders', function(){
  expect(1);

  visit('/').then(function(){
    var title = find('h2#title');
    var list = find('ul li');

    equal(title.text(), 'Welcome to Ember.js');
  });   

});
