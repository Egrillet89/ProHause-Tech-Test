import { useEffect, useState } from "react";
import Web3 from "web3";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../images/logo/logo.png";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";

function NavBar() {
  const [bnbPrice, setBnbPrice] = useState(null);
  const [account, setAccount] = useState(null);

  // Function to connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.log("MetaMask is not installed");
    }
  };

  // Function to fetch BNB price from Binance
  const fetchBnbPrice = async () => {
    try {
      const response = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT");
      setBnbPrice(response.data.price);
    } catch (error) {
      console.error("Error fetching BNB price", error);
    }
  };

  // Fetch BNB price on component mount and set up interval for updates
  useEffect(() => {
    fetchBnbPrice();
    const intervalId = setInterval(fetchBnbPrice, 30000); // Update every 30 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Navbar expand="lg" className="py-3">
      <Container>
        <Navbar.Brand href="#" className="me-lg-5">
          <img className="logo" src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="#action1">Marketplace</Nav.Link>
            <Nav.Link href="#action2" className="px-lg-3">About Us</Nav.Link>
            <Nav.Link href="#action3">Developers</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex align-items-center order">
          <span className="line d-lg-inline-block d-none"></span>
          <i className="fa-regular fa-heart"></i>
          <Button
            variant="primary"
            className="btn-primary d-none d-lg-inline-block"
            onClick={connectWallet}
          >
            {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
          </Button>
          {bnbPrice && (
            <span className="ms-3 bnb-price">
              BNB Price: ${parseFloat(bnbPrice).toFixed(2)}
            </span>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
