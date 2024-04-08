
// import './App.css'
import "bootstrap/dist/css/bootstrap.css"
import Header from './components/Header';
import ThresholdForm from './components/ThresholdForm';
import BoxPlot from './components/BoxPlot';
import { Container } from 'react-bootstrap';
import GloabalStatistics from "./components/GloabalStatistics";
// import GloabalStatisticsIA from "./components/GloabalStatisticsIA";
import SpecificStatistics from "./components/SpecificStatistics";
import HeaderIA from "./components/HeaderIA";
// import DataContainer from "./components/DataContainer";
import CsvForm from "./components/CsvForm";
import { useState } from "react";
import StudentList from "./components/StudentList";
// import GlobalStatisticsIA from "./components/GloabalStatisticsIA";

function App() {


  return (
    <Container fluid>

      <Header />
      <ThresholdForm />
      <div className="container shadow p-3 mb-5 bg-white rounded">
        <GloabalStatistics />
        <SpecificStatistics />
        <BoxPlot />
        <StudentList />
      </div>

      <HeaderIA />
      <CsvForm />
      {/* <GlobalStatisticsIA forceUpdate={forceUpdate} /> */}
      {/* <CsvForm />
      <GloabalStatisticsIA /> */}
      {/* <DataContainer /> */}
    </Container>
  )
}

export default App
