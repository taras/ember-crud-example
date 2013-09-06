import Photo from 'ember-crud-example/models/photo';

var PhotosRoute = Ember.Route.extend({
  model: function() {
    return Photo.findAll();
  }
});

export default PhotosRoute;