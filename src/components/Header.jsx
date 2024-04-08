
import { Navbar, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100%', width: '80%' }}>
                <Navbar.Brand href="#home">
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: 0 }}>
                        AI-Powered Educational Advisors
                    </h1>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default Header;
