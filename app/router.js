var Router = Ember.Router.extend();

Router.map(function(){
  this.resource('photos',   {path:'/photos' });
  this.resource('photo.new',  {path:'/photo/new'});  
  this.resource('photo',    {path:'/photo/:guid'}, function(){
  this.route('edit');
  });
});

export default Router;
