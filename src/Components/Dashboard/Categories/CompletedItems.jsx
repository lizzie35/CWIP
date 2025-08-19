import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CompletedItems.module.css";

const CompletedItems = () => {
    const [completedItems, setCompletedItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5001/api/completed-items')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setCompletedItems(data))
            .catch(error => setError(error.message));
    }, []);

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value); // Update search query state
    };

    // Filter items based on search query
    const filteredItems = completedItems.filter(item =>
        item["Stakeholders"]?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate the grand total
    const grandTotal = filteredItems.reduce((sum, item) => sum + (item["Total"] || 0), 0);

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={handleBack}>Back</button>
            <h1>Completed Items</h1>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search by Stakeholders"
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
                                <th>On Air Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item["Project Name"] || "N/A"}</td>
                                    <td>{item["Period"] || "N/A"}</td>
                                    <td>{item["Stakeholders"] || "N/A"}</td>
                                    <td>{item["Responsibility"] || "N/A"}</td>
                                    <td>{formatNumber(item["Current CIP"] || 0)}</td>
                                    <td>{formatNumber(item["Total"] || 0)}</td>
                                    <td>{item["On Air Date"] ? new Date(item["On Air Date"]).toLocaleDateString() : "N/A"}</td>
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

export default CompletedItems;
