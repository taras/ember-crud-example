var App;

module("Acceptances - Index", {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');    
  }
});

asyncTest("Create a new item", function(){
  expect(2);
  var itemCount;

  visit("/photos")
  .then(function(){
    return wait().then(function(){
      click("button.new");
      fillIn("#inputTitle", "New item title");
      fillIn("#textareaDescription", "Some description");
      click("button:contains('Create')")
      .then(function(){
        return visit("/photos")
          .then(function(){
            return wait().then(function(){
              start();    
              ok(exists("button:contains('New photo')"));
              equal( find('tr').length, 2 );
            });
          });            
      });
    });        
  });
});