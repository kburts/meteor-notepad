// Notepad JS file.

/*
Template.notepad.notepad = function() {
  console.log(template.data);
  console.log("!!!");
  return Notepad.findOne({}).text;
}
*/


// Events
Template.notepad.events({
  'keypress #notepad': function (event, template) {
    // This is going to require a couple more lookups than required.. (A lot more lookups.)
    // But it is client sided at least.
    var notepadId = template.data._id;
    Meteor.call('updateNotepad', notepadId, function (error, results) {
      console.log("Errors: ", error);
    });
  }
});
