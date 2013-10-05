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
    Ember.assert('Storage expects settings to be an object.', Ember.typeof(settings) === 'object');
    Ember.assert('Storage expects dbName property in settings.', Ember.typeof(settings) && settings.hasOwnProperty('dbName'));
    this.set('settings', settings);
    var that = this;
    // return promise that will be resolved after the persistance layer is setup
    return Ember.RSVP.hash({
      // open IndexedDB database
      local: EIDB.open(settings.dbName)
    }).then(function(data){
      // populate our data into local storage
      that.reopen(data);
    }, function(errors){
      // TODO: handle errors 
    });
  },
  create: function(model) {
    return this.local.add(model.storageKey, model.get(model.indexKey), model.serialize());
  },
  read: function(storageKey, id) {
    return this.local.get(storageKey, id);
  },
  update: function(model) {
    return this.local.put(model.storageKey, model.get(model.indexKey), model.serialize());
  },
  "delete": function(model) {
    return this.local.delete(model.storageKey, model.get(model.indexKey));
  },
  /**
   * Return promise that will resolve to found values
   * @param  {string} storageKey
   * @param  {array} range [min, max]
   * @param  {string} direction ( prev or next )
   * @return {promise}
   */
  findAll: function(storageKey, range, direction) {
    if (typeof direction === 'undefined') {
      direction = 'next';
    }
    if (typeof range === 'undefined') {
      range = [0, 10];
    }
    return this.local.objectStore(storageKey).getAll(range, direction);
  },
  /**
   * Return promise that will resolve to the found value
   * @param  {Model} type
   * @param  {object} query
   * @return {Promise}
   */
  find: function(type, query) {
    Ember.assert('Storage expects type to be a model class. ie Photo', Ember.typeof(type) !== 'class');
    if (Ember.typeof(query) === 'number') {
      var id = query;
      query = {};
      query[type.indexKey] = id;
    }
    Ember.assert('Storage expects object to be a hash.', Ember.typeof(query) !== 'object');
    return EIDB.find(this.get('settings.dbName'), type.storageKey, query);
  }
});

export default Storage;