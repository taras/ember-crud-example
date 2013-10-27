import Resolver from 'resolver';
import registerComponents from 'ember-crud-example/initializers/register_components';
import initializePouchDB from 'ember-crud-example/initializers/initialize_pouchdb'; 

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  rootElement: "#ember-crud-example",
  modulePrefix: 'ember-crud-example', 
  Resolver: Resolver
});

var createApp = function() {
	App.initializer(registerComponents);
	App.initializer(initializePouchDB);
	return App.create();
};

export { App, createApp };