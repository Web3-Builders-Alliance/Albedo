use anchor_lang::prelude::*;
use insurance_pool_vault::cpi::{accounts::DisburseClaim, disburse_claim};
// use insurance_pool_vault::program::ID as SolVaultProgramId;
// use insurance_pool_vault::{self, RainfallData};
// mod pull_data_feed;

pub mod VaultProgram {
    use super::*;
    declare_id!("CrSyuUEDMHudgQXNCTnA1y7GgPrUdqFYRQ7knP13kjWp");
}

declare_id!("PaYj25PZhw6ckeff1KbTBXweHqFh8dyBsdphZAG7rFF");

#[program]
pub mod insurance_disbursal_escrow {
    use super::*;

    // const SOL_VAULT_PROGRAM_ID: &str = "CrSyuUEDMHudgQXNCTnA1y7GgPrUdqFYRQ7knP13kjWp";

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let rainfall_data = &mut ctx.accounts.rainfall_data;
        rainfall_data.rainfall = 150;
        rainfall_data.approve_claim = false;
        Ok(())
    }

    pub fn check_eligibility(ctx: Context<CheckEligibility>) -> Result<()> {
        let rainfall_data = &mut ctx.accounts.rainfall_data;

        if rainfall_data.rainfall > 120 {
            rainfall_data.approve_claim = true;
        }

        Ok(())
    }

    pub fn instruct_vault_to_disburse_claim(
        ctx: Context<InstructVaultToDisburseClaim>,
        amount: u64,
    ) -> Result<()> {
        let cpi_accounts = DisburseClaim {
            owner: ctx.accounts.owner.to_account_info(),
            vault: ctx.accounts.vault.to_account_info(),
            system_program: ctx.accounts.system_program.to_account_info(),
            state: ctx.accounts.state.to_account_info(),
            user: ctx.accounts.user.to_account_info(),
        };

        let cpi_ctx = CpiContext::new(
            ctx.accounts.sol_vault_program.to_account_info(),
            cpi_accounts,
        );

        disburse_claim(cpi_ctx, amount)
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 1
    )]
    pub rainfall_data: Account<'info, RainfallDataAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct RainfallDataAccount {
    pub rainfall: u64,
    pub approve_claim: bool,
}

#[derive(Accounts)]
pub struct InstructVaultToDisburseClaim<'info> {
    #[account(
        constraint = rainfall_data.approve_claim @ ErrorCode::InvalidClaim
    )]
    pub rainfall_data: Account<'info, RainfallDataAccount>,
    #[account(address = VaultProgram::ID @ ErrorCode::InvalidVaultProgram)]
    /// CHECK: Not dangerous
    pub sol_vault_program: AccountInfo<'info>,
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(mut)]
    /// CHECK: Not dangerous
    pub vault: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Not dangerous
    pub state: AccountInfo<'info>,
    #[account(mut)]
    /// CHECK: Not dangerous
    pub user: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CheckEligibility<'info> {
    pub rainfall_data: Account<'info, RainfallDataAccount>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone, PartialEq, Eq)]
pub enum SolVaultInstruction {
    ApproveClaim { approve: bool },
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided sol_vault_program is not the expected sol_vault")]
    InvalidVaultProgram,
    #[msg("Invalid claim")]
    InvalidClaim,
}

/*

1. I want to save the value of rainfall as 150 in an account.
2. I want to pull this data (of rainfall) into the check_eligibility function and check if the
   rainfall value is greater than 120.
3. If the eligibility criteria is satisfied I want the bool value of approve_claim to become true,
4. if approve_claim is true I want to send an instruction to the sol_vault program(whose program id
   is CrSyuUEDMHudgQXNCTnA1y7GgPrUdqFYRQ7knP13kjWp) which is deployed on-chain. The instruction should contain the bool value of approve_claim.

*/
