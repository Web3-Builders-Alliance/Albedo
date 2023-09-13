use anchor_lang::prelude::*;

declare_id!("CrSyuUEDMHudgQXNCTnA1y7GgPrUdqFYRQ7knP13kjWp");

#[program]
pub mod sol_vault {
    use super::*;

    pub fn initialize_vault(ctx: Context<InitializeVault>, amount: u64) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        vault.amount = amount;
        vault.owner = *ctx.accounts.owner.to_account_info().key;
        Ok(())
    }

    pub fn deposit_sol(ctx: Context<DepositSol>, amount: u64) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        vault.amount += amount;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeVault<'info> {
    #[account(init)]
    pub vault: ProgramAccount<'info, Vault>,
    pub rent: Sysvar<'info, Rent>,
    pub owner: Signer<'info>,
}

#[account]
pub struct Vault {
    pub owner: Pubkey,
    pub amount: u64,
}

#[derive(Accounts)]
pub struct DepositSol<'info> {
    #[account(
        mut,
        constraint = vault.owner == *ctx.accounts.owner.to_account_info().key,
    )]
    pub vault: ProgramAccount<'info, Vault>,
    pub owner: Signer<'info>,
}
