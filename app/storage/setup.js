import EIDB from 'eidb';

var hook_events = function() {
  var events = [ 'open.onsuccess.resolve', '_openCursor.onsuccess.resolve' ];
  events.forEach(function( eventName ) {
    EIDB.on('%@.before'.fmt( eventName ), Ember.run.begin);
    EIDB.on('%@.after'.fmt( eventName ), Ember.run.end);    
  });
}

var setup = function() {
  hook_events();
}

export default setup;