import Photo from 'ember-crud-example/models/photo';

var ApplicationRoute = Ember.Route.extend({
  actions: {
    goToNewPhoto: function () {
      return this.transitionTo( 'photos.new' );
    },
    goToPhoto: function( model ) {
      return this.transitionTo( 'photo', model );
    },
    edit: function( model ) {
      return this.transitionTo( 'photo.edit', model.copy() );
    },
    create: function( model ) {
      this.storage.create( model );
      return this.goToPhotos();
    },
    update: function( model ) {
      this.storage.update( model );
      return this.goToPhotos();
    },
    remove: function( model ) {
      this.storage.remove( model );
    },
    cancel: function( model ) {
      Ember.destroy( model );
      this.storage.refresh(Photo);
      return this.goToPhotos();
    },
    /**
     * TODO: look into components events only pass 1 arument
     */
    didLoadFile: function( args ) {
      var
        src = args[ 0 ],
        model = args[ 1 ];
      model.set( 'image', src );
    }
  },
  goToPhotos: function() {
    this.controllerFor( 'photos' ).set( 'isNewOpen', false );
    return this.transitionTo( 'photos' );
  }
});

export default ApplicationRoute;