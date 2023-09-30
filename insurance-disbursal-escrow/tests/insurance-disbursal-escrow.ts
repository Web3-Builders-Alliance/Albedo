import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { VaultProgram, IDL } from "../target/types/vault_program"
import { InsuranceDisbursalEscrow } from "../target/types/insurance_disbursal_escrow";

describe("albedo", () => {
  // Configure the client to use the local cluster.
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const commitment: Commitment = "confirmed"; // processed, confirmed, finalized

  const vaultProgramId = new PublicKey("pCrLE3Ygn9efmpn6HC6ZDd9PKJHZEuebVERnFQ2JjXB");

  const vaultProgram = new anchor.Program<AnchorEscrow2023>(IDL, vaultProgramId, anchor.getProvider());

  const program = anchor.workspace.InsuranceDisbursalEscrow as Program<InsuranceDisbursalEscrow>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
