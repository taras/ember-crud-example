import Resolver from 'resolver';
import routes from 'ember-crud-example/routes';
import LocalStorage from 'ember-crud-example/utils/local-storage';

// activate logging of binding related activities
Ember.LOG_BINDINGS = true;

Ember.Application.initializer({
  name: "injectStorage",
  initialize: function( container, application ) {
    application.register( 'storage:main', App.LocalStorage );
    application.register( 'cache:main', Ember.Object );
    application.inject( 'route', 'storage', 'storage:main' );
    application.inject( 'storage:main', 'cache', 'cache:main' );
    application.inject( 'controller', 'storage', 'storage:main' );
  }
});

var App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  rootElement: "#app",
  localStorageKey: "ember-crud-example",
  modulePrefix: 'ember-crud-example', // TODO: loaded via config
  Resolver: Resolver
});

App.Router.map(routes); // TODO: just resolve the router
App.LocalStorage = LocalStorage;

export default App;