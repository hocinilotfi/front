import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Container } from 'react-bootstrap';

const GlobalStatistics = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/get_scores');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const renderCharts = () => {
        if (!data || data.length === 0) {
            return <p>Loading data...</p>;
        }

        const scoreValues = data.map((item) => item.score);

        const scoreCounts = {};
        scoreValues.forEach((value) => {
            scoreCounts[value] = (scoreCounts[value] || 0) + 1;
        });

        const chartData = Object.keys(scoreCounts).map((key) => ({
            score: Number(key),
            count: scoreCounts[key]
        }));

        return (
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="score" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        );
    };

    return (
        <Container style={{ width: '80%', marginTop: '50px', marginBottom: '50px' }}>
            {/* Set Container width to 80% and apply margin */}
            <Container className="text-center">
                <h1>The x-axis represents the support score </h1>
                <h1>________________________________________ </h1>
                <h2>Global Statistics</h2>
            </Container>
            {renderCharts()}
        </Container>
    );
};

export default GlobalStatistics;
