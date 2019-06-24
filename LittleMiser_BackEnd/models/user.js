var mongoose = require('./db'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    Identity:String,
	Contact:String,
	Code:String,
	NickName:String,
	Name:String,
	old:String,
	StudentNum:String,
	Sex:String,
	Grade:String,
	Major:String,
	Money:Number


})

module.exports = mongoose.model('User', UserSchema);

