var IndexRoute = Ember.Route.extend({
  beforeModel: function( transition ) {
    // redirect root to photos
    this.transitionTo( 'photos' );
  }
});

export default IndexRoute;