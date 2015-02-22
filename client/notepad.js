// Notepad JS file.

function updateNotepad(notepad) {
  Meteor.call('updateNotepad', notepad, function (error, results) {
    if (error)
      console.log(error);
  });
}


Template.notepad.helpers({
  isNotepadOwner: function () {
    var notepad = Iron.controller().data().currNotepad;
    if (!Meteor.user() || !notepad.created_by)
      return false;
    if (notepad.created_by._id == Meteor.user()._id)
      return true;
    console.log(Iron.controller().data().currNotepad.created_by, Meteor.user());
    return false;
  }
});

Template.notepad.rendered = function () {
  $('#notepad').val(Iron.controller().data().currNotepad.text);
}

Session.set("countdown", false);

// Events
Template.notepad.events({
  'keypress #notepad': function (event, template) {
    var controller = Iron.controller();
    var notepad = controller.data().currNotepad;
    notepad.text = event.currentTarget.value;

    if (Session.get('countdown') == false) {
      Session.set('countdown', true);
      Meteor.setTimeout(
        function () {
          updateNotepad(notepad);
          Session.set('countdown', false);
        }, 200
      );
    }
  },
  'submit #update-as-owner': function (event, template) {
    event.preventDefault();

    var title = event.target.title.value;
    var hidden = event.target.hidden.checked;
    var notepadId = Iron.controller().data().currNotepad._id;

    console.log(title, hidden);
    Meteor.call('updateNotepadAsOwner', {title: title, hidden: hidden, _id: notepadId});
    
    // Prevent default submit.
    return false;
  }
});
