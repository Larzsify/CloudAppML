import { Meteor } from 'meteor/meteor';
import './accounts.js';

Meteor.startup(() => {
  // code to run on server at startup
});

//Meteor.methods({
//    addPresentation: function(name){
//        Presentations.insert({
//            name: name
//        });
//    },
//    deletePresentation: function(id){
//        Presentations.deleteOne(id);
//    }
//})