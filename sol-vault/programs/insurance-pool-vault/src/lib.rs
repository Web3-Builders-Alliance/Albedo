use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};

declare_id!("CrSyuUEDMHudgQXNCTnA1y7GgPrUdqFYRQ7knP13kjWp");

#[program]
pub mod sol_vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.state.state_bump = *ctx.bumps.get("state").unwrap();
        ctx.accounts.state.vault_bump = *ctx.bumps.get("vault").unwrap();
        Ok(())
    }

    pub fn deposit_premium(ctx: Context<DepositPremium>, amount: u64) -> Result<()> {
        let ctx_accounts = Transfer {
            from: ctx.accounts.user.to_account_info(),
            to: ctx.accounts.vault.to_account_info(),
        };
        let cpi = CpiContext::new(ctx.accounts.system_program.to_account_info(), ctx_accounts);
        transfer(cpi, amount)
    }

    pub fn disburse_claim(ctx: Context<DisburseClaim>, claim_amount: u64) -> Result<()> {
        // if !ctx.accounts.state.approve_claim {
        //     return Err(Error::Custom(0)); // 0 is an error code for "ClaimNotApproved"
        // }

        let transfer_cpi_accounts = Transfer {
            from: ctx.accounts.vault.to_account_info(),
            to: ctx.accounts.user.to_account_info(),
        };

        let cpi = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            transfer_cpi_accounts,
        );
        transfer(cpi, claim_amount)
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    /// CHECK: qsdaxz
    owner: Signer<'info>,
    #[account(
        init,
        payer = owner,
        space = VaultState::LEN,
        seeds = [b"state", owner.key().as_ref()],
        bump,
    )]
    state: Account<'info, VaultState>,
    #[account(
        seeds = [b"vault", state.key().as_ref()],
        bump
    )]
    vault: SystemAccount<'info>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DepositPremium<'info> {
    #[account(mut)]
    user: Signer<'info>,
    ///CHECK: qsdaxz
    owner: UncheckedAccount<'info>,
    #[account(
        seeds = [b"state", owner.key().as_ref()],
        bump = state.state_bump,
    )]
    state: Account<'info, VaultState>,
    #[account(
        mut,
        seeds = [b"vault", state.key().as_ref()],
        bump = state.vault_bump,
    )]
    vault: SystemAccount<'info>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DisburseClaim<'info> {
    #[account(mut)]
    user: Signer<'info>,
    ///CHECK: it's safe
    owner: UncheckedAccount<'info>,
    #[account(
        seeds = [b"state", owner.key().as_ref()],
        bump = state.state_bump,
    )]
    state: Account<'info, VaultState>,
    #[account(
        mut,
        seeds = [b"vault", state.key().as_ref()],
        bump = state.vault_bump,
    )]
    vault: SystemAccount<'info>,
    system_program: Program<'info, System>,
}

#[account]
pub struct VaultState {
    state_bump: u8,
    vault_bump: u8,
    approve_claim: bool, // Adding the field to track claim approval
}

impl VaultState {
    const LEN: usize = 8 + 1 * 3; // Increased the length due to the added boolean
}
