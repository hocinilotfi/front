
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Row, Col } from 'react-bootstrap';

const categories = [
    'sex', 'address', 'famsize', 'Pstatus', 'schoolsup', 'famsup', 'paid',
    'activities', 'nursery', 'higher', 'internet', 'romantic', 'Mjob', 'Fjob',
    'reason', 'guardian'
];

const SpecificStatisticsIA = ({ data }) => {
    const renderCharts = () => {
        if (!data || data.length === 0) {
            return <p>No data available</p>;
        }

        const charts = [];

        categories.forEach((category) => {
            const scoreCounts = {};

            data.forEach((item) => {
                const score = item.score;
                const value = item[category];

                if (!scoreCounts[score]) {
                    scoreCounts[score] = {};
                }

                if (!scoreCounts[score][value]) {
                    scoreCounts[score][value] = 0;
                }

                scoreCounts[score][value]++;
            });

            const chartData = Object.keys(scoreCounts).map((score) => {
                const dataItem = { score: Number(score) };
                Object.entries(scoreCounts[score]).forEach(([value, count]) => {
                    dataItem[value] = count;
                });
                return dataItem;
            });

            const bars = Object.keys(scoreCounts[Object.keys(scoreCounts)[0]]).map((value) => (
                <Bar key={value} dataKey={value} stackId="a" fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
            ));

            const chart = (
                <Col key={category} xs={12} sm={6} md={6} lg={3}>
                    <Container className="text-center mb-4">
                        <h4>{category.toUpperCase()}</h4>
                    </Container>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="score" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {bars}
                        </BarChart>
                    </ResponsiveContainer>
                </Col>
            );

            charts.push(chart);
        });

        return charts;
    };

    return (
        <Container>
            <Container className="text-center">
                <h2>Specific Statistics</h2>
            </Container>
            <Row>
                {renderCharts()}
            </Row>
        </Container>
    );
};

export default SpecificStatisticsIA;
