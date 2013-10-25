var ApplicationRoute = Ember.Route.extend({
  actions: {
    goToNewPhoto: function() {
      this.transitionTo('photo.new');
    },
    goToPhoto: function(model) {
      this.transitionTo('photo', model);
    },
    edit: function(model) {
      this.transitionTo('photo.edit', model.copy());
    },
    create: function(model) {
      this.pouch.POST(model);
    },
    update: function(model) {
      this.pouch.PUT(model);
    },
    "delete": function(model) {
      this.pouch.DELETE(model);
      model.destroy();
    },
    cancel: function(model) {
      model.destroy();
    }
  }
});

export default ApplicationRoute;
