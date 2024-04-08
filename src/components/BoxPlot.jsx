import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { Container, Row, Col } from 'react-bootstrap';

const numericalFeatures = [
    'Medu', 'Fedu', 'traveltime', 'studytime', 'failures',
    'famrel', 'freetime', 'goout', 'Dalc', 'Walc', 'health', 'absences', 'FinalGrade'
];

const BoxPlot = () => {
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

        const charts = [];

        numericalFeatures.forEach((feature, index) => {
            const seriesData = [];

            const scoreGroups = {};
            data.forEach((item) => {
                const score = item.score.toString();
                const value = item[feature];

                if (!scoreGroups[score]) {
                    scoreGroups[score] = [];
                }

                scoreGroups[score].push(value);
            });

            Object.entries(scoreGroups).forEach(([score, values]) => {
                const quartiles = calculateQuartiles(values);

                seriesData.push({
                    x: score,
                    y: [quartiles.min, quartiles.q1, quartiles.median, quartiles.q3, quartiles.max]
                });
            });

            const chart = (
                <Col key={feature} xs={12} sm={6} md={6} lg={3}>
                    <Container className='text-center mb-4'>
                        <h4>{feature.toUpperCase()}</h4>
                    </Container>
                    <ReactApexChart
                        options={{
                            chart: {
                                type: 'boxPlot',
                                height: 350
                            },
                            title: {
                                text: `${feature.toUpperCase()} BoxPlot Chart`,
                                align: 'left'
                            },
                            xaxis: {
                                type: 'category',
                                categories: Object.keys(scoreGroups).sort((a, b) => Number(a) - Number(b))
                            },
                            plotOptions: {
                                boxPlot: {
                                    colors: {
                                        upper: '#5C4742',
                                        lower: '#A5978B'
                                    }
                                }
                            }
                        }}
                        series={[{ type: 'boxPlot', data: seriesData }]}
                        type="boxPlot"
                        height={350}
                    />
                </Col>
            );

            charts.push(chart);
        });

        return charts;
    };

    const calculateQuartiles = (data) => {
        data.sort((a, b) => a - b);
        const medianIndex = Math.floor(data.length / 2);
        const q1Index = Math.floor(medianIndex / 2);
        const q3Index = medianIndex + q1Index;

        return {
            min: Math.min(...data),
            q1: data[q1Index],
            median: data[medianIndex],
            q3: data[q3Index],
            max: Math.max(...data)
        };
    };

    return (
        <Container style={{ width: '80%', marginTop: '50px', marginBottom: '50px' }}>
            <Container className='text-center'>
                <h2>Numerical Feature Distribution</h2>
            </Container>
            <Row>
                {renderCharts()}
            </Row>
        </Container>
    );
};

export default BoxPlot;
