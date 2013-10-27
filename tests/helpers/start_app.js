import {initializer as initializer_pouchdb} from 'ember-pouchdb/initializer';
import {App as Application} from 'ember-crud-example/app';
import Photo from 'ember-crud-example/models/photo';
import registerComponents from 'ember-crud-example/initializers/register_components';

Application.initializer(initializer_pouchdb({
  dbName: 'ember-crud-example-testing',
  docTypes : {
    photo: Photo
  }
}));
Application.initializer(registerComponents);

Ember.RSVP.configure('onerror', function(error) {
  Ember.Logger.assert(false, error);
});

function startApp(attrs) {
  var App;

  var attributes = Ember.merge({
    // useful Test defaults
    rootElement: '#ember-testing',
    LOG_ACTIVE_GENERATION:false,
    LOG_VIEW_LOOKUPS: false
  }, attrs); // but you can override;

  Ember.run.join(function(){
    App = Application.create(attributes);
    App.setupForTesting();
    App.injectTestHelpers();
  });

  App.reset(); // this shouldn't be needed, i want to be able to "start an app at a specific URL"

  return App;
}

export default startApp;