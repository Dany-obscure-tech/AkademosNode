const auth = require('../middleware/authentication');
const router = require('express').Router();
const Reward = require('../controllers/reward-controller');

router.post('/create', auth, Reward.createReward)
router.get('/allReward', auth, Reward.getAllRewards)
router.get('/app/allReward', Reward.getAllUserRewards)
router.get('/app/redeemedRewards', Reward.getAllUserRedeemedRewards)
router.post('/update/:id', auth, Reward.updateReward)
router.post('/redeem/:id', Reward.redeemReward)

module.exports = router;