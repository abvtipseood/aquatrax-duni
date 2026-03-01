const https = require('https');

https.get('https://ibb.co/3y0hVvXM', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/https:\/\/i\.ibb\.co\/[^"']+/g);
    console.log('3y0hVvXM:', match ? match[0] : 'not found');
  });
});

https.get('https://ibb.co/q3chvD9M', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/https:\/\/i\.ibb\.co\/[^"']+/g);
    console.log('q3chvD9M:', match ? match[0] : 'not found');
  });
});

https.get('https://ibb.co/rGSWXsyK', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/https:\/\/i\.ibb\.co\/[^"']+/g);
    console.log('rGSWXsyK:', match ? match[0] : 'not found');
  });
});
