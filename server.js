//for production build only. change package.json "start" to 'node server.js
const express = require('express');
const app = express();
app.use(express.static('./dist/front-end'));

app.get('/*', (req, res) => {
	res.sendFile('index.html', { root: 'dist/front-end' });
});
app.listen(process.env.PORT || 8080);
