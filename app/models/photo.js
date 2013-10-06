import Model from 'ember-crud-example/storage/model';

var Photo = Model.extend({
  image: null,
  title: '',
  description: '',
  // thumbnail is taken from placeholder.it or the image if 
  thumbnail: function() {
    if (Em.isNone(this.get('image'))) {
      return "http://placehold.it/75x75";
    } else {
      return this.get('image');
    }
  }.property( 'image' ),
  // Tells the resistance layer what properties to save to localStorage
  // Ember Data does this for you.
  serialize: function() {
    return this.getProperties([ "guid", "image", "title", "description" ]);
  }
});

// set storage key for this class of models
Photo.reopenClass({
  storageKey: 'photos'
});

export default Photo;