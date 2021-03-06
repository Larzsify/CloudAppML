ClassRooms = new Mongo.Collection('classrooms');

ClassRoomSchema = new SimpleSchema({
    PresentationID: {
        type: String
    },
    currentQuestionID: {
        type: String
    },
    AccessCode: {
        type: Number
    }
    
});

ClassRooms.attachSchema(ClassRoomSchema);

Meteor.methods({
    "ClassRooms.new" (presID, code){
        var Q = null;
        
        Q = Questions.find({
            PresentationID: presID
        }).fetch(); 
        console.log("First Question: " + Q[0].QuestionString);
        
        

               ClassRooms.insert({
            PresentationID: presID,
           //Sets the first question
            currentQuestionID: Q[0]._id,
            AccessCode: code
            });
    },
    "ClassRooms.nextQuestion"(qID, rID){        
        ClassRooms.update(rID ,{
            $set: {currentQuestionID: qID}
        });

    },
    "ClassRooms.remove"(ClassRoomID){
        ClassRooms.remove({_id: ClassRoomID});
    },
    "ClassRooms.Answer"(ID, AnswerString){
        var questionid = ID;
        var answerstring = AnswerString;
        Answers.insert({
            AnswerString: answerstring
            , QuestionID: questionid
        });
    }
});