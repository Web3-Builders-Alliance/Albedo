### INSURANCE-DISBURSAL-ESCROW PROGRAM
1. for now, save the value of rainfall as 150 in an account.
2. pull this data (of rainfall) into the check_eligibility function and check if the rainfall value is greater than 120.
3. If the eligibility criteria is satisfied modify the bool value of approve_claim to become true,
4. If approve_claim is true, send an instruction to the sol_vault program(whose program id is CrSyuUEDMHudgQXNCTnA1y7GgPrUdqFYRQ7knP13kjWp) which is deployed on-chain. The instruction should contain the bool value of approve_claim.

### SOL-VAULT PROGRAM
for simplicity, we will assume there is only one depositor (insurance premium payer) and one beneficiary (insurance claimant).
1. accept instruction from the insurance-disbursal-escrow program.
2. if the bool value of approve_claim is true, send the value of 1 SOL to the Premium payer's account.
