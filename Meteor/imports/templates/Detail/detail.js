import './detail.html';
import './addQuestion.js'

Meteor.subscribe('Types');
Meteor.subscribe('Questions', Session.get('currentPresentationID'));
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
Template.Info.events({
    "submit #newPresentationName"(e){
        e.preventDefault();
        const target = e.target;
        const presentationString = target.name.value;
        
        Presentations.update(this._id, {
            $set: { name: presentationString}
        });
    },
    "click #ok"(){
         $('#myModal').modal('hide');
    }
})

Template.QuestionOverview.helpers({
    Questions(){
        var ID = Session.get('currentPresentationID');
        var data = Questions.find({PresentationID: ID});
        return data;
    },
    TypeID(){
        var MultiplereferenceID = Types.findOne({
            name: "Multiple Choice"
        });
        var OpenreferenceID = Types.findOne({
            name: "Open"
        });
        if(this.TypeID === MultiplereferenceID._id)
        {
        return "Multiple Choice";
        }
        else if(this.TypeID === OpenreferenceID._id)
        {
            return "Open";
        }

    }
});

Template.QuestionOverview.events({
    "click #edit"(){
        var presID = Session.get('currentPresentationID');
        FlowRouter.go('/presentations/'+presID+'/question/'+this._id);
    },
    "click #delete"(){
        Questions.remove(this._id);
    },
});

