var PhotosController = Ember.ArrayController.extend({
  isNewOpen: null,
  contentBinding: 'storage.cache.photo'
});

export default PhotosController;