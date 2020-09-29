# heatmapbot
discord js bot displaying the agregated heatmap from bitcoinwisdom.io

* will answer to the +hm command everywhere
* as a default it will use 15m timeframe, but you can specify 5, 15, 30, 60 or 240.
example +hm 240 will ask for the 4h ( 240 m ) timeframe
* will autopost every X minutes ( parameter in the json config file ) 
on a dedicated channel ( channelid in the config file 
* you need to put your own, valid discord bot token in the config file, find it on :
 https://discord.com/developers/applications/

you can test the current alpha version of the bot on the #bot channel on the neoskills discord server : 
join with this link : https://discord.gg/X84Uvf 

 the generateheatmap folder contains the puppeteer code used to generate the bitcoinwisdom agregated heatmap screenshot

 you can invite the bt to your own server/channel  with this link : 
https://discord.com/oauth2/authorize?client_id=760149527369482280&scope=bot&permissions=8

