const request = require('supertest');
const server = require('../server');
const db = require('../../store/db');

describe("POST /transaction", function(){

    let valid_transaction = {
        nsu:        '0451456',
        valor:      79.99,
        liquido:    77.59,
        bandeira:   'VISA',
        modalidade: 'credito',
        horario:    '2019-01-04T12:43:20-03:00'
    };

    let result_transaction = {
        nsu: '0451456',
        valor: 79.99,
        liquido: 77.59,
        bandeira: 'VISA',
        modalidade: 'credito',
        horario: '2019-01-04T12:43:20-03:00',
        disponivel: '2019-02-04'
    };

    it("returns sent transaction or an error", async function(done){
        let initialized = await db.mock();

        const migrations = require('../../internal/migrations');
        let migrated = await migrations.exec_migrations('sqlite', 'sqlite');

        let test_server = await server.init();

        request(test_server.app).
            post('/transaction').
            set('Accept', 'application/json').
            expect('Content-Type', /json/).
            send(valid_transaction).
            expect(200, result_transaction).
            end(function(err, res){
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    });
})
