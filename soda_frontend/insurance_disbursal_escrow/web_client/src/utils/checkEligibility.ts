import { web3 } from "@project-serum/anchor";

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
