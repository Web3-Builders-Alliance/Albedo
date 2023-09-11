# Albedo
By: Prakyath Reddy & Kellen James

Automated Disbursal of Insurance claims and management of large Agricultural Estates using DePIN

### **Target sector**: Agritech

### Problem with the current system:

1. **Inefficient System of Insurance Processing**: Extreme weather events like droughts or storms can devastate crops. However, farmers often face bureaucratic hurdles and delays when filing insurance claims. 
    
    // note: Add a stat, find out how long it takes to claim insurance 
    
2. ************************Wastage of agricultural resources:************************ Farmers often relies on generic approaches to fertilizer application and irrigation, leading to suboptimal yields and resource waste. Also excess fertilizer would destroy soil health, and contaminate ground water.
    
    // add a stat again, find out how much wastage happens every year in the agriculture sector 
    

### Our Solution

1. **Automated disbursal of crop insurance:**
    - Deploy IoT sensors to collect real-time weather data from farms, over the LoRaWAN network.
    - Pooling of insurance premiums and disbursement of claims all managed by code (plan for a later time, for now, we would be working with traditional insurance companies).
    - Use Solana escrow program to automatically release insurance payouts when predefined adverse conditions occur.
    - Events that occur regularly on the site, will be aggregated, analyzed and an NFT will be generated as proof of occurance of event.
2. ****Data-Driven Farm Management:****
    - Utilize specialized soil sensors to measure variables like moisture and nutrients.
    - Create heat maps for targeted fertilizer and water distribution based on real-time data.
        
        // may not be feasible, but keeping it in the pipeline for now
        

### DePIN tools

1. IoT sensors: To collect weather data real-time. Most likely DHT22 sensor. 
2. Helium hotspots: Enables IoT sensors to transmit data through the LoRaWAN network.
3. Switchboard V3: Oracle system that helps us use the data in our solana programs

### **Market Potential**

- Two-sided aggregator connecting data providers (farmers, weather stations, IoT sensors) and data consumers (insurance firms, agronomists).
- Applicable beyond agriculture, serving as a general infrastructure for IoT data trading.

### **Business Model**

- Transaction fees from automated insurance payouts.
- Data monetization opportunities for users.
- Subscription-based model for farmers to access advanced farm management tools.

### Down the line, if all this goes as planned

Enhance sensor capabilities to capture more types of data, like pest activity or crop health.

Generate heat maps to better manage large estates

Enable targeted delivery of fertilizer, pesticides, & irrigation, and continuous monitoring of soil and crop health, and pest control

## Development Guidelines

For information on coding standards, git workflow, and other development practices, please see [DEVELOPMENT_GUIDELINES.md](Docs/DEVELOPMENT_GUIDELINES.md) in the `Docs` folder.