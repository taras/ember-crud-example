import App from 'ember-crud-example/app';
import guid from 'ember-crud-example/utils/guid';
import localStorage from 'window';

var LocalStorage = Ember.Object.extend({
  key: App.get( 'localStorageKey' ),
  getKey: function( type ) {
    return "%@.%@".fmt( this.get('key'), type );
  },
  create: function( model ) {
    var type = model.constructor;
    var existing = this.findAll( type );
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
    var type = model.constructor;
    var models = this.findAll( type );
    var updated = false;
    var updatedModels = models.map( function( item ) {
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
      all = [];
    if ( model ) {
      var type = model.constructor;
      all = this.findAll( type );
      var guid = model.get('guid');
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
    var key = this.getKey( type );
    var camelized = type.toString().camelize();
    this.cache.set( camelized, models );
    var objects = models.map(function(item){
      return item.serialize();
    });
    localStorage.setItem( key, JSON.stringify( objects ) );
  },
  lazyLoadCache: function( type ) {
    var typeClass = null;
    // normalize the type arg
    if ( Em.typeOf( type ) === 'string' ) {
      typeClass = Ember.get(type);
    } else {
      typeClass = type;
      type = type.toString();
    }
    var camelized = type.camelize();
    // cache property doesn't exist, let's create it
    if ( Em.isNone( this.cache.get( camelized ) ) ) {
      var key = this.getKey( type );
      var all = Em.A();
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