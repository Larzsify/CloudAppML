Questions = new Mongo.Collection('questions');
//ID
//PresentationID
//Question
//TypeID


Meteor.methods({
    'Questions.new' (question, type, presID){
        
        var TypeID = null;
        var multiple = null;
        
        TypeID = Types.findOne({name:type});
        
        //Insert Question
        var QuestionID = Questions.insert({
            QuestionString: question,
            Type : type,
            PresentationID: presID,
            Show : true
        });
        
        //If the question is multiple choice put 2 empty entries ina answeroptions collection
        if(type = "multipleChoice")
        {
            for(var i = 0; i<2; i++)
            {
                AnswerOptions.insert({
                    QuestionID: QuestionID,
                    AnswerString: ""
                });
            }
        }
    },
    'Questions.remove'(ID){
        Questions.remove(ID);
    },
    'Questions.update.name'(newName, questionID){
        Questions.update(questionID, {
            $set: { QuestionString: newName}
        });
    },
    'Questions.update.type'(QuestionID, TypeID){
                Questions.update(QuestionID,{
            $set: {TypeID: TypeID}
        });
    },
    'Questions.update.AnswerOptions' (optionId, value){
                AnswerOptions.update(optionId,{
                $set: {AnswerString: value}
            });
    }
})

/*
QuestionSchema = new SimpleSchema({
QuestionString : {
        type: String
    },
    TypeID: {
        type: String
    },
    QuestionID: {
        type: String
    },
    PresentationID: {
        type: String
    },
});
Questions.attachSchema(QuestionSchema);
*/
