// Notepad Collection File.

/***
 * Schema:
 * _id
 * title
 * text
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
    //console.log(newNotepad);
    if (Meteor.isClient)
      Router.go('/notepad/' + newNotepad);

  },
  updateNotepad: function(notepad) {
    //var  = Notepad.findOne({_id: notepad._id});
    var newpad = notepad;
    Notepad.update(
      {_id: newpad._id},
      {
        $set: {
          text: newpad.text,
          modified: new Date()
        }
      }
    )

  }
});
