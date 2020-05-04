const request = require('supertest');
const server = require('../server');
const db = require('../../store/db');
const migrations = require('../../internal/migrations');
const store = require('../../store/user');

describe("POST /user", function(){
    it("inserts a new user", async function(done){
        let newUser = {name: 'test', password: 'user'}
        let expected = { message: "User 'test' created." }

        await db.init('sqlite');
        await migrations.execMigrations('sqlite', 'sqlite');
        await server.init();

        let app = server.get().app;

        request(app).
            post('/user').
            set('Accept', 'application/json').
            expect('Content-Type', /json/).
            send(newUser).
            expect(200, expected).
            end(function(err, res){
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    })
});
