function Routes() {
  this.resource('photos', { path: '/photos' } , function(){
    this.route( 'new' );
  });
  this.resource('photo', { path: '/photo/:guid' }, function(){
    this.route( 'edit' );
  });
}

export default Routes;
