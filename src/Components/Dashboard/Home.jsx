import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { SiTicktick } from "react-icons/si";
import { FiRefreshCcw } from "react-icons/fi";
import { BiSolidTimer } from "react-icons/bi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import styles from './Home.module.css'; // Import the correct CSS module

function Home() {
    const navigate = useNavigate();
    const [agedItemsTotal, setAgedItemsTotal] = useState(0);
    const [ongoingOntrackTotal, setOngoingOntrackTotal] = useState(0);
    const [completedItemsTotal, setCompletedItemsTotal] = useState(0); // State for completed items total

    useEffect(() => {
        fetch('http://localhost:5001/api/aged-items')
            .then(response => response.json())
            .then(data => {
                const total = data.reduce((sum, item) => sum + (item["Total"] || 0), 0);
                setAgedItemsTotal(total);
            })
            .catch(error => console.error('Error fetching aged items:', error));

        fetch('http://localhost:5001/api/ongoing-ontrack')
            .then(response => response.json())
            .then(data => {
                const total = data.reduce((sum, item) => sum + (item["Total"] || 0), 0);
                setOngoingOntrackTotal(total);
            })
            .catch(error => console.error('Error fetching ongoing-ontrack items:', error));

        fetch('http://localhost:5001/api/completed-items') // Fetch completed items
            .then(response => response.json())
            .then(data => {
                const total = data.reduce((sum, item) => sum + (item["Total"] || 0), 0);
                setCompletedItemsTotal(total); // Set the total for completed items
            })
            .catch(error => console.error('Error fetching completed items:', error));
    }, []);

    const formatTotal = (total) => {
        if (total >= 1e9) {
            return (total / 1e9).toFixed(1) + 'B';
        } else if (total >= 1e6) {
            return (total / 1e6).toFixed(1) + 'M';
        } else {
            return total.toString();
        }
    };

    //MOM completed vs ongoing/aged items chart data
    const data = [
        { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'June', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'July', uv: 3490, pv: 4300, amt: 2100 },
        { name: 'Aug', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Sept', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Oct', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Nov', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Dec', uv: 3490, pv: 4300, amt: 2100 },
    ];

    const handleCardClick = (path) => {
        navigate(path);
    };

    return (
        <main className={styles.mainContainer}>
            <div className={styles.mainTitle}>
                <h3>DASHBOARD</h3>
            </div>
            <div className={styles.mainCards}>
                <div className={styles.card} onClick={() => handleCardClick('/aged-items')}>
                    <div className={styles.cardInner}>
                        <h3>AGED AMOUNT</h3>
                        <BsFillBellFill className={styles.cardIcon} />
                    </div>
                    <h1>{formatTotal(agedItemsTotal)}</h1> {/* Display the formatted total */}
                </div>
                <div className={styles.card} onClick={() => handleCardClick('/ongoing-ontrack')}>
                    <div className={styles.cardInner}>
                        <h3>ONGOING-ONTRACK</h3>
                        <FiRefreshCcw className={styles.cardIcon} />
                    </div>
                    <h1>{formatTotal(ongoingOntrackTotal)}</h1> {/* Display the formatted total */}
                </div>
                <div className={styles.card} onClick={() => handleCardClick('/completed')}>
                    <div className={styles.cardInner}>
                        <h3>COMPLETED</h3>
                        <SiTicktick className={styles.cardIcon} />
                    </div>
                    <h1>{formatTotal(completedItemsTotal)}</h1> {/* Display the grand total of completed items */}
                </div>
                <div className={styles.card}>
                    <div className={styles.cardInner}>
                        <h3>TARGET</h3>
                        <BsFillArchiveFill className={styles.cardIcon} />
                    </div>
                    <h1>0.00</h1>
                </div>
            </div>

            <div className={styles.charts}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </main>
    );
}

export default Home;