use anchor_lang::prelude::*;

declare_id!("PaYj25PZhw6ckeff1KbTBXweHqFh8dyBsdphZAG7rFF");

#[program]
pub mod insurance_disbursal_escrow {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
