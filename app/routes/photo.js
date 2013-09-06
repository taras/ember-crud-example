import Photo from 'ember-crud-example/models/photo';

var PhotoRoute = Ember.Route.extend({
  model: function( params ) {
    return Photo.find( params.guid );
  },
  serialize: function( params ) {
    return { guid: params.guid };
  }
});

export default PhotoRoute;