/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
const dotenv = require('dotenv');

dotenv.config({ path: './.env.deploy' });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_REF, DEPLOY_PATH, DEPLOY_REPO } =
  process.env;

module.exports = {
  apps: [
    {
      name: 'api-service',
      script: './dist/app.js',
    },
  ],

  deploy: {
    production: {
      NODE_ENV: 'production',
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `bash scripts/deployEnv.sh ${DEPLOY_USER}@${DEPLOY_HOST} ${DEPLOY_PATH}`,
      'post-deploy':
        'cd backend && yarn install && yarn build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
