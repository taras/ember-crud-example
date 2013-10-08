import Resolver from 'resolver';
import registerComponents from 'ember-crud-example/utils/register_components';
import Storage from 'ember-crud-example/storage/main';
import Settings from 'ember-crud-example/settings';

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  rootElement: "#ember-crud-example",
  modulePrefix: 'ember-crud-example',
  dbName: "crud-app",
  Resolver: Resolver
});

App.initializer({
  name: 'Register Components',
  initialize: function(container, application) {
    registerComponents(container);
  }
});

App.initializer({
  name: "Inject Settings",
  initialize: function( container, application ) {
    application.register( 'settings:main', Settings );
    application.inject( 'route', 'settings', 'settings:main' );
    application.inject( 'controller', 'settings', 'settings:main' );
  }
});

App.initializer({
  name: "Inject Storage",
  initialize: function( container, application ) {
    application.register( 'storage:main', Storage );
    application.inject( 'route', 'storage', 'storage:main' );
    application.inject( 'controller', 'storage', 'storage:main' );
  }
});

export default App;