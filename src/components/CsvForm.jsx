import { useState } from "react";
import axios from "axios";
import GlobalStatisticsIA from "./GloabalStatisticsIA";
import SpecificStatisticsIA from "./SpecificStatisticsIA";
import BoxPlotIA from "./BoxPlotIA";
import StudentListIA from "./StudentListIA";

function CvForm() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Please select a CSV file.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("csv_data", file);

        try {
            const response = await axios.post("http://127.0.0.1:8000/predict_csv/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setResult(response.data);
            setLoading(false);
            setError(null);
        } catch (error) {
            console.error("Error uploading CSV file:", error);
            setError("An error occurred while uploading the CSV file.");
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <div className="container shadow p-3 mb-5 bg-white rounded " style={{ width: '80%', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', padding: '20px', marginTop: '30px', marginBottom: '30px' }}>
                <h2>Upload a CSV file</h2>
                <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-column">
                        <input
                            type="file"
                            id="csvFile"
                            name="csvFile"
                            accept=".csv"
                            onChange={handleFileChange}
                        />
                        <button type="submit" disabled={loading || !file} className="btn btn-primary mt-3">
                            {loading ? 'Uploading...' : 'Send to IA'}
                        </button>
                    </div>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
            <div className="container shadow p-3 mb-5 bg-white rounded">
                {result && (
                    <>
                        {console.log("****************** here **********")}
                        {console.log(result[3].FirstName)}
                        <GlobalStatisticsIA data={result} />
                        <SpecificStatisticsIA data={result} />
                        <BoxPlotIA data={result} />
                        <StudentListIA data={result} />


                    </>
                )}
            </div>


        </div>
    );
}

export default CvForm;
