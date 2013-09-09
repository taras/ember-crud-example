import Resolver from 'resolver';
import routes from 'ember-crud-example/routes';
import storage from 'ember-crud-example/initializers/storage';

var App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  rootElement: "#ember-crud-example",
  modulePrefix: 'ember-crud-example', 
  Resolver: Resolver
});

App.Router.map(routes);

Ember.Application.initializer(storage);

export default App;