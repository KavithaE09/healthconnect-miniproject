import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import './MedicalHistory.css';

const MedicalHistory = () => {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    date: "", diagnosis: "", treatment: "", doctor: "",
    hospital: "", nextCheckup: "", notes: "", scanFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const addRecord = () => {
    setRecords([...records, { ...form }]);
    setForm({
      date: "", diagnosis: "", treatment: "", doctor: "",
      hospital: "", nextCheckup: "", notes: "", scanFile: null,
    });
  };

  const deleteRecord = (indexToDelete) => {
    const updatedRecords = records.filter((_, index) => index !== indexToDelete);
    setRecords(updatedRecords);
  };

  const generatePDF = () => {
    const input = document.getElementById("reportSection");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.setFontSize(18);
      pdf.text("Medical History Report", 70, 30);
      pdf.addImage(imgData, "PNG", 10, 40, 190, 0);
      pdf.setFontSize(12);
      pdf.text("Doctor's Signature: _______________________", 10, 280);
      pdf.save("Medical_History_Report.pdf");
    });
  };

  return (
    <div className="container p-4 medical-history">
      <h2 className="text-xl font-bold mb-3 text-center">Medical History</h2>

      <div className="add-record-form">
        <div className="form-row">
          <div className="form-field">
            <label>Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Diagnosis</label>
            <input type="text" name="diagnosis" value={form.diagnosis} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Treatment</label>
            <input type="text" name="treatment" value={form.treatment} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Doctor's Name</label>
            <input type="text" name="doctor" value={form.doctor} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Hospital/Clinic</label>
            <input type="text" name="hospital" value={form.hospital} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Next Checkup</label>
            <input type="date" name="nextCheckup" value={form.nextCheckup} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field full-width">
            <label>Additional Notes (optional)</label>
            <textarea name="notes" value={form.notes} onChange={handleChange}></textarea>
          </div>
        </div>

        <div className="form-row">
          <div className="form-field full-width">
            <label>Upload Scan/Prescription File</label>
            <input type="file" id="scanFile" name="scanFile" onChange={handleChange} />
          </div>
        </div>

        <button onClick={addRecord}>Add Record</button>
      </div>

      <div id="reportSection" className="mt-6 border p-4">
        <table className="w-full border" border="1">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th>No.</th>
              <th>Date</th>
              <th>Diagnosis</th>
              <th>Treatment</th>
              <th>Doctor</th>
              <th>Hospital</th>
              <th>Next Checkup</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{rec.date}</td>
                <td>{rec.diagnosis}</td>
                <td>{rec.treatment}</td>
                <td>{rec.doctor}</td>
                <td>{rec.hospital}</td>
                <td>{rec.nextCheckup}</td>
                <td>{rec.notes}</td>
                <td>
                  <button className="delete-icon" onClick={() => deleteRecord(index)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="download-btn" onClick={generatePDF}>
        Download PDF
      </button>
    </div>
  );
};

export default MedicalHistory;
