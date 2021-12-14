require('dotenv').config();

const Caver = require('caver-js');
const caver = new Caver(process.env.SCN_URL);

module.exports = caver;