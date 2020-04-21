const request = require('supertest');
const server = require('../server');
const db = require('../../store/db');

let valid_transaction = {
    nsu:        '0451456',
    valor:      79.99,
    bandeira:   'VISA',
    modalidade: 'credito',
    horario:    '2019-01-04T12:43:20-03:00'
};

describe("GET /balance", function(){

    it("returns the total available balance", async function(done){
        await db.init('sqlite');

        const migrations = require('../../internal/migrations');
        await migrations.exec_migrations('sqlite', 'sqlite');

        await server.init();

        let app = server.get().app;

        // FIXME: add a relevant test
        request(app).
            get('/balance').
            set('Accept', 'application/json').
            expect('Content-Type', /json/).
            expect(200).
            end(function(err, res){
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    });
})
