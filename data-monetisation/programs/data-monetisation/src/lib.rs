use anchor_lang::prelude::*;

declare_id!("9pG7mPqQ4mX6VMgG4uZSiNRkryCutyoHh4Hit2rpp6cj");

#[program]
pub mod data_monetisation {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
