// Notepad Publications.

// Probably really shouldn't use this but going to put it in just in case for now..
Meteor.publish('allNotepads', function() {
  return Notepad.find({hidden: false});
});

Meteor.publish('recentNotepads', function() {
  return Notepad.find({hidden: false}, {sort: {modified: -1}, limit: 10});
});

Meteor.publish('notepad', function(id) {
  return Notepad.find(id);
});
