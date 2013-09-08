/* global localStorage: false */

import App from 'ember-crud-example/app';
import guid from 'ember-crud-example/utils/guid';

var LocalStorage = Ember.Object.extend({
  getKey: function( type ) {
    return type.toString();
  },
  create: function( model ) {
    var type, existing;
    type = model.get('storageKey');
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
    var type, models, updated, updatedModels;
    type = model.get('storageKey');
    models = this.findAll( type );
    updated = false;
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
    var 
      filtered = [],
      all = [],
      type, guid;
    if ( model ) {
      type = model.get('storageKey');
      all = this.findAll( type );
      guid = model.get('guid');
      if ( guid ) {
        filtered = all.filter( function( item ) {
          return item.get('guid') !== guid;
        });
      }
      this.put( type, filtered );
    }
    return filtered.length !== all.length;
  },
  find: function( type, id ) {
    this.read.apply( arguments );
  },
  findAll: function( type ) {
    return this.lazyLoadCache( type );
  },
  put: function( type, models ) {
    var key, camelized, objects;

    key = this.getKey( type );
    camelized = type.toString().camelize();
    this.cache.set( camelized, models );
    objects = models.map(function(item){
      return item.serialize();
    });
    localStorage.setItem( key, JSON.stringify( objects ) );
  },
  lazyLoadCache: function( type ) {
    var 
      typeClass = null,
      camelized, key, all;
    // normalize the type arg
    if ( Em.typeOf( type ) === 'string' ) {
      typeClass = Ember.get(type);
    } else {
      typeClass = type;
      type = type.toString();
    }
    camelized = type.camelize();
    // cache property doesn't exist, let's create it
    if ( Em.isNone( this.cache.get( camelized ) ) ) {
      key = this.getKey( type );
      all = Em.A();
      if ( localStorage.hasOwnProperty( key ) ) {
        all = JSON.parse( localStorage.getItem( key ) );
        all = Em.A(all).map(function(item){
          return Em.run( typeClass, 'create', item );
        });
      }
      this.cache.set( camelized, all );
    }
    return this.cache.get( camelized );
  }
});

export default LocalStorage;