import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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

        const scoreCounts = {};
        data.forEach((student) => {
            const score = student.score.toString();
            scoreCounts[score] = (scoreCounts[score] || 0) + 1;
        });

        const chartData = Object.keys(scoreCounts).map((key) => ({
            score: key,
            count: scoreCounts[key]
        }));

        const totalStudents = data.length;

        const pieData = chartData.map((entry) => ({
            name: `${entry.score}`,
            value: parseFloat(((entry.count / totalStudents) * 100).toFixed(2))
        }));


        // Define a fixed set of colors for the charts
        const COLORS = [
            '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#FF5733',
            '#FF8C00', '#FFA500', '#FFD700', '#FFEC8B', '#8A2BE2',
            '#00FF00', '#7FFF00', '#32CD32', '#008000', '#6B8E23',
            '#BDB76B', '#8B4513', '#A0522D', '#D2691E', '#CD5C5C',
            '#F08080', '#FF6347', '#FFA07A', '#FF4500', '#FFD700',
            '#9ACD32', '#8FBC8F', '#4682B4', '#00CED1', '#00BFFF'
        ];

        return (
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ marginRight: '50px' }}>

                    <Container className="text-center mt-5">
                        <h3>Support Score Distribution in (%)</h3>
                    </Container>
                    <ResponsiveContainer width={400} height={400}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div>
                    <Container className="text-center mt-5">
                        <h3>Support Score</h3>
                    </Container>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="score" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count">
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Container>
        );
    };

    return (
        <Container style={{ width: '80%', marginTop: '50px', marginBottom: '50px' }}>
            <Container className="text-center">
                <h1>The x-axis represents the support score</h1>
                <h1>________________________________________</h1>
                <h2>Global Statistics</h2>
            </Container>
            {renderCharts()}
        </Container>
    );
};

export default GlobalStatistics;
