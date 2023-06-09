var express = require('express');
var router = express.Router();
var Joi = require('joi');
const winston = require('winston');

const schemaMob = Joi.object({
  mobName: Joi.string().alphanum().min(3).required(),
});

const schemaMember = Joi.object({
  memberName: Joi.string().min(3).required(),
});

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
  {
    mobId: 4,
    mobName: 'JAR',
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
  },
];

const logger = winston.createLogger({
  level: 'error',
  // format: winston.format.combine(
  //   winston.format.timestamp()
  // ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', timestamp: true }),
  ],
});

router.use((err, req, res, next) => {
  res.status(500).send('Something went wrong');
});

// Home
router.get('/', function (req, res, next) {
  res.send('Home');
});

// get all mobs
router.get('/mobs', function (req, res, next) {
  try {
    // Simulate error from Database(GET went wrong)
    if (!mobs) {
      throw new Error('No mob data');
    } else {
      // All good response
      res.status(302).res.json({ mobs });
    }
  } catch (error) {
    //Log error
    logger.error(error.message);
    res.status(404).send('Data does not exist');
  }
});

//  add a new mob
router.post('/mobs', function (req, res, next) {
  const validation = schemaMob.validate({ mobName: req.body.mobName });

  if (validation.error) {
    logger.error(validation.error.details[0].message);
    res.status(404).json(validation.error.details[0].message);
  } else {
    const newMob = {
      mobId: mobs.length + 1,
      mobName: validation.value.mobName,
    };
    mobs.push(newMob);
    res.status(201).setHeader('location', `/mobs/${newMob.mobId}`).json(mobs);
  }
});

// get a particular mob
router.get('/mobs/:mobId', function (req, res, next) {
  try {
    const id = req.params.mobId;
    const mob = mobs[id - 1];

    if (!mob) {
      throw new Error('This mob does not exist');
    } else {
      res.json(mob);
    }
  } catch (error) {
    logger.error(error.message);
    res.status(404).send('This mob does not exist');
  }
});

// get all mob members of a particular mob
router.get('/mobs/:mobId/members', function (req, res, next) {
  try {
    const mobID = +req.params.mobId;
    const arr = [];
    for (let i = 0; i < members.length; i++) {
      if (members[i].mobId === mobID) {
        arr.push(members[i]);
      }
    }

    if (!arr.length) {
      throw new Error('This mob does not exist & not members present');
    } else {
      res.json(arr);
    }
  } catch (error) {
    logger.error(error.message);
    res.status(404).send('This mob does not exist & not members present');
  }
});

// add a new mob-member to the mob
router.post('/mobs/:mobId/members', function (req, res, next) {
  const validation = schemaMember.validate({ memberName: req.body.memberName });

  if (validation.error) {
    logger.error(validation.error.details[0].message);
    res.status(404).json(validation.error.details[0].message);
  } else {
    const mobID = +req.params.mobId;
    const newMember = {
      mobId: mobID,
      memberId: members.length + 1,
      memberName: validation.value.memberName,
    };
    members.push(newMember);
    res.status(201).setHeader('location', `/mobs/${mobID}/${newMember}`).json(newMember);
  }
});

// get a particular mob-member of a particular mob
router.get('/mobs/:mobId/members/:memberId', function (req, res, next) {
  try {
    const mobId = +req.params.mobId;
    const memberId = +req.params.memberId;
    const result = members.filter(member => {
      return member.memberId === memberId && member.mobId === mobId;
    });

    if (!result.length) {
      throw new Error('Mob nor Member does not exist');
    } else {
      res.json(result);
    }
  } catch (error) {
    logger.error(error.message);
    res.status(404).send('Mob nor Member does not exist');
  }
});

module.exports = router;
