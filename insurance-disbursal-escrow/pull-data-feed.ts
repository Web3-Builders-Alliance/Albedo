import { SwitchboardClient, SwitchboardFeed } from "@switchboard-xyz/switchboard-v2";

const client = new SwitchboardClient();

// Get the Switchboard feed ID for the feed that you want to retrieve data from.
const feedId = "6gx1DrVMMCtP2qebzHiHdzfoVQPLVDJHWXBFQJVyfBQ";

// Request data from the Switchboard feed.
const feed = await client.getFeed(feedId);

// Get the latest value of the feed.
const value = feed.latestValue;

// Display the pulled value to the console.
console.log(value);
