// Router

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.map(function() {

  this.route('homepage', {
    path: '/'
  });

  this.route('notepads');
});

Router.route('/notepad/:_id', {
  name: 'notepad',
  waitOn: function () {
    return Meteor.subscribe('notepad', this.params._id);
  },
  data: function () {
    return Notepad.findOne({_id: this.params._id});
  },
  action: function () {
    this.render();
  }
});
