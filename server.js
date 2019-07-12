'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
let cards = [
	{
		id: '7619e680-a43d-11e9-aa8a-7569a0b7c047',
		title: 'Card Title',
		content: 'This is where I would put the content, if I had any'
	}
];
let swimlanes = [
	{
		id: 'abab6e90-a43d-11e9-b378-fdce31a25b77',
		title: 'Swimlane Title',
		cards: [ '7619e680-a43d-11e9-aa8a-7569a0b7c047' ]
	}
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3001;

app.use('/', router);

router.post('/cards', function(req, res) {
	cards.push(req.body);
	res.send('message resceved');
});
router.get('/cards/:card_id', function(req, res) {
	res.send(cards.find((card) => card.id == req.params.card_id));
});
router.put('/cards/:card_id', function(req, res) {
	let update = cards.find((card) => card.id == req.params.card_id);
	update.color = req.body.color || update.color;
	update.body = req.body.body || update.body;
	update.title = req.body.title || update.title;
});

router.post('/swimlane', function(req, res) {
	swimlanes.push(req.body);
	res.send('message resceved');
});
router.get('/swimlanes', function(req, res) {
	res.send(swimlanes);
});
app.listen(port);
console.log('Uplink acquired on port ' + port);
