const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/dist/chefo-design')))

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/chefo-design/index.html'))
})


app.listen(PORT, ()=>{
    console.log(`Server Started At Port> ${PORT}`);
})
