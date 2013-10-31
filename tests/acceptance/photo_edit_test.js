import Photo from 'ember-crud-example/models/photo';

var pouch, model, id, App;

module("Acceptances - Photo Edit", {
  setup: function(){
    App = startApp();
    Em.run(function(){
      pouch = App.__container__.lookup('pouch:main');
      model = Photo.create({
        title: "Work in progress",
        description: "This item is incomplete."
      });
    stop();      
    pouch.POST(model).then(function(newModel){
        model = newModel;
        id = model.get('id');
        start();
      });
    });		
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});	

asyncTest("required exist", function(){
  expect(4);
  wait().then(function(){
    start();
    equal(Em.typeOf(pouch), 'instance');
    equal(Em.typeOf(model), 'instance');
    equal(Em.typeOf(model.get('title')), 'string');
    ok( model.get('title') !== '' );    
  });
});

asyncTest("renders", function(){
  expect(2);
  visit('/photo/%@/edit'.fmt(id));
  wait().then(function(){
    start();
    ok(find("#inputTitle").val() === 'Work in progress');
    ok(find("#textareaDescription").val() === "This item is incomplete.");
  });
});

asyncTest("discards", function(){
	expect(3);
  wait().then(function(){
    return visit('/photo/%@/edit'.fmt(id)).then(function(){
      return wait().then(function(){
        equal(find('#inputTitle').val(), 'Work in progress');
        fillIn("#inputTitle", "Updated with non-sense");
        return click("button:contains('Cancel')");
      })
      .then(function(){
        pouch.GET( id ).then(function(stored){
          start();        
          equal(Em.typeOf(stored), 'instance');
          equal(stored.get('title'), "Work in progress");
        });
      });
    });    
  });
});