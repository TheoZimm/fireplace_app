const Twitter = require('twitter');
const TFeedEntry = require('../models/TwitterFeedEntry');


const twitterApi = new Twitter({
    consumer_key: 'jDb4TBs5YDP1ajHrZkHFh8UkA',
    consumer_secret: 'dCE3kPUgj3tkSVCXd8vVzcx5QFcfYsEbwSKaLblug1lAUMU8VR',
    access_token_key: '2698722140-hRjY7ogTrYl3Xvf2jE0fOx56esRu4hNjGmoRwy7',
    access_token_secret: '8kjt0B1rVnx0yWjlFAZ7qtjvcLtcZ6aBN7gGpuMZ9Lv23'
});


class TwitterService {

    me() {
        return new Promise(function(resolve, reject) {
           twitterApi.get('account/verify_credentials', function(error,user,response){
               if(error) reject(error);
               else resolve(user['screen_name']);
           });
        });
    }

    get(q, count=5) {
        // TODO: IMPROVE CODE
        return new Promise(function(resolve, reject) {
            twitterApi.get('search/tweets', {q, count}, function(error, tweets, response) {
                if(error) {
                    reject(error);
                    return;
                }
                let tweetsArray = [];
                for(let key in tweets.statuses) {
                    let tweet = tweets.statuses[key];
                    tweetsArray.push(new TFeedEntry(tweet.text, tweet.url, tweet.user.name));
                }
                resolve(tweetsArray);
            });
        });
    }
}

module.exports = new TwitterService();
