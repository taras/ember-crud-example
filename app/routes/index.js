var IndexRoute = Ember.Route.extend({
  redirect: function() {
    // redirect root to photos
    this.transitionTo( 'photos' );
  }
});

export default IndexRoute;