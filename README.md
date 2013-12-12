#Twitter - GeoTrend

A simple app to gather the latest trends from a given city.

##Setup instructions

<code>git clone https://github.com/tamaspiros/twitter-geotrend.git</code> to desired location and then:

<code>npm install && bower install</code>

Edit <code>app.js</code> file and modify the following part of the code with your own IP address/hostname:

<pre>
server.listen(3000, "YOUR-IP-HERE",  function(){
  console.log("Express server up and running.");
});
</pre>

Add a <code>config.js</code> file to the project's root folder and add your consumer key, consumer secret and access token details:
<pre>
module.exports = {
  consumer_key: 'xxx',
  consumer_secret: 'xxx',
  access_token: 'xxx',
  access_token_secret: 'xxx'
};
</pre>

Execute <code>npm start</code> and then navigate to your IP/hostname on port 3000 with a browser.

More info: <a href="http://tamas.io/twitter-geotrending-app-using-node-js-and-angularjs/" target="_blank">tamas.io/twitter-geotrending-app-using-node-js-and-angularjs/</a>