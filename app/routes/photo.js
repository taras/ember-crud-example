import Photo from 'ember-crud-example/models/photo';

var PhotoRoute = Ember.Route.extend({
  model: function(params) {
		return this.pouch.GET(params.id);
  },
  serialize: function(params) {
    return { id: params.id };
  }
});

export default PhotoRoute;
