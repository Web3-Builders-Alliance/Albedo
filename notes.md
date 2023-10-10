To deploy to Devnet:

Run this is the terminal:
solana config set --url devnet

Then go to anchor.toml and change the network to devnet
Duplicate programs.localnet to programs.devnet
under provider, change the cluster to devnet

anchor build

anchor deploy

Vault program shipped to devnet:
Deploying cluster: https://api.devnet.solana.com
Upgrade authority: /Users/praky/.config/solana/id.json
Deploying program "insurance_pool_vault"...
Program path: /Users/praky/Projects/albedo/sol-vault/target/deploy/insurance_pool_vault.so...
Program Id: FCGW7MZ3EaMxk6uifKWe81WTNSDoEqsXiMauQUTm6nMP
