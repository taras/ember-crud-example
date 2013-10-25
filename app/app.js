import Resolver from 'resolver';
import registerComponents from 'ember-crud-example/utils/register_components';
import Photo from 'ember-crud-example/models/photo';
import {initializer} from 'ember-pouchdb/initializer';

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

App.initializer({
  name: 'Register Components',
  initialize: function(container, application) {
    registerComponents(container);
  }
});

App.initializer(initializer({
	docTypes: {
		photo: Photo
	}	
}));

export default App;