import Photo from 'ember-crud-example/models/photo';

var PhotoRoute = Ember.Route.extend({
  model: function(params) {
    var promise = this.storage.find(Photo, { guid: params.guid }, true)
      .then(function(models) {
        Ember.assert("PhotoRoute#model expects Storage#find to return an array", Em.typeOf(models) === 'array');
        var model = null;
        // find method will return an array of models, but we need a single model
        if (models.length) {
          model = models[0];
        }
        return model;
      });
    return promise;
  },
  serialize: function(params) {
    return { guid: params.guid };
  }
});

export default PhotoRoute;
