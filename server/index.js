import express from 'express';
import bodyParser from 'body-parser'
import indexRoute from './src/routes/indexRoute'
import tableRoute from './src/routes/tableRoute'

var app = express();
const PORT = 3000;

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//bodyparser setup
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

indexRoute(app);
tableRoute(app);


app.get('/', (req, res) => {
  res.send(`Server is running at ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Your server is running at ${PORT}`);
});