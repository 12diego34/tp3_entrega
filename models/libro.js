var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Libro = new mongoose.Schema({
	id: Schema.Types.ObjectId,
	gbook: Schema.Types.Mixed,
	precio: Schema.Types.Number,
	ranking_up: {type: Schema.Types.Number, default: 0},
	ranking_down: {type: Schema.Types.Number, default: 0},
});

module.exports = mongoose.model('Libro', Libro);