var PhotosController = Ember.ArrayController.extend({
  isNewOpen: null,
  contentBinding: 'storage.cache.appPhoto'
});

export default PhotosController;