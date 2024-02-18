import React from "react";

function Header() {
    return(
    <React.Fragment>
        <div className="container-fluid text-start bg-dark text-white py-2">
            <h1 className="inline">NATTANAN</h1>
            <h6 className="inline"><span className="badge bg-secondary">New</span></h6>
      </div>
    </React.Fragment>
    );
}

export default Header;