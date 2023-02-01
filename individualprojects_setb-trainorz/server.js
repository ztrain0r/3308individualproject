const axios = require('axios');
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


//Create Database Connection
var pgp = require('pg-promise')();

// FOR LOCAL HOST
const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'lab_db',
	user: 'postgres',
	password: 'pwd'
};

app.listen(3000);

// // FOR HEROKU
// let dbConfig = {
// 	host: 'localhost',
// 	port: 5432,
// 	database: 'lab_db',
// 	user: 'postgres',
// 	password: 'pwd'
// };

// // FOR HEROKU
// const isProduction = process.env.NODE_ENV === 'production';
// dbConfig = isProduction ? process.env.DATABASE_URL : dbConfig;
// if (isProduction) {
// 	pgp.pg.defaults.ssl = {rejectUnauthorized: false};
// }

let db = pgp(dbConfig);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
	console.log(`Express running → PORT ${server.address().port}`);
});

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
	// res.json({ status: "success", message: "Successfully rendered home page" });
	res.render('pages/main',{
		local_css:"style.css",
		my_title:"Home"
	});
});

// Saves search results
app.post('/save', function(req, res) { 
	var nameQ = req.body.name;
	var premieredQ = req.body.premiered;
	var statusQ = req.body.status;
	var languageQ = req.body.language;
	var summaryQ = req.body.summary;
	var insert_statement = `INSERT INTO history (showTitle, premierDate, showStatus, showLanguage, showSummary) VALUES ('${nameQ}', '${premieredQ}', '${statusQ}', '${languageQ}', '${summaryQ}');`
	console.log("insert", insert_statement);
	db.task('get-everything', task => {
        return task.batch([
            task.any(insert_statement)
        ]);
    })
	.then(info => {
		console.log('success');
		res.status(201).send('Success!');

    })
    .catch(err => {
        console.log('error', err);
		res.status(500).send(err);
    });
});

// Gets all search results and displays them on searches page
app.get('/searches', (req, res) => {
	// res.json({ status: "success", message: "Successfully rendered history page" });
    db.any('SELECT * FROM history;')
            .then(function (rows) {
                res.render('pages/searches', {
                    my_title: "Search History",
					local_css: "style.css",
                    data: rows
                })
				console.log("data test", rows)
            })
            .catch(function (err) {
                console.log("Error")
                res.render('pages/searches', {
                    my_title: 'Search History',
                    data: ''
                })
            })
})
