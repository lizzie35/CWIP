import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./OngoingOntrack.module.css";

const OngoingOntrack = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [dates, setDates] = useState({});

    useEffect(() => {
        fetch('http://localhost:5001/api/ongoing-ontrack') // Ensure this URL matches the backend server URL
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setItems(data))
            .catch(error => setError(error.message));
    }, []);

    const handleBack = () => {
        navigate('/dashboard');
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDateChange = (date, projectName) => {
        setDates(prevDates => ({
            ...prevDates,
            [projectName]: { date, submitted: false }
        }));
    };

    const handleDateSubmit = (projectName) => {
        setDates(prevDates => ({
            ...prevDates,
            [projectName]: { ...prevDates[projectName], submitted: true }
        }));
        alert(`Date for ${projectName} has been submitted: ${dates[projectName]?.date?.toLocaleDateString()}`);
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    };

    const filteredItems = items.filter(item =>
        item["Stakeholders"]?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Summing up the grand total
    const grandTotal = filteredItems.reduce((sum, item) => sum + (item["Total"] || 0), 0);

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={handleBack}>Back</button>
            <h1>Ongoing Ontrack</h1>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search here"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            {filteredItems.length > 0 ? (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Period</th>
                            <th>Stakeholders</th>
                            <th>Responsibility</th>
                            <th>Current CIP</th>
                            <th>Total</th>
                            <th>On Air Dates</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map(item => (
                            <tr key={item["Project Name"]}> {/* Ensure each row has a unique key */}
                                <td>{item["Project Name"] || "N/A"}</td>
                                <td>{item["Period"] || "N/A"}</td>
                                <td>{item["Stakeholders"] || "N/A"}</td>
                                <td>{item["Responsibility"] || "N/A"}</td>
                                <td>{formatNumber(item["Current CIP"] || 0)}</td>
                                <td>{formatNumber(item["Total"] || 0)}</td>
                                <td>
                                    <div className={styles.datePickerContainer}>
                                        <DatePicker
                                            selected={dates[item["Project Name"]]?.date || null}
                                            onChange={(date) => handleDateChange(date, item["Project Name"])}
                                            dateFormat="dd/MM/yyyy"
                                            className={styles.datePicker}
                                            placeholderText="Select Date"
                                        />
                                        {!dates[item["Project Name"]]?.submitted && (
                                            <button
                                                className={styles.submitButton}
                                                onClick={() => handleDateSubmit(item["Project Name"])}
                                            >
                                                Submit
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className={styles.noRecords}>No matching records found</p>
            )}
            <div className={styles.grandTotal}>
                <strong>Grand Total: </strong>{formatNumber(grandTotal)}
            </div>
        </div>
    );
};

export default OngoingOntrack;
