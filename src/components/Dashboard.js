import React, { useState, useEffect } from 'react';
import { saveRideToFirebase, getRidesFromFirebase } from '../services/rideService';

const Dashboard = ({ onClose }) => {
    const [timeRange, setTimeRange] = useState('weekly');
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [simulating, setSimulating] = useState(false);

    useEffect(() => {
        fetchRides();
    }, []);

    const fetchRides = async () => {
        setLoading(true);
        const result = await getRidesFromFirebase();
        if (result.success) {
            setRides(result.rides);
        }
        setLoading(false);
    };

    const handleSimulateRide = async () => {
        setSimulating(true);
        // Simulate a ride between 2km and 20km
        const distance = Math.floor(Math.random() * 18) + 2;
        const rideData = {
            distance: distance,
            duration: distance * 3, // roughly 3 mins per km
            date: new Date().toISOString()
        };

        const result = await saveRideToFirebase(rideData);
        if (result.success) {
            await fetchRides();
        }
        setSimulating(false);
    };

    // Calculate Stats
    const totalDistance = rides.reduce((acc, ride) => acc + ride.distance, 0);
    const moneySaved = (totalDistance * 5).toFixed(0); // ₹5 saved per km
    const co2Saved = (totalDistance * 0.2).toFixed(1); // 0.2kg CO2 per km
    const totalRides = rides.length;

    const stats = [
        { label: 'Total Distance', value: `${totalDistance} km`, icon: '🚲', color: 'from-blue-500 to-cyan-400' },
        { label: 'Money Saved', value: `₹${moneySaved}`, icon: '💰', color: 'from-emerald-500 to-green-400' },
        { label: 'CO₂ Saved', value: `${co2Saved} kg`, icon: '🌱', color: 'from-green-500 to-teal-400' },
        { label: 'Total Rides', value: totalRides.toString(), icon: '🗺️', color: 'from-purple-500 to-pink-400' },
    ];

    // Process Chart Data
    const getChartData = () => {
        if (timeRange === 'weekly') {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const last7Days = [];
            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                last7Days.push(d);
            }

            return last7Days.map(date => {
                const dayStr = days[date.getDay()];
                const dayRides = rides.filter(ride => {
                    const rideDate = new Date(ride.createdAt || ride.date);
                    return rideDate.getDate() === date.getDate() &&
                        rideDate.getMonth() === date.getMonth() &&
                        rideDate.getFullYear() === date.getFullYear();
                });
                return {
                    day: dayStr,
                    dist: dayRides.reduce((acc, ride) => acc + ride.distance, 0)
                };
            });
        } else {
            // Monthly - show last 4 weeks
            const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            // This is a simplified 4-week view, ideally would bucket by actual weeks
            // For now, let's just show dummy distribution if no data, or bucket existing data
            if (rides.length === 0) return weeks.map(w => ({ day: w, dist: 0 }));

            // Simple bucketing for demo purposes
            return weeks.map((w, i) => ({
                day: w,
                dist: rides
                    .filter((_, idx) => idx % 4 === i) // Distribute pseudo-randomly for visual if just a few rides
                    .reduce((acc, ride) => acc + ride.distance, 0)
            }));
        }
    };

    const data = getChartData();
    const maxDist = Math.max(...data.map(d => d.dist), 10); // Minimum scale of 10

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '1200px',
                height: '90vh',
                background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                borderRadius: '24px',
                border: '1px solid rgba(148, 163, 184, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                {/* Header */}
                <div style={{
                    padding: '24px 32px',
                    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <h2 style={{
                            fontSize: '1.8rem',
                            fontWeight: '700',
                            background: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            margin: 0
                        }}>
                            Rider Dashboard
                        </h2>
                        <button
                            onClick={handleSimulateRide}
                            disabled={simulating}
                            style={{
                                padding: '8px 16px',
                                background: simulating ? 'rgba(56, 189, 248, 0.1)' : 'rgba(56, 189, 248, 0.2)',
                                border: '1px solid rgba(56, 189, 248, 0.3)',
                                borderRadius: '8px',
                                color: '#38bdf8',
                                cursor: simulating ? 'wait' : 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            {simulating ? 'Simulating...' : '🚲 Simulate Ride'}
                        </button>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(30, 41, 59, 0.5)',
                            border: '1px solid rgba(148, 163, 184, 0.2)',
                            color: '#94a3b8',
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                            e.currentTarget.style.color = '#ef4444';
                            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
                            e.currentTarget.style.color = '#94a3b8';
                            e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                        }}
                    >
                        ✕
                    </button>
                </div>

                <div style={{
                    padding: '32px',
                    overflowY: 'auto',
                    flex: 1
                }}>
                    {/* Stats Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '24px',
                        marginBottom: '40px'
                    }}>
                        {stats.map((stat, index) => (
                            <div key={index} style={{
                                background: 'rgba(30, 41, 59, 0.4)',
                                borderRadius: '20px',
                                padding: '24px',
                                border: '1px solid rgba(148, 163, 184, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                transition: 'transform 0.2s ease',
                            }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '16px',
                                    background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.8rem',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                }}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '4px' }}>{stat.label}</div>
                                    <div style={{ color: '#f8fafc', fontSize: '1.5rem', fontWeight: '700' }}>{stat.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Analytics Chart */}
                    <div style={{
                        background: 'rgba(30, 41, 59, 0.4)',
                        borderRadius: '24px',
                        padding: '32px',
                        border: '1px solid rgba(148, 163, 184, 0.1)'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '32px'
                        }}>
                            <div>
                                <h3 style={{ color: '#f8fafc', fontSize: '1.2rem', marginBottom: '4px', margin: 0 }}>Ride Analytics</h3>
                                <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>Distance ridden over time</p>
                            </div>
                            <div style={{
                                background: 'rgba(15, 23, 42, 0.5)',
                                padding: '4px',
                                borderRadius: '12px',
                                display: 'flex',
                                gap: '4px'
                            }}>
                                {['weekly', 'monthly'].map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setTimeRange(range)}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            border: 'none',
                                            background: timeRange === range ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                                            color: timeRange === range ? '#38bdf8' : '#94a3b8',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            fontWeight: '500',
                                            textTransform: 'capitalize',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{
                            height: '300px',
                            display: 'flex',
                            alignItems: 'flex-end',
                            gap: '20px',
                            paddingTop: '40px'
                        }}>
                            {loading ? (
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#94a3b8'
                                }}>
                                    Loading analytics...
                                </div>
                            ) : (
                                data.map((item, index) => (
                                    <div key={index} style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '12px',
                                        height: '100%'
                                    }}>
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            borderRadius: '12px 12px 0 0',
                                            columnCount: 1,
                                            position: 'relative' // For tooltip
                                        }}
                                            className="bar-container"
                                        >
                                            <div style={{
                                                width: '100%',
                                                height: `${Math.max((item.dist / maxDist) * 100, 2)}%`, // Minimum height for visibility
                                                background: 'linear-gradient(180deg, #38bdf8 0%, #3b82f6 100%)',
                                                borderRadius: '8px 8px 0 0',
                                                opacity: 0.8,
                                                transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                                position: 'relative'
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '-25px',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    color: '#94a3b8',
                                                    fontSize: '0.8rem',
                                                    fontWeight: '600',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    {item.dist > 0 ? `${item.dist}km` : ''}
                                                </div>
                                            </div>
                                        </div>
                                        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.day}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
