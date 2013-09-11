import LocalStorage from 'ember-crud-example/utils/local-storage';

var initializer = {
  name: "storageInjections",
  initialize: function( container, application ) {
    // register singleton instance of LocalStorage to be used whenever performing CRUD operations
    application.register( 'storage:main', LocalStorage );
    // register singleton instance cache object used for binding
    application.register( 'cache:main', Ember.Object );
    // inject storage into every route
    application.inject( 'route', 'storage', 'storage:main' );
    // inject cache into storage
    application.inject( 'storage:main', 'cache', 'cache:main' );
    // inject storage into all controllers
    application.inject( 'controller', 'storage', 'storage:main' );
  }
};

export default initializer;