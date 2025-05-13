import React, { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    companyName: "",
    carbonEmissions: "",
    energyUsage: "",
    wasteGenerated: "",
    reportDate: "",
  });

  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/reports");
      setReports(res.data);
    } catch (error) {
      console.error("Failed to fetch reports", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/reports", form);
      setForm({
        companyName: "",
        carbonEmissions: "",
        energyUsage: "",
        wasteGenerated: "",
        reportDate: "",
      });
      fetchReports();
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>Sustainability Report</h1>

      <form onSubmit={handleSubmit}>
        <input name="companyName" placeholder="Company Name" value={form.companyName} onChange={handleChange} required /><br />
        <input name="carbonEmissions" placeholder="Carbon Emissions" value={form.carbonEmissions} onChange={handleChange} required /><br />
        <input name="energyUsage" placeholder="Energy Usage" value={form.energyUsage} onChange={handleChange} required /><br />
        <input name="wasteGenerated" placeholder="Waste Generated" value={form.wasteGenerated} onChange={handleChange} required /><br />
        <input type="date" name="reportDate" value={form.reportDate} onChange={handleChange} required /><br />
        <button type="submit">Submit</button>
      </form>

      <hr />

      <button onClick={fetchReports}>Get All Reports</button>

      <h2>Reports</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <strong>{report.companyName}</strong> – {report.complianceStatus} on {report.reportDate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
