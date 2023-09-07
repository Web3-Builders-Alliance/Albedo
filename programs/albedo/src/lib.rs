use anchor_lang::prelude::*;

declare_id!("8QyTSgBy2Msab5yXRLnPhvrto59MAxjtw2PPWbnui4Nx");

#[program]
pub mod albedo {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
