import {get_initializer} from 'ember-pouchdb/get_initializer';
import {App as Application} from 'ember-crud-example/app';
import Photo from 'ember-crud-example/models/photo';
import registerComponents from 'ember-crud-example/initializers/register_components';

Ember.FEATURES['ember-testing-wait-hooks'] = true;

Application.initializer(get_initializer({
  docTypes : {
    photo: Photo
  }
}));
Application.initializer(registerComponents);

var PouchDestroyer = Ember.Mixin.create({
  willDestroy: function(){
    Pouch.destroy(this.get('pouch.dbName'));
    this._super();
  }        
});

Application.reopenClass(PouchDestroyer);

function startApp(attrs) {
  var App;
  
  window.location.hash = "";
  
  var attributes = Ember.merge({
    // useful Test defaults
    rootElement: '#ember-testing',
    LOG_ACTIVE_GENERATION:false,
    LOG_VIEW_LOOKUPS: false,
    pouch: {
      dbName: "crud-example-testing-"+new Date().valueOf()
    }
  }, attrs); // but you can override;

  Ember.run.join(function(){
    App = Application.create(attributes);
    App.setupForTesting();
    App.injectTestHelpers();
  });

  App.reset(); // this shouldn't be needed, i want to be able to "start an app at a specific URL"

  Ember.Logger.info(QUnit.config.current.module + ":" + QUnit.config.current.testName);

  return App;
}

export default startApp;