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

Router.route('/notepad/:_id', function () {
  var notepad = Notepad.findOne({_id: this.params._id});
  this.render('notepad', {data: notepad});
});
