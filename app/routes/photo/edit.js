var PhotoEditRoute = Ember.Route.extend({
  actions: {
    update: function() {
      this.transitionTo('photos');
      return true;
    },
    cancel: function() {
      this.transitionTo('photos');
			return true;
    }
  }
});

export default PhotoEditRoute;