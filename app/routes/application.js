import Photo from 'ember-crud-example/models/photo';

var App = window.App;

var ApplicationRoute = Ember.Route.extend({
  actions: {
    goToNewPhoto: function () {
      this.transitionTo( 'photo.new' );
    },
    goToPhoto: function( model ) {
      this.transitionTo( 'photo', model );
    },
    edit: function( model ) {
      this.transitionTo( 'photo.edit', model.copy() );
    },
    create: function( model ) {
      this.storage.create( model );
      this.transitionTo( 'photos' );      
    },
    update: function( model ) {
      this.storage.update( model );
      this.transitionTo( 'photos' );
    },
    remove: function( model ) {
      this.storage.remove( model );
    },
    cancel: function( model ) {
      Ember.run( model, "destroy" );
      this.transitionTo( 'photos' );      
    }
  },
  model: function() {
    debugger;
    return Ember.RSVP.hash({
      storage: this.storage.load({dbName: App.get('modulePrefix')})
    });
  }
});

export default ApplicationRoute;