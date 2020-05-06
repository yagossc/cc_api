const request = require('supertest');
const server = require('../server');
const db = require('../../store/db');
process.env.DISABLE_AUTH=true;

let validTransaction = {
    nsu:        '0451456',
    valor:      79.99,
    bandeira:   'VISA',
    modalidade: 'credito',
    horario:    '2019-01-04T12:43:20-03:00'
};

let resultTransaction = {
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
        await db.init('sqlite');

        const migrations = require('../../internal/migrations');
        await migrations.execMigrations('sqlite', 'sqlite');

        await server.init();

        let app = server.get().app;

        request(app).
            post('/transaction').
            set('Accept', 'application/json').
            expect('Content-Type', /json/).
            send(validTransaction).
            expect(200, resultTransaction).
            end(function(err, res){
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    });

    it("returns an invalid 'nsu' error", async function(done){

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

    it("returns an invalid 'valor' error", async function(done){

        let app = server.get().app;
        request(app).
            post('/transaction').
            set('Accept', 'application/json').
            expect('Content-Type', /json/).
            send({
                nsu: "1234",
                valor: -1,
            }).
            expect(400, { message: "Invalid 'valor' for transaction." }).
            end(function(err, res){
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    });

    it("returns an invalid 'bandeira' error", async function(done){

        let app = server.get().app;
        request(app).
            post('/transaction').
            set('Accept', 'application/json').
            expect('Content-Type', /json/).
            send({
                nsu: "1234",
                valor: 123,
                bandeira: "nope",
            }).
            expect(400, { message: "Invalid 'bandeira' for transaction." }).
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
            expect(200, [resultTransaction]).
            end(function(err, res){
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    })
})
