// Notepad Publications.

Meteor.publish('allNotepads', function() {
  return Notepad.find();
});

Meteor.publish('notepad', function(id) {
  return Notepad.find(id);
});
