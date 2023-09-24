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
            from: ctx.accounts.owner.to_account_info(),
            to: ctx.accounts.vault.to_account_info(),
        };
        let cpi = CpiContext::new(ctx.accounts.system_program.to_account_info(), ctx_accounts);
        transfer(cpi, amount)
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
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
    owner: Signer<'info>,
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
}

impl VaultState {
    const LEN: usize = 8 + 1 * 2;
}
