/* global localStorage: false */

import App from 'ember-crud-example/app';
import guid from 'ember-crud-example/utils/guid';

var LocalStorage = Ember.Object.extend({
  getKey: function( type ) {
    return type.storageKey;
  },
  create: function( model ) {
    var type, existing;

    type = model.constructor;
    existing = this.findAll( type );
    existing.push( model );
    this.put( type, existing );
    return model;
  },
  read: function( type, guid ) {
    var all = this.findAll(type);
    return all.find(function(item) {
      return item.get( 'guid' ) === guid;
    });
  },
  update: function( model ) {
    var type, models, updated = false, updatedModels;

    type = model.constructor;
    models = this.findAll( type );
    updatedModels = models.map( function( item ) {
      if ( item.get('guid') === model.get('guid') ) {
        updated = true;
        return model;
      } else {
        return item;
      }
    });
    this.put( type, updatedModels );
    return updated;
  },
  remove: function( model ) {
    // TODO: this needs to be looked over
    var type, filtered = [], all = [], guid;
    type = model.constructor;
    if ( model ) {
      guid = model.get('guid');
      if ( guid ) {
        all = this.findAll( type );
        filtered = all.filter( function( item ) {
          return item.get('guid') !== guid;
        });
      }
      this.put( type, filtered );
    }
    return filtered.length !== all.length;
  },
  find: function( type, id ) {
    return Em.run( this, 'read', type, id );
  },
  findAll: function( type ) {
    return this.lazyLoadCache( type );
  },
  put: function( type, models ) {
    var key, objects;

    key = this.getKey( type );
    this.cache.set( key, models );
    objects = models.map(function(item){
      return item.serialize();
    });
    localStorage.setItem( key, JSON.stringify( objects ) );
  },
  lazyLoadCache: function( type ) {
    var  key, all;

    key = this.getKey( type );
    // cache property doesn't exist, let's create it
    if ( Em.isNone( this.cache.get( key ) ) ) {
      // check if localStorage has an entry for this type
      if ( localStorage.hasOwnProperty( key ) ) {
        // get all of the items for this type and convert JSON objects
        all = JSON.parse( localStorage.getItem( key ) );
        all = Em.A(all).map(function(item){
          return Em.run( type, 'create', item );
        });
      }
      this.cache.set( key, all );
    }
    return this.cache.get( key );
  }
});

export default LocalStorage;