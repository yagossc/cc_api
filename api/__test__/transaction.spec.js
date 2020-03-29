const request = require('supertest');
const server = require('../server');

describe("POST /transaction", function(){
    it("returns sent transaction or an error", async function(done){
        var valid_transaction = {
            nsu:        '0451456',
            valor:      79.99,
            bandeira:   'VISA',
            modalidade: 'credito',
            horario:    '2019-01-04T12:43:20-03:00'
        };

        request(server.setup().app).
            post('/transaction').
            set('Accept', 'application/json').
            expect('Content-Type', /json/).
            send(valid_transaction).
            expect(200, valid_transaction).
            end(function(err, res){
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    });
})
