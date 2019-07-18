// Fill out the Twitter Keys and then choose Run -> Start Bot

TWITTER_CONSUMER_KEY    = "EM0QOgLhND9PRBxmgJ2qkWTDK";
TWITTER_CONSUMER_SECRET = "YuhwFNYy84ehKMNJ2zggIYpPjjWora9DM70L8H40yyvMZJnxgZ";
TWITTER_ACCESS_TOKEN    = "1115692439329619968-BVtRLBvVsl4fAcW1b5U6fiCai9pVX2";
TWITTER_ACCESS_SECRET   = "JevuITjZQOueE2hrykiAeHyaQvZa2hbrSRROwniFJFB5P";
TWITTER_SEARCH_PHRASE   = "@Partagetonhot"; // ex. "#DevFest -RT" (the "-RT" excludes re-Tweets)

function Start_Bot() {
  var props = PropertiesService.getScriptProperties();
  
  props.setProperties({
    TWITTER_CONSUMER_KEY: TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET: TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN: TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_SECRET: TWITTER_ACCESS_SECRET,
  });
  
  ScriptApp.newTrigger("hashtag_twitterBot")
  .timeBased()
  .everyMinutes(5)
  .create();
}

function hashtag_twitterBot() {
  try {
    var props = PropertiesService.getScriptProperties(),
        twit = new Twitter.OAuth(props);
    
    if (twit.hasAccess()) {
      var tweets = twit.fetchTweets(
        TWITTER_SEARCH_PHRASE, function(tweet) {
        }, {
          multi: true,
          count: 5,   // Process 5 tweets in a batch
          since_id: props.getProperty("SINCE_TWITTER_ID")
        });
      
      if (tweets) {
        props.setProperty("SINCE_TWITTER_ID", tweets[0]);
        
        for (var i = tweets.length - 1; i >= 0; i--) {
          twit.retweet(tweets[i]);
          twit.favorite(tweets[i]);
          
          
          
        
          
       /* Wait between 10 seconds and 1 minute */
          Utilities.sleep(Math.floor(Math.random()*50000) + 10000);
        }
      }
    }
  } catch (f) {
    Logger.log("Error: " + f.toString());
  }
}