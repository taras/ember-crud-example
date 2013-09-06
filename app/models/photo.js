import Model from 'ember-crud-example/models/index';
import guid from 'ember-crud-example/guid';

var Photo = Model.extend({
  guid: null,
  image: null,
  title: '',
  description: '',
  thumbnail: function() {
    if ( Em.isNone( this.get('image' ) ) ) {
      return "http://placehold.it/75x75";
    } else {
      return this.get('image');
    }
  }.property( 'image' ),
  init: function() {
    if ( Ember.isNone( this.get( 'guid' ) ) ) {
      this.set( 'guid', guid() );
    }
  },
  serialize: function() {
    return this.getProperties([ "guid", "image", "title", "description" ]);
  }
});

export default Photo;