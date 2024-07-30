import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navigation.css';

const Navigation = () => {
    return (
        <Navbar expand="lg" className='nv'>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/"><b>Home</b></Nav.Link>
                        <Nav.Link href="/about"><b>About</b></Nav.Link>
                        <Nav.Link href="/info"><b>Information</b></Nav.Link>
                        <NavDropdown title="SignUp" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/s_signup">As Student</NavDropdown.Item>
                            <NavDropdown.Item href="/t_signup">
                                As Teacher
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/g_signup">As Guardian</NavDropdown.Item>
                        </NavDropdown>
                        {/* <Nav.Link href="/signin"><b>SignIn</b></Nav.Link> */}
                        <NavDropdown title="SignIn" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/signin">As Student</NavDropdown.Item>
                            <NavDropdown.Item href="/o_signin">As Others</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;