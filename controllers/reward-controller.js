const Reward = require("../models/rewards-model");
const UserReward = require("../models/userReward")
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const passwordHash = require("password-hash");
const { Op } = require("sequelize");

const createReward = async (req, res) => {
  try {
    let body = req.body;
    await Reward.create(body);
    return res.json({ status: 1, message: "Reward Created" });
  } catch (error) {
    return res.json({ status: 0, message: error.message });
  }
}

const getAllRewards = async (req, res) => {
  try {
    let data = await Reward.findAll({
      order: [['createdAt', 'DESC'],
      ], where: { status: { [Op.not]: '-1' } }
    })
    return res.json({ status: 1, data: data });
  } catch (error) {
    // console.log(error.message);
    return res.json({ status: 0, message: error.message });
  }
}

const updateReward = async (req, res) => {
  try {
    var id = req.params.id;
    await Reward.update(req.body, { where: { _id: id } });
    res.json({ status: 1 });
  } catch (error) {
    res.json({ status: 0, message: error.message });
  }

}

const redeemReward = async (req, res) => {
  try {
    const userId = req.body.userId;
    const rewardId = req.params.id
    console.log(userId);
    console.log(rewardId);


    // Validate if userId and rewardId are present
    if (!userId || !rewardId) {
      throw new Error('userId and rewardId are required');
    }
    let user = await User.findOne({ where: { _id: userId } })
    let reward = await Reward.findOne({ where: { _id: rewardId } })
    if (user.points < reward.rewardPoints)
      throw { message: "You don't have enought points to redeem this reward" }
    user.points = user.points - reward.rewardPoints;
    console.log(user.points);
    user.save();
    // Create a new entry in the UserReward model
    const userReward = await UserReward.create({ userId, rewardId });

    res.json({ status: 1, message: 'Reward redeemed successfully', userReward });
  } catch (error) {
    res.json({ status: 0, message: error.message });
  }

}



const getAllUserRewards = async (req, res) => {
  try {
    userId = req.body.userId;
    let data = await Reward.findAll({
      order: [['createdAt', 'DESC'],
      ], where: { status: '1' }
    })
    let redeemedRewards = await UserReward.findAll({ where: { userId: userId } });
    let notRedeemedRewards = [];

    for (let reward of data) {
      let isRedeemed = redeemedRewards.some((redeemedReward) => redeemedReward.rewardId === reward._id);
      if (!isRedeemed) {
        notRedeemedRewards.push(reward);
      }
    }

    return res.json({ status: 1, data: notRedeemedRewards });
  } catch (error) {
    // console.log(error.message);
    return res.json({ status: 0, message: error.message });
  }
}


const getAllUserRedeemedRewards = async (req, res) => {
  try {
    userId = req.body.userId;
    let data = await Reward.findAll({
      order: [['createdAt', 'DESC'],
      ], where: { status: '1' }
    })
    let redeemedRewardsPivot = await UserReward.findAll({ where: { userId: userId } });
    let redeemedRewards = [];

    for (let reward of data) {
      let isRedeemed = redeemedRewardsPivot.some((redeemedReward) => redeemedReward.rewardId === reward._id);
      if (isRedeemed) {
        redeemedRewards.push(reward);
      }
    }

    return res.json({ status: 1, data: redeemedRewards });
  } catch (error) {
    // console.log(error.message);
    return res.json({ status: 0, message: error.message });
  }
}


module.exports = { updateReward, getAllRewards, createReward, getAllUserRewards, redeemReward, getAllUserRedeemedRewards }