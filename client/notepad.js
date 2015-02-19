// Notepad JS file.

/*
Template.notepad.notepad = function() {
  console.log(template.data);
  console.log("!!!");
  return Notepad.findOne({}).text;
}
*/

//Template.notepad.rendered({
//  interval: Meteor.setInterval(console.log("interval"), 1000)
  //Meteor.setInterval(console.log('interval'), 200);
//});
/*
Template.notepad.notepad(
    console.log("hello, notepad!")
    );
*/

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
    // This is going to require a couple more lookups than required.. (A lot more lookups.)
    // But it is client sided at least.
    //var notepad = template.data;
        
    var text = event.currentTarget.value;
    var id = Template.currentData()._id;
    var notepad = {
      "_id": id,
      "text": text
    }

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
    /*
    Meteor.call('updateNotepad', notepad, function (error, results) {
      if (error)
        console.log("Errors: ", error);
    });
    */
  }
});
