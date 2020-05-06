const request = require('supertest');
const server = require('../server');
const db = require('../../store/db');
const migrations = require('../../internal/migrations');
const transactionStore = require('../../store/transaction');
process.env.DISABLE_AUTH=true;

describe("GET /balance", function(){

    it("returns the total available balance", async function(done){

        let expectedBalance = { disponivel: 98, receber: 97 };

        await db.init('sqlite');
        await migrations.execMigrations('sqlite', 'sqlite');
        await server.init();
        await transactionStore.mock();

        let app = server.get().app;

        request(app).
            get('/balance').
            set('Accept', 'application/json').
            expect('Content-Type', /json/).
            expect(200, expectedBalance).
            end(function(err, res){
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    });
})
