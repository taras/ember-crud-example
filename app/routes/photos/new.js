import Photo from 'ember-crud-example/models/photo';

var PhotosNewRoute = Ember.Route.extend({
  beforeModel: function() {
    // 
    this.controllerFor( 'photos' ).set( 'isNewOpen', true );
  },
  model: function() {
    // provide a new photo to the template
    return Photo.create({});
  },
  setupController: function( controller, model ) {
    controller.set( 'content', model );
  },
  actions: {
    willTransition: function( transition ) {
      if ( transition.targetName === 'photos.new' ) {
        // when transitioning to photos.new tell controller for this route that posts.new is open
        this.controllerFor( 'photos' ).set( 'isNewOpen', true );
      }
    }
  }
});

export default PhotosNewRoute;