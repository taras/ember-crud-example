import Model from 'ember-crud-example/models/index';

var Photo = Model.extend({
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
  serialize: function() {
    return this.getProperties([ "guid", "image", "title", "description" ]);
  }
});

Photo.reopenClass({
  storageKey: 'photo'
});

export default Photo;