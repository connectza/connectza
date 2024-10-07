const crypto = require('crypto');

// Generate a random string
const secret = crypto.randomBytes(32).toString('hex');
console.log(`Your JWT Secret: ${secret}`);