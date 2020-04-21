const request = require('supertest');
const server = require('../server');
const db = require('../../store/db');
const migrations = require('../../internal/migrations');
const transaction_store = require('../../store/transaction')

describe("GET /balance", function(){

    it("returns the total available balance", async function(done){

        let expected_balance = { disponivel: 98, receber: 97 };

        await db.init('sqlite');
        await migrations.exec_migrations('sqlite', 'sqlite');
        await server.init();
        await transaction_store.mock();

        let app = server.get().app;

        request(app).
            get('/balance').
            set('Accept', 'application/json').
            expect('Content-Type', /json/).
            expect(200, expected_balance).
            end(function(err, res){
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    });
})
