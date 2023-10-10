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
