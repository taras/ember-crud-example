import App from 'ember-crud-example/app';
import guid from 'ember-crud-example/storage/utils/guid';
import Storable from 'ember-crud-example/storage/mixins/storable';

var Model = Ember.Object.extend(Ember.Copyable, Storable, {
  init: function() {
    if (Em.isNone(this.constructor.storageKey)) {
      throw new Error(Ember.String.fmt("%@ has to implement storageKey property or method", [this]));
    }
    if (Em.isNone(this.get('guid'))) {
      // guid is null when item is being created
      Ember.run( this, 'set', 'guid', guid() );
    }
    this._super();
  },
  // default guid
  guid: null,
  copy: function() {
    return Em.run(this.constructor, 'create', this.serialize());
  },
  serialize: function() {
    throw new Error(Ember.String.fmt("%@ has to implement serialize() method which is required to convert it to JSON.", [this]));
  }
});

// add a class property ( aka static property )
Model.reopenClass({
  /**
   * String name of the storage key for this model.
   * This is only necessary because Ember has a bug that prevents proper class inspection when using modules
   * TODO: convert Model to a class and remove storageKey after Ember class inspection is fixed.
   * @type {string}
   */
  storageKey: null
});

export default Model;
