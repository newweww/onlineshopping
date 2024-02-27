import React from "react";

function Footer() {
    return (
        <React.Fragment>
            <div className="container-fluid text-start bg-dark text-white py-2" style={{ position: 'fixed', bottom: 0, width: '100%' }}>
                <h6>Copyright 2024</h6>
            </div>
        </React.Fragment>
    );
}

export default Footer;