const snoowrap = require('snoowrap');
const RFeedEntry = require('../models/RedditFeedEntry');

const redditApi = new snoowrap({
    userAgent: 'testing',
    clientId: 'ToYqw8wJljlhNw',
    clientSecret: 'QeVE0pf8qmjZml3No92Y1ZOafCM',
    refreshToken: '22315002-Y7qONUZDQyJEiiBz9Cxz8eQhMHg'
});

class RedditService {

    me() {
      return redditApi.getMe().name;
    }

    get(query, limit=5) {
        return redditApi.search({ query, limit, sort: 'top' }).then(data => {
            return data.map(submission => {
                return new RFeedEntry(submission.title, submission.url, submission.author.name);
            });
        });
    }

}

module.exports = new RedditService();
