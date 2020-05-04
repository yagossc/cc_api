const u = require('./user');
const t = require('./transaction');
const b = require('./balance');

module.exports.setup = function(app) {
    /**
     * @swagger
     * definitions:
     *   User:
     *     properties:
     *       name:
     *         type: string
     *       password:
     *         type: string
     *
     *   Token:
     *     properties:
     *       token:
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
     *
     *   Balance:
     *    properties:
     *       disponivel:
     *         type: number
     *       receber:
     *         type: number
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
     * /user:
     *   post:
     *     description: Sign up route
     *     produces:
     *      - application/json
     *     parameters:
     *      - name: name
     *        in: body
     *        schema:
     *           type: object
     *           $ref: '#/definitions/User'
     *     responses:
     *       200:
     *         description: A message containing the signed user's name.
     */
    app.post('/user', u.insertUser);

    /**
     * @swagger
     * /login:
     *   post:
     *     description: Authorizes a known user
     *     produces:
     *      - application/json
     *     parameters:
     *      - name: name
     *        in: formData
     *        description: The user's name.
     *        required: true
     *        type: string
     *      - name: password
     *        in: formData
     *        description: The user's password.
     *        required: true
     *        type: string
     *     responses:
     *       200:
     *         description: An access token.
     *         schema:
     *           type: object
     *           $ref: '#/definitions/Token'
     */
    app.post('/login', u.login);

    /**
     * @swagger
     * /transaction:
     *   get:
     *     description: Retrieves all transactions.
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: All available transactions.
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#/definitions/Transaction'
     */
    app.get('/transaction', t.getAll);

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
    app.post('/transaction', t.insertTransaction);

    /**
     * @swagger
     * /balance:
     *   get:
     *     description: Retrieves available balance.
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: The sum total of balance and future income.
     *         schema:
     *           type: object
     *           $ref: '#/definitions/Balance'
     */
    app.get('/balance', b.getBalance);

    // app.route('*').all(function(req, res){
    //     res.sendStatus(405);
    // });
}
