/*Creating the object Reddit FeedEntry that contains a URL a title and an author*/
module.exports = class RedditFeedEntry{

    constructor(entryTitle,entryUrl,entryAuthor){
        this.entryTitle = entryTitle;
        this.entryUrl = entryUrl;
        this.entryAuthor = entryAuthor;
    }
}

