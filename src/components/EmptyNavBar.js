import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../styles/navbar.css";
import appLogo from "../images/appLogo.png";

function EmptyNavBar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={appLogo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            VTC Bank
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Brand href="#home">
              User.222
              <img
                alt=""
                src="/img/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
            </Navbar.Brand>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default EmptyNavBar;
