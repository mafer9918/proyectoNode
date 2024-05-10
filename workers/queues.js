"use strict";

let redis = {
  host: "redis-14433.c267.us-east-1-4.ec2.redns.redis-cloud.com",
  port: 14433,
  password: "N4KDfICj0aE7S3OU1giupYjQOD6ZAb6U",
};

const { usersJob: usersJobWorker } = require("./workers");
const Queue = require("bull");
const usersJob = new Queue("usersJob", { redis });

usersJob.process(1, (job, done) => usersJobWorker(job, done));

const queues = [
  {
    name: "usersJob",
    hostId: "Job de creación de usuarios",
    redis,
  },
];
module.exports = {
  usersJob,
  queues,
};
