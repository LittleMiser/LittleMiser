var mongoose = require('mongoose');
var db = require('./db.js');
var Schema = mongoose.Schema;
var Mixed = Schema.Types.Mixed;

let paper = new Schema({
  creator: { type: String }, // account of the creator user
  title: { type: String },
  detail: { type: String },
  questions: { type: Mixed },
  state: { type: Number, default: 0 }, // 0: unpublished, 1: published
  answers: { type: Array },
  createAt: { type: Date, default: new Date() },
  deadLine: { type: Date, default: new Date() }
});

module.exports = db.model('papers', paper);
