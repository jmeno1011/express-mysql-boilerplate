require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./config/winston');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/', require('./routes/home.js'));

app.listen(PORT, () => logger.info(`Running http://localhost:${PORT}`));
