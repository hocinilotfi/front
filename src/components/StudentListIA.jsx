
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';

const StudentListIA = ({ data }) => {
    const renderStudents = () => {
        if (!data || data.length === 0) {
            return <p>No student data available.</p>;
        }

        // Calculate minScore and maxScore from the data
        const scores = data.map((student) => student.score);
        const minScore = Math.min(...scores);
        const maxScore = Math.max(...scores);

        return data.map((student) => {
            const { StudentID, FirstName, FamilyName, score } = student;

            // Calculate the color based on the score value
            const redValue = 255 - Math.round(((score - minScore) / (maxScore - minScore)) * 255);
            const greenValue = Math.round(((score - minScore) / (maxScore - minScore)) * 255);

            // Construct the RGB color string
            const color = `rgb(${redValue}, ${greenValue}, 0)`;

            // Calculate progress percentage
            const progress = (score / maxScore) * 100;

            return (
                <Row key={StudentID} className="mb-2 align-items-center">
                    <Col>{StudentID}</Col>
                    <Col>{FirstName}</Col>
                    <Col>{FamilyName}</Col>
                    <Col>
                        <span style={{ color: color }}>{score}</span>
                    </Col>
                    <Col>
                        <ProgressBar
                            now={progress}
                            style={{ backgroundColor: "lightgreen" }}
                        />
                    </Col>
                </Row>
            );
        });
    };

    return (
        <div className="scrollable-list">
            <Container>
                <Row className="font-weight-bold mb-2">
                    <Col>Student ID</Col>
                    <Col>First Name</Col>
                    <Col>Family Name</Col>
                    <Col>Score</Col>
                    <Col>Needed Support</Col>
                </Row>
                {renderStudents()}
            </Container>
        </div>
    );
};

export default StudentListIA;
