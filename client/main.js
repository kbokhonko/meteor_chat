Meteor.subscribe("rooms");
Meteor.subscribe("messages");

// This code only runs on the client
Template.body.helpers({
  rooms: function () {
    return Rooms.find({});
  },
});

Template.room.helpers({
  isOwner: function (id) {
    return Meteor.user()._id === id
  }
});

Template.roomPage.helpers({
  messages:function(){
    return Messages.find({ room: window.currentRoom });
  }
});

Template.body.events({
  "submit .new-room, #add": function (event) {
    event.preventDefault();

    var text = event.target.text.value;

    Meteor.call('insertRoom', text);
    event.target.text.value = "";
  },
 
  "click .delete": function () {
    Meteor.call('removeRoom', this._id);
    Meteor.call('removeAllMessagesFromRoom', this._id);
    Router.go('home');
  }
});

Template.roomPage.events({
  "submit .new-message, #add": function (event) {
    event.preventDefault();
    var text = event.target.message.value;
    Meteor.call('insertMessage', text, window.currentRoom);
    event.target.message.value = "";
  },

});