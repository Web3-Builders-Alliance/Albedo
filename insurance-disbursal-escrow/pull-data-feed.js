"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var switchboard_v2_1 = require("@switchboard-xyz/switchboard-v2");
var client = new switchboard_v2_1.SwitchboardClient();
// Get the Switchboard feed ID for the feed that you want to retrieve data from.
var feedId = "6gx1DrVMMCtP2qebzHiHdzfoVQPLVDJHWXBFQJVyfBQ";
// Request data from the Switchboard feed.
var feed = await client.getFeed(feedId);
// Get the latest value of the feed.
var value = feed.latestValue;
// Display the pulled value to the console.
console.log(value);
