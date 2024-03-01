import React, { useState, useEffect } from "react";

function Header() {

    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <React.Fragment>
            <div className="container-fluid text-start bg-dark text-white py-2 d-flex justify-content-between align-items-center">
                <div>
                    <h1 className="inline">BookStore</h1>
                    <h6 className="inline">
                        <span className="badge bg-secondary">New</span>
                    </h6>
                </div>
                <h4 className="text-white mt-2">{currentDateTime.toLocaleString("en-GB")}</h4>
            </div>
        </React.Fragment>
    );
}

export default Header;