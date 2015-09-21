Router.route('/', {
  path: '/',
  name: 'home'
});

Router.route('/rooms/:_id', {
  template: 'roomPage',
  data: function(){
    window.currentRoom = this.params._id;
    return Messages.find({ room: window.currentRoom });
  }
});