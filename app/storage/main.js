var EIDB = window.EIDB;

var Storage = Ember.Object.extend({
  /**
   * Settings object used for configuration of the database
   * @type {Object}
   */
  settings: {
    /**
     * Database name used by this application
     * @type {string}
     */
    dbName: null
  },
  // in-browser storage where data will be persisted
  local: null, 
  // load will return a promise that will resolve once all of the persistance related loading is complete
  load: function(settings) {
    Ember.assert('Storage expects settings to be an object.', Ember.typeOf(settings) === 'object');
    Ember.assert('Storage expects dbName property in settings.', Ember.typeOf(settings) && settings.hasOwnProperty('dbName'));
    this.set('settings', settings);
    var that = this;

    var populate = function(data){
      that.reopen(data); // populate our data into local storage
    };

    // return promise that will be resolved after the persistance layer is setup
    var promise = Ember.RSVP.hash({
        local: EIDB.open(settings.dbName) // open IndexedDB database
      })
      .then(populate)
      .then(null, handleErrors);

    return promise;
  },
  /** 
   * Return a promise that will resolve to an instance of the model after it was stored.
   * The resulting instance will have new _key property which is id in IndexedDB.
   * @param  {Model} model
   * @return {promise} resolves to model
   */
  create: function(model) {
    var 
      dbName      = this.get('settings.dbName'),
      storeName   = model.constructor.storageKey,
      modelClass  = model.constructor;

    var addRecord = function() {
      return EIDB.addRecord(dbName, storeName, model.serialize());
    };

    var updateModel = function(record){
      Ember.assert('Storage expects record returned by IndexedDB to be an object.', Ember.typeOf(record) === 'object');
      return model.setProperties(record);
    };

    var promise = this.getObjectStoreFor(modelClass)
      .then(addRecord)
      .then(updateModel)
      .then(null, handleErrors); 

    return promise;
  },
  /**
   * Return a promise that will resolve to an instance the requested model.
   * id parameter is id in persistance layer. To find by guid, use *find* method.
   * @param  {class} modelClass
   * @param  {int|string} id
   * @return {promise} resolves to model
   */
  read: function(modelClass, id) {
    Ember.assert('Storage expects modelClass parameter to be a class that inherits from Model class.', Ember.typeOf(modelClass) === 'class');
    var
      dbName    = this.get('settings.dbName'),
      storeName = modelClass.storageKey;

    var getRecord = function(objectStore){
      return EIDB.getRecord(dbName, storeName, id);        
    };

    var createModel = function(record){
      return modelClass.create(record);
    };

    var promise = this.getObjectStoreFor(modelClass)
      .then(getRecord)
      .then(createModel)
      .then(null, handleErrors);

    return promise;
  },
  /**
   * Return promise that will resolve to originally passed model after IndexedDB was updated.
   * @param  {Model} model
   * @return {promise} resolves to model
   */
  update: function(model) {
    Ember.assert("Storage expects model to have _key property, which identifies this record in IndexedDB.", model && model.get('_key'));
    var
      dbName      = this.get('settings.dbName'),
      storeName   = model.constructor.storageKey,
      modelClass  = model.constructor;

    var returnModel = function(record){
      // make sure that the callback returns model and not record
      return model;
    };

    var updateRecord = function() {
      EIDB.putRecord(dbName, storeName, model.serialize());
    };

    var promise = this.getObjectStoreFor(modelClass)
      .then(updateRecord)
      .then(returnModel)
      .then(null, handleErrors);

    return promise;
  },
  /**
   * Return promise that will resolve to model after it was deleted from IndexedDB
   * @param  {Model} model
   * @return {promise} resolves to model
   */
  "delete": function(model) {
    Ember.assert("Storage expects model to have _key property, which identifies this record in IndexedDB.", model && model.get('_key'));    
    var
      dbName      = this.get('settings.dbName'),
      storeName   = model.constructor.storageKey,
      modelClass  = model.constructor;

    var deleteRecord = function(){
      return EIDB.delete(dbName, storeName, model.get('_key'));
    };

    var returnModel = function(record){
      // make sure that the callback returns model and not record
      return model;
    };

    var promise = this.getObjectStoreFor(modelClass)
      .then(deleteRecord)
      .then(returnModel)
      .then(null, handleErrors);

    return promise;
  },
  /**
   * Return promise that will resolve to found values
   * @param  {class} modelClass
   * @param  {array} range [min, max]
   * @param  {string} direction ( prev or next )
   * @return {promise} resolves to array of models
   */
  findAll: function(modelClass, range, direction) {
    if (typeof direction === 'undefined') {
      direction = 'next';
    }
    if (typeof range === 'undefined') {
      range = [0, 10];
    }

    var getAll = function(objectStore){
      return objectStore.getAll(range, direction);
    };

    var createModels = function(records) {
      return Em.A(records).map(function(record){
        return modelClass.create(record);
      });
    };

    var promise = this.getObjectStoreFor(modelClass)
      .then(getAll)
      .then(createModels)
      .then(null, handleErrors);

    return promise;
  },
  /**
   * Return promise that will resolve to the found value
   * @param  {class} modelClass
   * @param  {object} query
   * @return {promise} resolves to array of objects
   */
  find: function(modelClass, query) {
    Ember.assert('Storage expects modelClass to be a model class. ie Photo', Ember.typeOf(modelClass) === 'class');
    Ember.assert('Storage expects object to be a hash.', Ember.typeOf(query) === 'object');

    var
      dbName    = this.get('settings.dbName'),
      storeName = modelClass.storageKey;

    var findRecords = function(objectStore) {
      return EIDB.find(dbName, storeName, query);
    };

    var createModels = function(records) {
      return Em.A(records).map(function(record){
        return modelClass.create(record);
      });
    };

    var promise = this.getObjectStoreFor(modelClass)
      .then(findRecords)
      .then(createModels)
      .then(null, handleErrors);

    return promise;
  },
  /** 
   * Return a promise that will resolve to an objectStore. 
   * Creates an object store if it doesn't already exist.
   * @param  {class} modelClass
   * @return {IDBObjectStore}
   */
  getObjectStoreFor: function(modelClass) {
    Ember.assert("Storage expects modelClass to be a class that extends Model", Ember.typeOf(modelClass) === 'class');    
    var that = this, objectStore, db = this.local, storeName = modelClass.storageKey, dbName = this.get('settings.dbName');
    return new Ember.RSVP.Promise(function(resolve, reject){
      if ( db.hasObjectStore(storeName) ) {
        resolve(db.objectStore(storeName));
      } else {
        resolve(EIDB.createObjectStore(dbName, storeName));
      }      
    });
  }
});

var handleErrors = function(errors) {
  debugger;
  console.log(errors);
};

export default Storage;