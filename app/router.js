var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.resource('photos',     {path:'/photos' });
  this.resource('photo.new',  {path:'/photo/new'});  
  this.resource('photo',      {path:'/photo/:id'}, function(){
    this.route('edit');
  });
});

export default Router;
