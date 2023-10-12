import React, { useState, useEffect } from 'react';
import solanaLogo from "../../assets/images/landingPage/sol_logo.png";

export const PricingTicker: React.FC = () => {
    const [solPrice, setSolPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSolPrice = async () => {
        try {
            const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
            
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setSolPrice(data.solana.usd);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch SOL price.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSolPrice();

        // Optionally, refetch every 60 seconds (adjust as needed)
        const interval = setInterval(fetchSolPrice, 60000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='sol-ticker d-flex align-items-center gap-2'>
            <img src={solanaLogo} alt="Solana logo"/>
            Price: ${solPrice}
        </div>
    );
};