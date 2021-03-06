// Router

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.map(function() {
  this.route('notepads');
});

Router.route('/', {
  name: 'homepage',
  waitOn: function() {
    return Meteor.subscribe('recentNotepads');
  },
  data: function() {
    return {recentNotepads: Notepad.find()};
    //Notepad.find()};
  }
});

Router.route('/notepad/:_id', {
  name: 'notepad',
  waitOn: function () {
    return Meteor.subscribe('notepad', this.params._id);
  },
  data: function () {
    return {currNotepad: Notepad.findOne({_id: this.params._id})};
  },
  action: function () {
    this.render();
  }
});
