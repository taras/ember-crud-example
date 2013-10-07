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
    dbName: null,
    /**
     * Array of model classes that you would like to register with the database.
     * Necessary to make sure that an object store exists for every model.
     * @type {Array}
     */
    models: []
  },
  // in-browser storage where data will be persisted
  db: null,
  // load will return a promise that will resolve once all of the persistance related loading is complete
  load: function(settings) {
    Ember.assert('Storage expects settings to be an object.', Ember.typeOf(settings) === 'object');
    Ember.assert('Storage expects dbName property in settings.', Ember.typeOf(settings) && settings.hasOwnProperty('dbName'));
    Ember.assert('Storage expects an array models property in settings.', settings.hasOwnProperty('models') && Ember.typeOf(settings.models) === 'array');
    this.set('settings', settings);
    var
    that = this,
      dbName = settings.dbName,
      models = settings.models;

    /**
     * Load data into *this* instance
     * @param  {object} data
     * @return {storage}
     */
    var populate = function(data) {
      that.reopen(data); // populate our data into db storage
      return that;
    };

    /**
     * Create datastore for every model class in global models array
     * @param  {object} data
     * @return {object}
     */
    var registerModels = function(data) {
      models.forEach(function(modelClass) {
        var storeName = modelClass.storageKey;
        if (!data.db.hasObjectStore(storeName)) {
          EIDB.createObjectStore(dbName, storeName);
        }
      });
      return data;
    };

    // return promise that will be resolved after the persistance layer is setup
    var promise = Ember.RSVP.hash({
      db: EIDB.open(settings.dbName) // open IndexedDB database
    })
      .then(registerModels)
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
    dbName = this.get('settings.dbName'),
      storeName = model.constructor.storageKey,
      modelClass = model.constructor;

    var updateModel = function(key) {
      model.set('_key', key);
      return model;
    };

    var promise = EIDB.addRecord(dbName, storeName, model.serialize())
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
    dbName = this.get('settings.dbName'),
      storeName = modelClass.storageKey;

    var createModel = function(record) {
      return modelClass.create(record);
    };

    var promise = EIDB.getRecord(dbName, storeName, id)
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
    dbName = this.get('settings.dbName'),
      storeName = model.constructor.storageKey,
      modelClass = model.constructor;

    var returnModel = function(record) {
      // make sure that the callback returns model and not record
      return model;
    };


    var promise = EIDB.putRecord(dbName, storeName, model.serialize())
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
    dbName = this.get('settings.dbName'),
      storeName = model.constructor.storageKey,
      modelClass = model.constructor;

    var returnModel = function(record) {
      // make sure that the callback returns model and not record
      return model;
    };

    var promise = EIDB.deleteRecord(dbName, storeName, model.get('_key'))
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
  findAll: function(modelClass, options) {
    var
    dbName = this.get('settings.dbName'),
      storeName = modelClass.storageKey;

    var createModels = function(records) {
      return Em.A(records).map(function(record) {
        return modelClass.create(record);
      });
    };

    var promise = EIDB.getAll(dbName, storeName, null, 'prev')
      .then(createModels)
      .then(null, handleErrors);

    return promise;
  },
  /**
   * Return promise that will resolve to the found object
   * @param  {class} modelClass
   * @param  {object} query
   * @return {promise} resolves to array of objects
   */
  find: function(modelClass, query) {
    Ember.assert('Storage expects modelClass to be a model class. ie Photo', Ember.typeOf(modelClass) === 'class');
    Ember.assert('Storage expects object to be a hash.', Ember.typeOf(query) === 'object');

    var
    dbName = this.get('settings.dbName'),
      storeName = modelClass.storageKey;

    var createModels = function(records) {
      return Em.A(records).map(function(record) {
        return modelClass.create(record);
      });
    };

    var promise = EIDB.find(dbName, storeName, query)
      .then(createModels)
      .then(null, handleErrors);

    return promise;
  },
  /**
   * Delete current database
   * @return {promise}
   */
  deleteDB: function() {
    return EIDB.delete(this.get('settings.dbName'));
  }
});

var handleErrors = function(errors) {
  // TODO: how do I handle these errors?
};

export default Storage;
