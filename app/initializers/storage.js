import LocalStorage from 'ember-crud-example/utils/local-storage';

export default {
  name: "storageInjections",
  initialize: function( container, application ) {
    application.register( 'storage:main', LocalStorage );
    application.register( 'cache:main', Ember.Object );
    application.inject( 'route', 'storage', 'storage:main' );
    application.inject( 'storage:main', 'cache', 'cache:main' );
    application.inject( 'controller', 'storage', 'storage:main' );
  }
};