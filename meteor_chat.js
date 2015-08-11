Rooms = new Mongo.Collection("rooms");
Messages = new Mongo.Collection("messages");
 
if (Meteor.isClient) {

  // This code only runs on the client
  Template.body.helpers({
    rooms: function () {
      return Rooms.find({});
    },
  });

  Template.roomPage.helpers({
    messages:function(){
      return Messages.find({ room: window.currentRoom });
    }
  });

  Template.body.events({
    "submit .new-room, #add": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var text = event.target.text.value;
 
      // Insert a task into the collection
      Rooms.insert({
        name: text,
        owner: Meteor.userId()           // _id of logged in user
      });
      // Clear form
      event.target.text.value = "";
    },
   
    "click .delete": function () {
      Rooms.remove(this._id);
      Meteor.call('removeAllMessagesFromRoom', this._id);
      Router.go('home');
      // Messages.remove({room: this._id});
    }
  });
  
  Template.roomPage.events({
    "submit .new-message, #add": function (event) {
      event.preventDefault();
      var text = event.target.message.value;
 
      Messages.insert({
        name: text,
        owner_name: Meteor.user().emails[0].address,
        owner: Meteor.userId(),
        room: window.currentRoom 
      });
      // Clear form
      event.target.message.value = "";
    },

  });

} else {
  Meteor.methods({
    "removeAllMessagesFromRoom" : function (value) {
      Messages.remove({room: value}, {multi: true});
    }
  })
}

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