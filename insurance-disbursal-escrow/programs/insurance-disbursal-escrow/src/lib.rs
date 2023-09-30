use anchor_lang::prelude::*;
mod pull_data_feed;

declare_id!("PaYj25PZhw6ckeff1KbTBXweHqFh8dyBsdphZAG7rFF");

#[program]
pub mod insurance_disbursal_escrow {
    use super::*;

    const SOL_VAULT_PROGRAM_ID: &str = "CrSyuUEDMHudgQXNCTnA1y7GgPrUdqFYRQ7knP13kjWp";

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
    ) -> Result<()> {
        let cpi_accounts = [];

        // Making sure that the provided sol_vault_program is indeed the expected sol_vault
        if ctx.accounts.sol_vault_program.key != &SOL_VAULT_PROGRAM_ID {
            return Err(ErrorCode::InvalidVaultProgram.into());
        }

        let cpi_program = ctx.accounts.sol_vault_program.clone();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        let approve = ctx.accounts.rainfall_data.approve_claim;

        sol_vault::cpi::approve_claim(cpi_ctx, SolVaultInstruction::ApproveClaim { approve })?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {
    #[account(init, payer = user, space = 8 + 1)]
    pub rainfall_data: Account<'info, RainfallDataAccount>,
    pub user: Signer<'info>,
}

pub struct RainfallDataAccount {
    pub rainfall: u64,
    pub approve_claim: bool,
}

#[derive(Accounts)]
pub struct InstructVaultToDisburseClaim {
    pub rainfall_data: Account<'info, RainfallDataAccount>,
    #[account(executable)]
    pub sol_vault_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CheckEligibility {
    pub rainfall_data: Account<'info, RainfallDataAccount>,
}

pub enum SolVaultInstruction {
    ApproveClaim { approve: bool },
}

#[error]
pub enum ErrorCode {
    #[msg("The provided sol_vault_program is not the expected sol_vault")]
    InvalidVaultProgram,
}

/*

1. I want to save the value of rainfall as 150 in an account.
2. I want to pull this data (of rainfall) into the check_eligibility function and check if the
   rainfall value is greater than 120.
3. If the eligibility criteria is satisfied I want the bool value of approve_claim to become true,
4. if approve_claim is true I want to send an instruction to the sol_vault program(whose program id
   is CrSyuUEDMHudgQXNCTnA1y7GgPrUdqFYRQ7knP13kjWp) which is deployed on-chain. The instruction should contain the bool value of approve_claim.

*/
