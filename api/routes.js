const u = require('./user');
const t = require('./transaction');

module.exports.setup = function(app) {
    /**
     * @swagger
     * definitions:
     *   User:
     *     properties:
     *       username:
     *         type: string
     *       password:
     *         type: string
     *       email:
     *         type: string
     *
     *   Transaction:
     *    properties:
     *       nsu:
     *         type: string
     *       valor:
     *         type: string
     *       bandeira:
     *         type: string
     *       modalidade:
     *         type: string
     *       horario:
     *         type: string
     */


    /**
     * @swagger
     * /:
     *   get:
     *     description: Returns the root of the api
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: A 'hello world'.
     *         schema:
     *           type: string
     */
    app.get('/', function(req, res) {
        res.end('Initial page');
    });

    /**
     * @swagger
     * /users:
     *   get:
     *     description: Returns users
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: users
     *         schema:
     *           type: object
     *           $ref: '#/definitions/User'
     */
    app.get('/users', u.get_all_users);

    /**
     * @swagger
     * /transaction:
     *   post:
     *     description: Receives a transaction.
     *     produces:
     *      - application/json
     *     parameters:
     *      - name: transaction
     *        description: Transacao a ser enviada
     *        in: body
     *        schema:
     *           type: object
     *           $ref: '#/definitions/Transaction'
     *     responses:
     *       200:
     *         description: Received transactions.
     *         schema:
     *           type: object
     *           $ref: '#/definitions/Transaction'
     */
    app.post('/transaction', t.insert_transaction);

}
