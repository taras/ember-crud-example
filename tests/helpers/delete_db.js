var deleteDB = function(App) {
  Ember.run(function(){
    var pouch = App.__container__.lookup('pouch:main');
    pouch.remove();
    pouch.destroy();
  });

};

export default deleteDB;