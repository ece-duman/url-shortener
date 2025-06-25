
const shortid = require('shortid');

exports.generateShortCode = () => {
  return shortid.generate();
};
