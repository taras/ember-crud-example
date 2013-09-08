import App from 'ember-crud-example/app';

var Model = Ember.Object.extend( Ember.Copyable, {
  copy: function() {
    return Em.run( this.constructor, 'create', this.serialize() );
  },
  serialize: function() {
    throw new Error(Ember.String.fmt("%@ has to implement serialize() method which is required to convert it to JSON.", [this]));
  },
  /**
   * String name of the storage key for this model.
   * This is only necessary because Ember has a bug that prevents proper class inspection when using modules
   * TODO: convert Model to a class and remove storageKey after Ember class inspection is fixed.
   */
  storageKey: function() {
    throw new Error(Ember.String.fmt("%@ has to implement storageKey property or method", [this]));    
  }
});

export default Model;