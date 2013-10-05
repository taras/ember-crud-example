import App from 'ember-crud-example/app';

var StorageAdapter = Ember.Object.extend({
  // in-browser storage where data will be persisted
  local: null, 
  // load will return a promise that will resolve once all of the persistance related loading is complete
  load: function() {
    var that = this;
    // return promise that will be resolved after the persistance layer is setup
    return Ember.RSVP.hash({
      // open IndexedDB database
      local: EIDB.open('ember-crud-example')
    }).then(function(data){
      // populate our data into local storage
      that.reopen(data);
    }, function(errors){
      // TODO: handle errors 
    });
  }
});

export default StorageAdapter;