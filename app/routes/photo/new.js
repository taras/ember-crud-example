import Photo from 'ember-crud-example/models/photo';

var PhotoNewRoute = Ember.Route.extend({
  model: function() {
    // provide a new photo to the template
    return Photo.create({});
  },
  setupController: function( controller, model ) {
    controller.set( 'content', model );
  }
});

export default PhotoNewRoute;