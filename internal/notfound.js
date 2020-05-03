module.exports.handler = function(req, res, next){
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.send('<html><head></head><body><h1>Not fucking found.</h1></body></html>')
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');

}
