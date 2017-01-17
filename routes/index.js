var express = require('express');
var router = express.Router();


router.get('/', function (req, res){
  const rUsername = req.app.get('rUsername');
  const tUsername = req.app.get('tUsername');
    const rFeed = req.app.get('rFeed');
    const tFeed = req.app.get('tFeed');
  res.render(
    'index',
    {title:'FirePlace', rUsername:rUsername, tUsername:tUsername, rFeed:rFeed, tFeed:tFeed}
  )
});

router.get('/research', function (req, res){
    res.render(
        'index',
        {title:'FirePlace', rUsername:rUsername, tUsername:tUsername}
    )
});
  module.exports = router;
