import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const ThresholdForm = () => {
    const [thresholds, setThresholds] = useState([]);
    const [scale, setScale] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/get_states');
            const { thresholds: fetchedThresholds, scale: fetchedScale } = response.data;
            setThresholds(fetchedThresholds); // Set thresholds from fetched data
            setScale(fetchedScale); // Set scale from fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = {
                thresholds: thresholds.map(Number),
                scale: Number(scale)
            };

            await axios.post('http://127.0.0.1:8000/app_states_update', formData);

            console.log('Form data submitted successfully:', formData);
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <Container style={{ width: '80%', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', padding: '20px', marginTop: '30px', marginBottom: '30px' }}>
            {/* Set Container width to 80%, apply box-shadow, and add margin */}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Thresholds (separated by comma)</Form.Label>
                    <Form.Control
                        type="text"
                        value={thresholds.join(',')}
                        onChange={(e) => setThresholds(e.target.value.split(',').map(Number))}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Scale</Form.Label>
                    <Form.Control
                        as="select"
                        value={scale}
                        onChange={(e) => setScale(e.target.value)}
                    >
                        {[...Array(11).keys()].map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    style={{ width: '100%', marginTop: '10px' }}
                >
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default ThresholdForm;
