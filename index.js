require("dotenv").config();
const Twitter = require("twitter");
const createTweetImage = require("./createImage");
const pushGist = require("./pushGist");
const { formatDistanceStrict } = require("date-fns");

require("request");
const request = require("request-promise");

const {
  TWITTER_USER: twitterHandle,
  TWITTER_CONSUMER_KEY: consumerKey,
  TWITTER_CONSUMER_SECRET: consumerSecret,
  TWITTER_ACCESS_TOKEN_KEY: accessTokenKey,
  TWITTER_ACCESS_TOKEN_SECRET: accessTokenSecret
} = process.env;

const twitter = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessTokenKey,
  access_token_secret: accessTokenSecret
});

async function main() {
  const timeline = await twitter.get("statuses/user_timeline", {
    screen_name: twitterHandle,
    count: 50,
    trim_user: 1,
    exclude_replies: true,
    include_rts: false
  });

  const tweet = timeline[0];
  await updateGist(tweet);
}

async function updateGist(tweet) {
  const parsedDate = new Date(tweet.created_at);
  const timeAgo = formatDistanceStrict(parsedDate, new Date());

  const imageUrl = await createTweetImage(tweet.id_str);
  console.log(imageUrl);
  const filename = `@${twitterHandle} - ${timeAgo} ago | ❤ ${
    tweet.favorite_count
  } | 🔁 ${tweet.retweet_count}`;

  try {
    await pushGist(imageUrl, filename);
  } catch (error) {
    console.error(`Unable to update gist\n${error}`);
  }
}

(async () => {
  await main();
})();
