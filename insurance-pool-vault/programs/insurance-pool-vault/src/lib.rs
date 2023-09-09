use anchor_lang::prelude::*;

declare_id!("CrSyuUEDMHudgQXNCTnA1y7GgPrUdqFYRQ7knP13kjWp");

#[program]
pub mod insurance_pool_vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
