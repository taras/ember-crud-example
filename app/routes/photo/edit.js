var PhotoEditRoute = Ember.Route.extend({
  actions: {
    update: function(model) {
			var that = this;
			this.pouch.PUT(model).then(function(){
				that.transitionTo('photos');				
			});
      return true;
    },
    cancel: function() {
      this.transitionTo('photos');
			return true;
    }
  }
});

export default PhotoEditRoute;