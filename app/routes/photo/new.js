import Photo from 'ember-crud-example/models/photo';

var PhotoNewRoute = Ember.Route.extend({
  actions: {
    create: function() {
      this.transitionTo('photos');
      return true; // allow action to continue to bubble up to ApplicationRoute
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
