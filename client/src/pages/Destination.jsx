import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/destination.css';

const Destination = () => {
    const { name } = useParams();
    const [activeDay, setActiveDay] = useState(1);
    const [destination, setDestination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const res = await axios.get(`/api/destinations/${name}`);
                if (res.data.success) {
                    setDestination(res.data.destination);
                } else {
                    setError('Destination not found');
                }
            } catch (err) {
                setError('Failed to load destination');
                console.error('Error fetching destination:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchDestination();
    }, [name]);

    if (loading) {
        return <div className="content-wrapper"><p>Loading...</p></div>;
    }

    if (error || !destination) {
        return <div className="content-wrapper"><p>{error || 'Destination not found'}</p></div>;
    }

    const itinerary = destination.itinerary || { title: destination.title, days: [] };

    return (
        <div className="content-wrapper">
            <div className="container">
                <div className="image-container">
                    <img src={destination.image} alt={destination.title} className="main-image" />
                </div>
                <h3>{itinerary.title || destination.title}</h3>
                <p className="update-info">Last updated: 2024 Oct 04</p>
            </div>

            {itinerary.days && itinerary.days.length > 0 ? (
                <div className="itinerary">
                    <div className="day-tabs">
                        {itinerary.days.map((_, i) => (
                            <div
                                key={i}
                                className={`day-tab ${activeDay === i + 1 ? 'active' : ''}`}
                                onClick={() => setActiveDay(i + 1)}
                            >
                                Day {i + 1}
                            </div>
                        ))}
                    </div>

                    <div className="day-content">
                        {itinerary.days[activeDay - 1] && (
                            <div>
                                <h2>DAY {activeDay}</h2>
                                <h3>{itinerary.days[activeDay - 1].title}</h3>
                                <p>{itinerary.days[activeDay - 1].content}</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="container">
                    <p>No itinerary available for this destination yet.</p>
                </div>
            )}
        </div>
    );
};

export default Destination;
