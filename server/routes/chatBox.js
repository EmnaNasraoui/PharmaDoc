const router = require('express').Router()
var mongoose = require('mongoose');
var User = require('./../models/user');
var Chats = require('./../models/chat');
var passport = require('passport');


router.post('/sendMessage/:idChat',passport.authenticate('bearer', { session: false }),function (req,res){
    Chats.findById(req.params.idChat, function(err, chat){
        if(err){
            res.send(err);
        }
        const io = req.app.get('io');
        chat.messages.push(req.body);
        console.log(chat )
        Chats.findByIdAndUpdate(chat._id, {$set: {messages: chat.messages}}, function(err2, Chats2) {
            io.emit('newmessagesended', Chats2);
        })
    })
});

router.get('/getPrivateMessage/:idUser1/:idUser2',passport.authenticate('bearer', { session: false }), function (req,res){
       Chats.findOne({userOne: req.params.idUser1, userTwo:req.params.idUser2}, function(err,Chats1) {
        if(err){
            res.send(err);
        }
        if(!Chats1){
          Chats.findOne({userOne: req.params.idUser2, userTwo:req.params.idUser1}, function(err2, Chats2) {
              if(err2) {
                  res.send(err2);
              }
              if(!Chats2) {
                var chats = new Chats({userOne: req.params.idUser1, userTwo: req.params.idUser2, messages: []});
                chats.save( function(err3,chats){
                    if(err3) {
                        res.send(err3)
                    }
                    res.send(chats);
                });
              }else{
              res.send(Chats2);
            }
          })

        } else {
            res.send(Chats1);
        }
    });

});


/* router.post('/message', async (req, res)  => {
    const getConversation = await Chats.findOne({ userOne: req.body.userOne, userTwo: req.body.userTwo });
    const getConversation2 = await Chats.findOne({ userOne: req.body.userTwo, userTwo: req.body.userOne });
    if (getConversation) {
      const setMessage = await Chats.updateOne(getConversation, { $addToSet: { messages: req.body.messages } });
      res.send(setMessage);
       req.app.io.emit('sendMessage');
    }
    else if (getConversation2) {
      const setMessage = await Chats.updateOne(getConversation2, { $addToSet: { messages: req.body.messages } });
      res.send(setMessage);
       req.app.io.emit('sendMessage');

    }
    else {
      var Chat = new Chats(req.body);
        Chat.save();
      res.send(Chat);
       req.app.io.emit('sendMessage');
    }
  });

  router.get('/message/:id', async (req, res) => {
    const messageId = [];
    const getMessage = await Chats.find({ userOne: req.params.id });
    const getMessage2 = await Chats.find({ userTwo: req.params.id });
    for (j = 0; j < getMessage.length; j++) {
      messageId.push(getMessage[j].userTwo);
    }
    for (i = 0; i < getMessage2.length; i++) {
      messageId.push(getMessage2[i].userOne);
    }
    res.send(messageId);
    req.app.io.emit('getAllMessage', messageId);
 });

 router.post('/conversation/:id', async (req, res) => {
  const getConversation = await Chats.findOne({ userOne: req.params.id, userTwo: req.body.id });
  const getConversation2 = await Chats.findOne({ userOne: req.body.id, userTwo: req.params.id });
  if (getConversation) {
    res.send(getConversation);

    req.app.io.emit('privateMessage', getConversation);
  } else {
    res.send(getConversation2);
    req.app.io.emit('privateMessage', getConversation2);
  }
}); */
module.exports = router
