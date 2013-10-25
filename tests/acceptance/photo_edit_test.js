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
			pouch.POST(model);
		});		
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});	

test("required exist", function(){
  equal(Em.typeOf(pouch), 'instance');
  equal(Em.typeOf(model), 'instance');
  equal(Em.typeOf(model.get('title')), 'string');
  ok( model.get('title') !== '' );
});

test("renders", function(){
  visit('/photo/%@/edit'.fmt(model.get('id')))
    .then(function(){
      ok(find("#inputTitle").val() === 'Work in progress');
      ok(find("#textareaDescription").val() === "This item is incomplete.");
    });
});

asyncTest("discards", function(){
	expect(3);
  id = model.get('id');
  visit('/photo/%@/edit'.fmt(model.get('id')))
    .then(function(){
      equal(find('#inputTitle').val(), 'Work in progress');
    })
    .then(function(){
      return fillIn("#inputTitle", "Updated with non-sense");
    })
    .then(function(){
      return click("button:contains('Cancel')");
    })
    .then(function(){
			pouch.GET( id ).then(function(stored){
				equal(Em.typeOf(stored), 'instance');
				equal(stored.get('title'), "Work in progress");
				start();
			});
			stop();
    }); 
});
