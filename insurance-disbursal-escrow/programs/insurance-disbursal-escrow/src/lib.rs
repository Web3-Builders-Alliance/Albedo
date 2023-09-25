use anchor_lang::prelude::*;

declare_id!("PaYj25PZhw6ckeff1KbTBXweHqFh8dyBsdphZAG7rFF");

#[program]
pub mod insurance_disbursal_escrow {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn check_eligibility(ctx: Context<CheckEligibility>) -> Result<()> {
        Ok(())
    }

    pub fn instruct_vault_to_disburse_claim(
        ctx: Context<InstructVaultToDisburseClaim>,
    ) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct InstructVaultToDisburseClaim {}

#[derive(Accounts)]
pub struct CheckEligibility {}
