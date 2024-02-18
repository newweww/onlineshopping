import React from "react";
import { Link } from "react-router-dom";


function Home() {

    const cardContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    };

    const cardStyle = {
        width: 310,
        display: 'flex',
        flexDirection: 'column',
    };

    const buttonContainerStyle = {
        marginTop: 'auto',
    };


    return(
        <div className="container">
            <img src="assets/img1.jpg" class="rounded mx-auto d-block img-fluid highlight_img " alt="img1" />
            <h2 className="text-start container-fluid p-3">HOT!!!!</h2>
            {/* Card */}
            <div style={cardContainerStyle}>
                {/* Card 1 */}
                <div className="card inline mx-4" style={cardStyle}>
                        <img
                            className="card-img-top card_img"
                            src="/assets/img1.jpg"
                            alt=""
                        />
                        <div className="card-body" style={{ flex: '1' }}>
                            <h4 className="card-title">Book#1</h4>
                            <p className="card-text">Novel</p>
                        </div>
                        <div style={{ alignSelf: 'flex-end' }}>
                            <Link to="/page/comic" className="btn btn-primary mx-2 my-2">
                                More
                            </Link>
                        </div>
                    </div>
                {/* Card 2 */}
                <div className="card inline mx-4" style={cardStyle}>
                        <img
                            className="card-img-top card_img"
                            src="/assets/img1.jpg"
                            alt=""
                        />
                        <div className="card-body" style={{ flex: '1' }}>
                            <h4 className="card-title">Book#2</h4>
                            <p className="card-text">Comic</p>
                        </div>
                        <div style={{ alignSelf: 'flex-end' }}>
                            <Link to="/page/comic" className="btn btn-primary mx-2 my-2">
                                More
                            </Link>
                        </div>
                    </div>
                {/* Card 3 */}
                <div className="card inline mx-4" style={cardStyle}>
                        <img
                            className="card-img-top card_img"
                            src="/assets/img1.jpg"
                            alt=""
                        />
                        <div className="card-body" style={{ flex: '1' }}>
                            <h4 className="card-title">Book#3</h4>
                            <p className="card-text">Cooking</p>
                        </div>
                        <div style={{ alignSelf: 'flex-end' }}>
                            <Link to="/page/comic" className="btn btn-primary mx-2 my-2">
                                More
                            </Link>
                        </div>
                    </div>
            </div>
            <h2 className="text-start container-fluid p-3">NEWWWWW</h2>
            {/* Card Line 2*/}
            <div style={cardContainerStyle}>
                {/* Card 4 */}
                <div className="card inline mx-4" style={cardStyle}>
                        <img
                            className="card-img-top card_img"
                            src="/assets/img1.jpg"
                            alt=""
                        />
                        <div className="card-body" style={{ flex: '1' }}>
                            <h4 className="card-title">Book#4</h4>
                            <p className="card-text">Study</p>
                        </div>
                        <div style={{ alignSelf: 'flex-end' }}>
                            <Link to="/page/comic" className="btn btn-primary mx-2 my-2">
                                More
                            </Link>
                        </div>
                    </div>
                {/* Card 5 */}
                <div className="card inline mx-4" style={cardStyle}>
                        <img
                            className="card-img-top card_img"
                            src="/assets/img1.jpg"
                            alt=""
                        />
                        <div className="card-body" style={{ flex: '1' }}>
                            <h4 className="card-title">Book#5</h4>
                            <p className="card-text">Novel</p>
                        </div>
                        <div style={{ alignSelf: 'flex-end' }}>
                            <Link to="/page/comic" className="btn btn-primary mx-2 my-2">
                                More
                            </Link>
                        </div>
                    </div>
                {/* Card 6 */}
                <div className="card inline mx-4" style={cardStyle}>
                        <img
                            className="card-img-top card_img"
                            src="/assets/img1.jpg"
                            alt=""
                        />
                        <div className="card-body" style={{ flex: '1' }}>
                            <h4 className="card-title">Book#6</h4>
                            <p className="card-text">Cooking</p>
                        </div>
                        <div style={{ alignSelf: 'flex-end' }}>
                            <Link to="/page/comic" className="btn btn-primary mx-2 my-2">
                                More
                            </Link>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Home;