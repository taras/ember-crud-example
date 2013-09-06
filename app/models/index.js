import App from 'ember-crud-example/app';

var Model = Ember.Object.extend( Ember.Copyable, {
  copy: function() {
    return Em.run( this.constructor, 'create', this.serialize() );
  },
  serialize: function() {
    throw new Error(Ember.String.fmt("%@ has to implement serialize() method which is required to convert it to JSON.", [this]));
  }
});

Model.reopenClass({
  // TODO: find out how to lookup things without using __container__
  find: function( id ) {
    var container = App.__container__;
    var storage = container.lookup( 'storage:main' );
    return storage.read( this.toString(), id );
  },
  findAll: function() {
    var container = App.__container__;
    var storage = container.lookup( 'storage:main' );
    return storage.findAll( this.toString() );
  }
});

export default Model;