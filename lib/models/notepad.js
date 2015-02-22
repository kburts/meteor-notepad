// Notepad Collection File.

/***
 * Schema:
 * _id
 * created_by
 * updated_by
 * modified (new Date - mongoDB date format.)
 *
 * title
 * text
 * hidden (bool)
 */

Notepad = new Meteor.Collection('notepads');


// Notepad Methods.

Meteor.methods({
  createNotepad: function(notepad) {
      var newNotepad = Notepad.insert({
        title: "blank",
        text: "empty notepad",
        modified: new Date(),
        hidden: false,
        created_by: Meteor.user(),
        updated_by: Meteor.user()
      });

    //console.log(newNotepad);
    if (Meteor.isClient)
      Router.go('/notepad/' + newNotepad);

  },
  updateNotepad: function(notepad) {
    //var  = Notepad.findOne({_id: notepad._id});
    var newpad = notepad;
    if (new Date() > newpad.modified) {
      console.log('updating notepad object in the database!!');
      Notepad.update(
        {_id: newpad._id},
        {
          $set: {
            text: newpad.text,
            modified: new Date(),
            updated_by: Meteor.user()
          }
        }
      )
    }
  },
  updateNotepadAsOwner: function (args) {
    var notepad = Notepad.findOne({_id: args._id});
    if (Meteor.userId() == notepad.created_by._id) {
      Notepad.update(
        notepad, 
        {$set: {
          title: args.title,
          hidden: args.hidden
          }
      });
    }
    else
      console.log("Hey, you're not supposed to be editing this, it's private!");
  }
});
