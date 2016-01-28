'use strict';

var express = require('express');
var app = express();
require('dotenv').load();

app.get('/*', function (req, res) {
	var received = req.params[0];
	var date = new Object();
	var output;
	if(Number(received)) {
		date.unix = Number(received);
		date.natural = unixToNatural(new Date(received*1000));
	} else if(!isNaN(Date.parse(received)/1000)) {
		date.unix = Date.parse(received)/1000;
		date.natural = received;
	} else {
		date.unix = null;
		date.natural = null;
	}
	output = JSON.stringify(date);
	res.send(output);
});

function unixToNatural (unix) {
	var year = unix.getFullYear();
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var month = months[unix.getMonth()];
	var day = unix.getDate();
	return month + ' ' + day + ', ' + year;
}

var port = process.env.PORT;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});