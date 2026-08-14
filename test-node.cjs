const https = require('https');
https.get('https://drive.google.com/uc?export=download&id=1cUoBCqpMO48GS5dCRN4PW3rG7EhhQvoP', (res) => {
  console.log(res.statusCode, res.headers);
  if (res.statusCode === 302 || res.statusCode === 303) {
    https.get(res.headers.location, (res2) => {
      console.log(res2.statusCode, res2.headers['content-type']);
    });
  }
});
