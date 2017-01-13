const express = require('express');
const app     = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(function(req, res, next){
  if(req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static(__dirname + '/public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public', 'index.html'));
});

app.listen(PORT, function(){
  console.log("Server is now listening on port " + PORT);
});
