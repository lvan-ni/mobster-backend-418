var express = require('express');
var router = express.Router();

const mobs = [
  {
    id: 1,
    name: '418',
  },
  {
    id: 2,
    name: 'TBG',
  },
  {
    id: 3,
    name: 'LOGA',
  },
];

const members = [
  {
    memberId: 1,
    name: 'Nadia',
    mobId: 1,
  },
  {
    memberId: 2,
    name: 'Lvan',
    mobId: 1,
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
    id: mobs.length + 1,
    name: req.body.name
  };

  mobs.push(newMob);

  res.status(201).setHeader('location', `/mobs/${newMob.id}`).json(mobs);

});

// get a particular mob
router.get('/mobs/:mobId', function (req, res, next) {
  const id = req.params.id;
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
