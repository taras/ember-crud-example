import Photo from 'ember-crud-example/models/photo';

var PhotosRoute = Ember.Route.extend({
  model: function() {
    return this.storage.findAll('photo');
  }
});

export default PhotosRoute;