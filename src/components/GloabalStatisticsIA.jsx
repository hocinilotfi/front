
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Container } from 'react-bootstrap';

const GlobalStatisticsIA = ({ data }) => {
    const renderCharts = () => {
        if (!data || data.length === 0) {
            return <p>Loading data...</p>;
        }

        const scoreCounts = {};
        data.forEach((item) => {
            const score = item.score.toString(); // Convert score to string if necessary
            scoreCounts[score] = (scoreCounts[score] || 0) + 1;
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
                <h2>Global Statistics</h2>
            </Container>
            {renderCharts()}
        </Container>
    );
};

export default GlobalStatisticsIA;
