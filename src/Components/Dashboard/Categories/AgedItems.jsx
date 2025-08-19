import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AgedItems.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AgedItems = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [onAirDates, setOnAirDates] = useState({});
    const [submittedDates, setSubmittedDates] = useState({}); // Track submitted dates
    const [completedItems, setCompletedItems] = useState([]); // Track completed items

    useEffect(() => {
        fetch('http://localhost:5001/api/aged-items') // Ensure this URL matches the backend server URL
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

    const handleFilterClick = () => {
        // Trigger search logic (already handled by filteredItems)
    };

    const handleDateChange = (date, projectName) => {
        setOnAirDates(prevDates => ({
            ...prevDates,
            [projectName]: { date, submitted: false }
        }));
        
    };

    const handleSubmitDate = async (projectName) => {
        const onAirDate = onAirDates[projectName]?.date;

        if (!onAirDate) {
            alert('Please select a valid date before submitting.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/on-air-date', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectName, onAirDate }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to save date: ${errorText}`);
            }

            console.log(`Date saved for ${projectName}:`, onAirDate); // Debugging: Log saved date
            setCompletedItems(prev => [...prev, { ...items.find(item => item["Project Name"] === projectName), "On Air Date": onAirDate }]);
            setItems(prev => prev.filter(item => item["Project Name"] !== projectName));
            setSubmittedDates(prev => ({
                ...prev,
                [projectName]: true
            }));
            alert('Date saved successfully');
        } catch (error) {
            console.error('Error saving date:', error.message);
            alert(`Error saving date: ${error.message}`);
        }
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    };
// Search/filter functionality
    const filteredItems = items.filter(item =>
        item["Stakeholders"]?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const grandTotal = filteredItems.reduce((sum, item) => sum + (item["Total"] || 0), 0);

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={handleBack}>Back</button>
            <h1>Aged Items</h1>
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
                <>
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
                                        <DatePicker
                                            selected={onAirDates[item["Project Name"]]?.date || null}
                                            onChange={(date) => handleDateChange(date, item["Project Name"])}
                                            dateFormat="yyyy/MM/dd"
                                            className={styles.datePicker}
                                            placeholderText="Select Date"
                                        />
                                        {!submittedDates[item["Project Name"]] && (
                                            <button
                                                className={styles.submitButton}
                                                onClick={() => handleSubmitDate(item["Project Name"])}
                                            >
                                                Submit
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={styles.grandTotal}>
                        <strong>Grand Total: </strong>{formatNumber(grandTotal)}
                    </div>
                </>
            ) : (
                <p className={styles.noRecords}>No matching records found</p>
            )}
        </div>
    );
};

export default AgedItems;
