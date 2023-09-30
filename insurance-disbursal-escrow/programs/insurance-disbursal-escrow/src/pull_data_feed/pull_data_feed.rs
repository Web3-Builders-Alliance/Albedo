use anchor_lang::prelude::*;
use anchor_lang::solana_program::clock;
use switchboard_solana::AggregatorAccountData;

use std::convert::TryInto;

#[program]
pub mod anchor_feed_parser {
    use super::*;

    pub fn read_result(ctx: Context<ReadResult>) -> anchor_lang::Result<()> {
        let feed = &ctx.accounts.switchboard_aggregator.load()?;

        // get result
        let val: f64 = feed.get_result()?.try_into()?;

        // check whether the feed has been updated in the last 300 seconds
        feed.check_staleness(clock::Clock::get().unwrap().unix_timestamp, 300)
            .map_err(|_| error!(FeedErrorCode::StaleFeed))?;

        msg!("Current feed result is {}!", val);

        // Your custom logic here

        Ok(())
    }
}

#[account(zero_copy)]
pub struct MyMarket {
    pub bump: u8,
    pub switchboard_aggregator: Pubkey,
}

#[derive(Accounts)]
pub struct ReadResult<'info> {
    #[account(
        has_one = switchboard_aggregator
    )]
    pub market: AccountLoader<'info, MyMarket>,
    pub switchboard_aggregator: AccountLoader<'info, AggregatorAccountData>,
}

#[error_code]
#[derive(Eq, PartialEq)]
pub enum FeedErrorCode {
    #[msg("Switchboard feed has not been updated in 5 minutes")]
    StaleFeed,
}
