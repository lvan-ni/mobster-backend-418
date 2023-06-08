var express = require('express');
var router = express.Router();
var Joi = require('joi');

const schemaMob = Joi.object({
  mobName: Joi.string()
    .alphanum()
    .min(3)
    .required(),
})

const schemaMember = Joi.object({
  memberName: Joi.string()
    .min(3)
    .required(),
})

const mobs = [
  {
    mobId: 1,
    mobName: '418',
  },
  {
    mobId: 2,
    mobName: 'TBD',
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
    memberName: 'Dean',
  },
  {
    mobId: 1,
    memberId: 3,
    memberName: 'Lee',
  },
  {
    mobId: 1,
    memberId: 4,
    memberName: 'Lvan',
  },
  {
    mobId: 2,
    memberId: 5,
    memberName: 'Seb',
  },
  {
    mobId: 2,
    memberId: 6,
    memberName: 'Michela',
  },
  {
    mobId: 2,
    memberId: 7,
    memberName: 'Diana',
  },
  {
    mobId: 2,
    memberId: 8,
    memberName: 'Hugo',
  },
  {
    mobId: 3,
    memberId: 9,
    memberName: 'Alex',
  },
  {
    mobId: 3,
    memberId: 10,
    memberName: 'Olle',
  },
  {
    mobId: 3,
    memberId: 11,
    memberName: 'Gustavo',
  }
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
  const validation = schemaMob.validate({mobName: req.body.mobName});

  if (validation.error) {
    res.status(404).json(validation.error.details[0].message)
  } else {
    const newMob = {
      mobId: mobs.length + 1,
      mobName: validation.value.mobName
    } 
    mobs.push(newMob);
    res.status(201).setHeader('location', `/mobs/${newMob.mobId}`).json(mobs);
  }
});

// get a particular mob
router.get('/mobs/:mobId', function (req, res, next) {
  const id = req.params.mobId;
  res.json(mobs[id - 1]);
});

// get all mob members of a particular mob
router.get('/mobs/:mobId/members', function (req, res, next) {
  const mobID = +req.params.mobId;
  // const arr = members.filter(member => member.mobId === mobID)
  const arr = []
  for (let i = 0; i < members.length; i++) {
    if (members[i].mobId === mobID) {
      arr.push(members[i])
    }
  }
  res.json(arr);
});

// add a new mob-member to the mob
router.post('/mobs/:mobId/members', function (req, res, next) {
  const validation = schemaMember.validate({memberName: req.body.memberName})

  if (validation.error) {
    res.status(404).json(validation.error.details[0].message);
  } else {
    const mobID = +req.params.mobId;
    const newMember = {
      mobId: mobID,
      memberId: members.length + 1,
      memberName: validation.value.memberName
    }
    members.push(newMember)
    res.status(201).setHeader('location', `/mobs/${mobID}/${newMember}`).json(newMember);
  }
});

// get a particular mob-member of a particular mob
router.get('/mobs/:mobId/members/:memberId', function (req, res, next) {
  const mobId = +req.params.mobId;
  const memberId = +req.params.memberId;
  const result = members.filter(member => {
    return member.memberId === memberId && member.mobId === mobId
  })
  res.json(result);
});

module.exports = router;
