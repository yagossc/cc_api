const supertest = require('supertest');
const server = require('../server');
const express = require('express');
const app = express();

describe("Testing API", function() {

    it("Tests the base route of the site", async function(){

        // Setup server
        const s = server.setup(app);

        // Start listening
        const connection = server.start(s, '8080');

        const response =  await supertest(connection).get('/');

        expect(response.status).toBe(200);

        connection.close();
    })
});
