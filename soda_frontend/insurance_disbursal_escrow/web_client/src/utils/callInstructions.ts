import { web3 } from "@project-serum/anchor";

export const initialize = (program, rainfallData, user, systemProgram,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .initialize()
          .accounts({
            rainfallData,
            user,
            systemProgram,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};

export const checkEligibility = (program, rainfallData,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .checkEligibility()
          .accounts({
            rainfallData,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};

export const instructVaultToDisburseClaim = (program, amount, rainfallData, solVaultProgram, owner, vault, state, user, systemProgram,) => {
  if (program) {
    (async () => {
      try {
        const tx = await program.methods
          .instructVaultToDisburseClaim( amount,)
          .accounts({
            rainfallData,
            solVaultProgram,
            owner,
            vault,
            state,
            user,
            systemProgram,
          })
          .rpc();
      } catch (error) { console.log(error) }
    })();
  }
};

