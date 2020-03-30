const request = require('supertest');
const server = require('../server');
const db = require('../../store/db');

describe("POST /transaction", function(){
    db.mock(function(err){
        console.error(err);
        process.exit(1);
    });

    const migrations = require('../../internal/migrations');
    err = migrations.exec_migrations('sqlite', 'sqlite');
    if (err != null){
        console.error(err);
        process.exit(1);
    }
    it("returns sent transaction or an error", async function(done){
        let valid_transaction = {
            nsu:        '0451456',
            valor:      79.99,
            bandeira:   'VISA',
            modalidade: 'credito',
            horario:    '2019-01-04T12:43:20-03:00'
        };

        let test_server = await server.init();
        request(test_server.app).
            post('/transaction').
            set('Accept', 'application/json').
            expect('Content-Type', /json/).
            send({
                nsu:        '0451456',
                valor:      79.99,
                bandeira:   'VISA',
                modalidade: 'credito',
                horario:    '2019-01-04T12:43:20-03:00'
            }).
            expect(200, valid_transaction).
            end(function(err, res){
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    });
})
