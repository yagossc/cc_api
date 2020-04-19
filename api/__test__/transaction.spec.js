const request = require('supertest');
const server = require('../server');
const db = require('../../store/db');

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

describe("POST /transaction", function(){

    it("returns inserted transaction", async function(done){
        await db.mock();

        const migrations = require('../../internal/migrations');
        await migrations.exec_migrations('sqlite', 'sqlite');

        await server.init();

        let app = server.get().app;

        request(app).
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

    it("returns an invalid input error", async function(done){

        let app = server.get().app;
        request(app).
            post('/transaction').
            set('Accept', 'application/json').
            expect('Content-Type', /json/).
            send({
                nsu: "",
            }).
            expect(400, { message: "Invalid 'NSU' for transaction." }).
            end(function(err, res){
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    });
})

describe("GET /transaction", function(){
    it("gets all transactions", async function(done){
        let app = server.get().app;

        request(app).
            get('/transaction').
            set('Accept', 'application/json').
            expect('Content-Type', /json/).
            expect(200, [result_transaction]).
            end(function(err, res){
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    })
})
