// Notepad JS file.

function updateNotepad(notepad) {
  Meteor.call('updateNotepad', notepad, function (error, results) {
    if (error)
      console.log(error);
  });
}


Session.set("countdown", false);

// Events
Template.notepad.events({
  'keypress #notepad': function (event, template) {
    var controller = Iron.controller();
    var notepad = controller.data().currNotepad;

    if (Session.get('countdown') == false) {
      Session.set('countdown', true);
      Meteor.setTimeout(
        function () {
          updateNotepad(notepad);
          Session.set('countdown', false);
          console.log('updating on timeout.');
        }, 2000
      );
    }
  }
});
