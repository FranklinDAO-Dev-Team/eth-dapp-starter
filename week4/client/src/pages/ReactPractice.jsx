import { useState } from "react";

export default function ReactPractice() {
    const [bidAmount, setBidAmount] = useState('');
    const [bidComplete, setBidComplete] = useState(false);

    const handleChange = (event) => {
        setBidAmount(event.target.value);
    };

    const handleClick = async () => {
        try {
            setBidComplete(true);
        } catch (error) {
            var popup = alert("Error: caused by either invalid input, insufficient balance, or wrong network!");
        }
    };



    // rendering the page
    return (
        <section className="">
            <div className="">

                <div className="">
                    <h2 className="">
                        React Practice {"\n"}
                    </h2>
                </div>

                <div className="">

                    <input className=""
                        type="number" min="0"
                        id="bid-input"
                        name="bid-input"
                        onChange={handleChange}
                        value={bidAmount}
                        placeholder=" amount in ETH"
                    />

                    {/* bid button */}
                    <div className="">
                        <button onClick={handleClick}>bid</button>

                    </div>

                </div>
                <div >
                    <p className="">
                        bid amount: {bidAmount}
                    </p>

                    {!bidComplete ?
                        null :            
                        <p className="">
                            You bid: {bidAmount} !
                        </p>
                        
                    }
                </div>
            </div>

        </section>


    )
}
