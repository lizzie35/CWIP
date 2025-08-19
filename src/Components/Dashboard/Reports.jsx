import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Reports.module.css"; // Import the CSS module

const Reports = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/dashboard'); // Navigate back to the dashboard
    };

    const downloadCompletedItemsReport = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/completed-items');
            if (!response.ok) {
                throw new Error('Failed to fetch completed items data');
            }
            const data = await response.json();

            const headers = ["Project Name", "Period", "Stakeholders", "Responsibility", "Current CIP", "Total", "On Air Date"];
            const rows = data.map(item => [
                item["Project Name"] || "N/A",
                item["Period"] || "N/A",
                item["Stakeholders"] || "N/A",
                item["Responsibility"] || "N/A",
                item["Current CIP"] || 0,
                item["Total"] || 0,
                item["On Air Date"] ? new Date(item["On Air Date"]).toLocaleDateString() : "N/A"
            ]);

            const csvContent = [
                headers.join(","),
                ...rows.map(row => row.join(","))
            ].join("\n");

            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "CompletedItemsReport.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading report:', error.message);
            alert('Failed to download report');
        }
    };

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={handleBack}>Back</button>
            <h1>Reports</h1>
            <p>Click the button below to download the completed items as a CSV file.</p>
            <button className={styles.downloadButton} onClick={downloadCompletedItemsReport}>
                Download Completed Items
            </button>
        </div>
    );
};

export default Reports;
