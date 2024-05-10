const express = require("express");
const api = express.Router();
const expressRedisCache = require("express-redis-cache");
var cacheController = require("../controllers/cacheController");

const cache = expressRedisCache({
  host: "redis-14433.c267.us-east-1-4.ec2.redns.redis-cloud.com",
  port: 14433,
  auth_pass: "N4KDfICj0aE7S3OU1giupYjQOD6ZAb6U",
  expire: 100,
});

api.get("/usuarios", cache.route(), cacheController.getAllUsers);

module.exports = api;
