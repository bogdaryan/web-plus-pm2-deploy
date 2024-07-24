const dotenv = require("dotenv");

dotenv.config({ path: "./.env.deploy" });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_REF, DEPLOY_PATH, DEPLOY_REPO } =
  process.env;

module.exports = {
  deploy: {
    production: {
      NODE_ENV: "production",
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      "post-deploy": "cd frontend && npm install && npm run build",
    },
  },
};
