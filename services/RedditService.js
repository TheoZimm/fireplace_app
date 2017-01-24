const snoowrap = require('snoowrap');
const RFeedEntry = require('../models/RedditFeedEntry');

/* Initialize the credentials via the wrapper */
const redditApi = new snoowrap({
    userAgent: 'testing',
    clientId: 'ToYqw8wJljlhNw',
    clientSecret: 'QeVE0pf8qmjZml3No92Y1ZOafCM',
    refreshToken: '22315002-Y7qONUZDQyJEiiBz9Cxz8eQhMHg'
});

class RedditService {
    /* First request - get my username*/
    me() {
      return redditApi.getMe().name;
    }

    /* Second request - get 5 post from the query sorted by "hot" */
    /* limit value hardcoded because of reddit's API problems.*/
    get(query, limit) {
        return redditApi.search({ query, limit:5, sort: 'hot' +
        '' }).then(data => {
            return data.map(submission => {
                return new RFeedEntry(submission.title, submission.url, submission.author.name);

            });
        });
    }

}

module.exports = new RedditService();
