import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generatePDF = (records) => {
    const doc = new jsPDF();

    // Page border
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);

    // Title
    doc.setFont("times", "bold");
    doc.setFontSize(18);
    doc.text("Medical History Report", 105, 20, { align: "center" });

    // Table headers (No Action column included)
    const columns = [
        { header: "No.", dataKey: "no" },
        { header: "Date", dataKey: "date" },
        { header: "Diagnosis", dataKey: "diagnosis" },
        { header: "Treatment", dataKey: "treatment" },
        { header: "Doctor", dataKey: "doctor" },
        { header: "Hospital", dataKey: "hospital" },
        { header: "Next Checkup", dataKey: "nextCheckup" },
        { header: "Scan File", dataKey: "scanFile" },
        { header: "Notes", dataKey: "notes" },
    ];

    // Format rows
    const rows = records.map((record, index) => ({
        no: index + 1,
        date: record.date || "",
        diagnosis: record.diagnosis || "",
        treatment: record.treatment || "",
        doctor: record.doctor || "",
        hospital: record.hospital || "",
        nextCheckup: record.nextCheckup || "",
        scanFile: record.scanFile ? "Yes" : "No",
        notes: record.notes || "No",
    }));

    // Generate table
    autoTable(doc, {
        startY: 30,
        head: [columns.map(col => col.header)],
        body: rows.map(row => columns.map(col => row[col.dataKey])),
        styles: {
            font: "times",
            fontSize: 10,
            cellPadding: 3,
        },
        headStyles: {
            fillColor: [22, 160, 133],
            textColor: [255, 255, 255],
            fontStyle: "bold",
        },
        alternateRowStyles: {
            fillColor: [240, 240, 240],
        },
        margin: { left: 12, right: 12 },
    });

    doc.save("Medical_History_Report.pdf");
};

export default generatePDF;
