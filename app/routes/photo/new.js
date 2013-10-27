import Photo from 'ember-crud-example/models/photo';

var PhotoNewRoute = Ember.Route.extend({
  actions: {
    create: function(model) {
			var that = this;
			this.pouch.POST(model).then(function(){
				that.transitionTo('photos');				
			});
    },
    cancel: function() {
      this.transitionTo('photos');
      return true;
    }
  },
  model: function() {
    // provide a new photo to the template
    return Photo.create({});
  }
});

export default PhotoNewRoute;
