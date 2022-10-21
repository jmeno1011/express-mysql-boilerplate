require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./config/winston');
const home = require('./routes/home.js');
const account = require('./routes/account.js');
const api = require('./routes/api.js');
// const { authenticateAccessToken } = require('./models/jwt');

const PORT = process.env.PORT || 4444;
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// test home route
app.use('/', home);
// account route
app.use('/', account);
app.use('/api', api);

// api route
// app.use('/api', authenticateAccessToken, api);

app.listen(PORT, () => logger.info(`Running http://localhost:${PORT}`));
