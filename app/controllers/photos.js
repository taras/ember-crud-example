var PhotosController = Ember.ArrayController.extend({
  contentBinding: 'storage.cache.photo'
});

export default PhotosController;