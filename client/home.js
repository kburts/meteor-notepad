Template.homepage.events({
  'click #createNotepad': function () {
    Meteor.call('createNotepad', function (error, results) {
      console.log("Errors: ", error);
    });
  }
});
