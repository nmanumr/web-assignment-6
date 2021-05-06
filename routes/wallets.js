var router = require('express').Router();

let wallets = [
    {id: 1, name: 'HBL', isBank: true, balance: 10_000, created_on: new Date(), last_modified: new Date()},
    {id: 2, name: 'UBL', isBank: true, balance: 10_000, created_on: new Date(), last_modified: new Date()},
    {id: 3, name: 'ABL', isBank: true, balance: 10_000, created_on: new Date(), last_modified: new Date()},
    {id: 4, name: 'MBL', isBank: true, balance: 10_000, created_on: new Date(), last_modified: new Date()}
];

let counter = wallets.length;

router.route('/')
    .get((req, res) => {
        res.json(wallets);
    })
    .post((req, res) => {
        console.log(req.body);
        if (!req.body.name || !req.body.balance) {
            return res.status(400).send(`Bad request. 'name' and 'balance' are required.`);
        }

        let wallet = {
            id: ++counter,
            name: req.body.name,
            balance: req.body.balance,
            isBank: req.body.isBank || false,
            created_on: new Date(),
            last_modified: new Date(),
        };
        wallets.push(wallet);

        res.json(wallet);
    });


router.route('/:id')
    .get((req, res) => {
        let wallet = wallets.find(({id}) => id == req.params.id);
        if (!wallet) {
            return res.status(404).send(`Wallet with id ${req.params.id} not found.`);
        }

        return res.json(wallet);
    })
    .put((req, res) => {
        let wallet = wallets.find(({id}) => id == req.params.id);
        if (!wallet) {
            return res.status(404).send(`Wallet with id ${req.params.id} not found.`);
        }

        wallet.name = req.body.name;
        wallet.isBank = req.body.isBank;
        wallet.last_modified = new Date();
        
        return res.json(wallet);
    })
    .delete((req, res) => {
        let wallet = wallets.find(({id}) => id == req.params.id);
        if (!wallet) {
            return res.status(404).send(`Wallet with id ${req.params.id} not found.`);
        }

        wallets = wallets.filter(({id}) => id != req.params.id);
        return res.json(wallet);
    })

module.exports = router;