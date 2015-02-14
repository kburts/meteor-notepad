Template.homepage.events({
  'click #createNotebook': function () {
    Meteor.call('createNotepad', function (error, results) {
      console.log(error);
      console.log(results);
    });
    console.log('creating notebook!!');
  }
});
