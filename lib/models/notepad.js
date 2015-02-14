// Notepad Collection File.

/***
 * Schema:
 * _id
 * title
 * text / contents
 * modified
 */

Notepad = new Meteor.Collection('notepads');


// Notepad Methods.

Meteor.methods({
  createNotepad: function(notepad) {
    var newNotepad = Notepad.insert({title: "blank",
      text: "empty notepad",
      modified: new Date()
    });
    return newNotepad._id;
  },
  updateNotepad: function(notepad) {
    console.log('updating notepad');
  }
});
