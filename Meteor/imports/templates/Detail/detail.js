import './detail.html';
import './addQuestion.js'

Meteor.subscribe('Types');
Meteor.subscribe('Questions')
Session.setDefault('newQuestion',false);

Template.DetailLayout.events({
   "click #back" (){
    FlowRouter.go('/');
    Session.set('newQuestion', false);
   },
    'click #createQuestion'(){
        Session.set('newQuestion', true);
        //Code to insert empty data
   },
});

Template.DetailLayout.helpers({
    newQuestion(){
        return Session.get('newQuestion');
    },
})                   
Template.Info.helpers({
        presentation(){
        //Gets all presentations associated with user
        var ID = Session.get('currentPresentationID');
        var data = Presentations.find({_id: ID});
        return data;
    },
});

Template.QuestionOverview.helpers({
    Questions(){
        var ID = Session.get('currentPresentationID');
        var data = Questions.find({PresentationID: ID});
        return data;
    }
});

Template.QuestionOverview.events({
    "click #edit"(){
        
    },
    "click #delete"(){
        Questions.remove(this._id);
    },
});

Template.Answers.helpers({
    answeroptions(){
        var currentPresentationID = Session.get('currentPresentationID');
        var data = AnswerOptions.find({QuestionID: ""});
    }
});
