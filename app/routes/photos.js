import Photo from 'ember-crud-example/models/photo';

var PhotosRoute = Ember.Route.extend({
  actions: {
    "delete": function(model) {
      this.get('controller.content').removeObject(model);
      return true;
    }
  },
  model: function() {
    return this.storage.findAll(Photo);
  }
});

export default PhotosRoute;