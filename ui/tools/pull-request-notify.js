const slackNotifier = require('./slack-notifier');
const axios = require('axios');

const {
  BUILD_ID, BUILD_OUTPUT_URL, BUILD_STATUS,
  REPOSITORY_NAME, PR_ID, SLACK_CHANNEL,
  HEARTLAND_USERNAME, HEARTLAND_PASSWORD } = process.env;

async function main() {
  await slackNotifier.send({
    channel: SLACK_CHANNEL,
    text: [
      '@channel',
      `*Pull Request ${PR_ID}*`,
      `Jenkins Build Status: ${BUILD_STATUS}`,
      `Jenkins Build Number: ${BUILD_ID}`,
      `Pull Request URL: https://bit.heartlandcommerce.com/projects/HC/repos/${REPOSITORY_NAME}/pull-requests/${PR_ID}/overview`,
      `Jenkins Build Console: ${BUILD_OUTPUT_URL}`,
    ].join('\n'),
  });

  await axios({
    method: 'post',
    url: `https://${HEARTLAND_USERNAME}:${HEARTLAND_PASSWORD}@bit.heartlandcommerce.com/rest/api/1.0/projects/HC/repos/${REPOSITORY_NAME}/pull-requests/${PR_ID}/comments`,
    data: {
      text: [
        `Jenkins Build Status: ${BUILD_STATUS}`,
        `Jenkins Build Number: ${BUILD_ID}`,
        `Jenkins Build Console: ${BUILD_OUTPUT_URL}`,
      ].join('\n'),
    },
  });
}

main()
  .then(() => process.exit())
  .catch(error => {
    console.log(error);

    process.exit(1);
  });
