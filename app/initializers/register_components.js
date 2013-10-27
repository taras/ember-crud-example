import registerComponents from 'ember-crud-example/utils/register_components';

var register_components = {
  name: 'Register Components',
  initialize: function(container, application) {
    registerComponents(container);
  }
};

export default register_components;