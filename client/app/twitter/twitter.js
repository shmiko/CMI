$(document).ready(function() {
  var tweetList=[];


  $("#handle").change(function(){
    $("#hi").removeClass("btn-primary").addClass("btn-disabled");
    $("#hi").text("loading...");
    tweetList=[];
    blockspring.runParsed("parse-rss-feed-to-json", { "feed_url": "https://queryfeed.net/tw?q=%40" + $("#handle").val(), "num_items": 20}, { "api_key": "K8Kggw18Dd3WsqCYfq0vzdeQx" }, function(res){
      console.log(res)
      res.params.feed.forEach(function(tweet) {
        tweetList.push(tweet.summary);   
      });
        if (tweetList.length ===0) {
          $('#hi').text('Invalid or private twitter account!');
          return;
        }
        $('#hi').text('get random tweet! (' + tweetList.length + " loaded)");
  $("#hi").removeClass("btn-disabled").addClass("btn-primary");
    console.log(tweetList);
  })
  
    })
    



    $("#hi").click(function(){
     if (tweetList.length > 0) {
       var thistweet=tweetList[getRandomInt(0,tweetList.length-1)];    
    $(".tweet").html(thistweet);
    $(".tweetLink").attr("href","http://twitter.com/home?status=RT%20@" + $("#handle").val() + "%3A%20"+ encodeURIComponent(strip(thistweet)));
       $(".tweetLink").removeClass("hidden");
     } 
     
    
  });
  });
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}