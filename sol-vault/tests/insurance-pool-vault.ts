import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { InsurancePoolVault } from "../target/types/insurance_pool_vault";

// describe("insurance-pool-vault", () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());

//   const program = anchor.workspace.InsurancePoolVault as Program<InsurancePoolVault>;

//   it("Is initialized!", async () => {
//     // Add your test here.
//     const tx = await program.methods.initialize().rpc();
//     console.log("Your transaction signature", tx);
//   });
// });

// ----
//
const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

describe('sol_vault', () => {
  // Test the `initialize` function.
  it('should initialize the vault state', async () => {
    const provider = anchor.Provider.env();
    anchor.setProvider(provider);

    const [stateAccount, vaultAccount] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from('state'), provider.wallet.publicKey.toBuffer()],
      programId,
    );

    const program = await anchor.workspace.SolVault;

    const initializeTx = await program.rpc.initialize({
      accounts: {
        owner: provider.wallet.publicKey,
        state: stateAccount,
        vault: vaultAccount,
        systemProgram: SystemProgram.programId,
      },
      signers: [provider.wallet.payer],
    });

    await initializeTx.confirm();

    const state = await program.account.vaultState.fetch(stateAccount);

    expect(state.stateBump).toBeGreaterThan(0);
    expect(state.vaultBump).toBeGreaterThan(0);
  });

  // Test the `depositPremium` function.
  it('should deposit premium into the vault', async () => {
    const provider = anchor.Provider.env();
    anchor.setProvider(provider);

    const [stateAccount, vaultAccount] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from('state'), provider.wallet.publicKey.toBuffer()],
      programId,
    );

    const program = await anchor.workspace.SolVault;

    // Initialize the vault.
    const initializeTx = await program.rpc.initialize({
      accounts: {
        owner: provider.wallet.publicKey,
        state: stateAccount,
        vault: vaultAccount,
        systemProgram: SystemProgram.programId,
      },
      signers: [provider.wallet.payer],
    });

    await initializeTx.confirm();

    // Deposit 100 SOL into the vault.
    const depositPremiumTx = await program.rpc.depositPremium({
      accounts: {
        owner: provider.wallet.publicKey,
        state: stateAccount,
        vault: vaultAccount,
        systemProgram: SystemProgram.programId,
      },
      signers: [provider.wallet.payer],
      args: {
        amount: 100,
      },
    });

    await depositPremiumTx.confirm();

    const vaultBalance = await provider.connection.getBalance(vaultAccount);

    expect(vaultBalance).toBe(100);
  });
});
