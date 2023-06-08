var express = require('express');
var router = express.Router();
var { v4: uuidv4 } = require('uuid');

const UUID = uuidv4();

const mobs = [
  {
    mobId: 1,
    mobName: '418',
  },
  {
    mobId: 2,
    mobName: 'TBG',
  },
  {
    mobId: 3,
    mobName: 'LOGA',
  },
];

const members = [
  {
    mobId: 1,
    memberId: 1,
    memberName: 'Nadia',
  },
  {
    mobId: 1,
    memberId: 2,
    memberName: 'Lvan',
  },
];

// Home
router.get('/', function (req, res, next) {
  res.send('Home');
});

// get all mobs
router.get('/mobs', function (req, res, next) {
  res.json({ mobs });
});

//  add a new mob
router.post('/mobs', function (req, res, next) {
  const newMob = {
    mobId: mobs.length + 1,
    mobName: req.body.name
  };
  mobs.push(newMob);
  res.status(201).setHeader('location', `/mobs/${newMob.mobId}`).json(mobs);
});

// get a particular mob
router.get('/mobs/:mobId', function (req, res, next) {
  const id = req.params.mobId;
  res.json(mobs[id - 1]);
});

// get all mob members of a particular mob
router.get('/mobs/:mobId/members', function (req, res, next) {
  res.json('members');
});

// add a new mob-member to the mob
router.post('/mobs/:mobId/members', function (req, res, next) {
  res.send('mobs');
});

// get a particular mob-member of a particular mob
router.get('/mobs/:mobId/members/:memberId', function (req, res, next) {
  res.send('mobs');
});

module.exports = router;
