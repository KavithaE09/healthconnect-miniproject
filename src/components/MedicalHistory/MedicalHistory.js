import React, { useState, useEffect } from 'react';
import './MedicalHistory.css';

const MedicalHistory = () => {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    diagnosis: '',
    treatment: '',
    doctor: '',
    hospital: '',
    nextCheckup: '',
    notes: '',
  });
  const [fileInfo, setFileInfo] = useState('');

  useEffect(() => {
    const savedRecords = localStorage.getItem('healthConnectMedicalRecords');
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('healthConnectMedicalRecords', JSON.stringify(records));
  }, [records]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileInfo(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.date || !formData.diagnosis) {
      alert('Please fill in at least the date and diagnosis fields');
      return;
    }

    const newRecord = {
      id: Date.now().toString(),
      ...formData,
      fileInfo: fileInfo || undefined,
    };

    setRecords([...records, newRecord]);

    setFormData({
      date: '',
      diagnosis: '',
      treatment: '',
      doctor: '',
      hospital: '',
      nextCheckup: '',
      notes: '',
    });

    setFileInfo('');

    const fileInput = document.getElementById('fileUpload');
    if (fileInput) fileInput.value = '';
  };

  const deleteRecord = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  const downloadPDF = () => {
    alert('In a production environment, this would generate and download a PDF with all medical history records.');
  };

  const sortedRecords = [...records].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="container p-4 medical-history">
      <h2 className="text-xl font-bold mb-3 text-center">Medical History</h2>

      <form onSubmit={handleSubmit} className="add-record-form">
        <div className="form-row">
          <div className="form-field">
            <label>Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
          </div>
          <div className="form-field">
            <label>Diagnosis</label>
            <input type="text" name="diagnosis" value={formData.diagnosis} onChange={handleInputChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Treatment</label>
            <input type="text" name="treatment" value={formData.treatment} onChange={handleInputChange} />
          </div>
          <div className="form-field">
            <label>Doctor's Name</label>
            <input type="text" name="doctor" value={formData.doctor} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Hospital/Clinic</label>
            <input type="text" name="hospital" value={formData.hospital} onChange={handleInputChange} />
          </div>
          <div className="form-field">
            <label>Next Checkup</label>
            <input type="date" name="nextCheckup" value={formData.nextCheckup} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field full-width">
            <label>Additional Notes (optional)</label>
            <textarea name="notes" value={formData.notes} onChange={handleInputChange}></textarea>
          </div>
        </div>

        <div className="form-row">
          <div className="form-field full-width">
            <label>Upload Scan/Prescription File</label>
            <input type="file" id="fileUpload" onChange={handleFileChange} />
          </div>
        </div>

        <button type="submit">Add Record</button>
      </form>

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
            {sortedRecords.map((record, index) => (
              <tr key={record.id}>
                <td>{index + 1}</td>
                <td>{record.date}</td>
                <td>{record.diagnosis}</td>
                <td>{record.treatment}</td>
                <td>{record.doctor}</td>
                <td>{record.hospital}</td>
                <td>{record.nextCheckup}</td>
                <td>{record.notes}</td>
                <td>
                  <button className="delete-icon" onClick={() => deleteRecord(record.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="download-btn" onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default MedicalHistory;
