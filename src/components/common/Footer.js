import React from 'react'
const style = {
    backgroundColor: "#f5f5f5",
    display: "flex",
    justifyContent: "center"
}
const Footer = () => {
    return (
        <footer className="footer" style={style}>
            <p className="col-lg-offset-3" style={{ paddingTop: "15px" }}>made for Fastor.Ai</p>
        </footer>
    )
}

export default Footer;