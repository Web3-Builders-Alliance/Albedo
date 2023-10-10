To deploy to Devnet:

Run this is the terminal:
solana config set --url devnet

Then go to anchor.toml and change the network to devnet
Duplicate programs.localnet to programs.devnet
under provider, change the cluster to devnet

anchor build

anchor deploy

Deploying cluster: https://api.devnet.solana.com
Upgrade authority: /Users/praky/.config/solana/id.json
Deploying program "insurance_pool_vault"...
Program path: /Users/praky/Projects/albedo/insurance-disbursal-escrow/target/deploy/insurance_pool_vault.so...
Program Id: 8S8mQYkYKfhHJyUQU75CDEFHHMMqydbY859dQQXNCME1

Deploying program "insurance_disbursal_escrow"...
Program path: /Users/praky/Projects/albedo/insurance-disbursal-escrow/target/deploy/insurance_disbursal_escrow.so...
Program Id: Fsm3SohN5njuEjmppCvfQ9VyxSyG8bYQDQAwYRBHz2RH

Deploy success
