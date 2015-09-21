Meteor.publish('rooms', function() {
  return Rooms.find();
});

Meteor.publish('messages', function() {
  return Messages.find();
});

Meteor.methods({
  "removeAllMessagesFromRoom" : function (value) {
    Messages.remove({room: value});
    // Rooms.remove(value);
  },

  "insertMessage" : function (value, curroom) {
    Messages.insert({
      name: value,
      owner_name: Meteor.user().emails[0].address,
      owner: Meteor.userId(),
      room: curroom
    });
  },

  "removeAllMessages" : function () {
    Messages.remove({});
  },
  
  "insertRoom" : function (value) {
    Rooms.insert({
      name: value,
      owner: Meteor.userId()  
    });
  }, 

  "removeRoom" : function (value) {
    Rooms.remove({_id: value});
  }
})