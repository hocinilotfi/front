import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import axios from 'axios';

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/get_scores');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const renderStudents = () => {
        if (!students || students.length === 0) {
            return <p>No student data available.</p>;
        }

        // Calculate minScore and maxScore from the data
        const scores = students.map((student) => student.score);
        const minScore = Math.min(...scores);
        const maxScore = Math.max(...scores);

        return students.map((student) => {
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

export default StudentList;
