import React, { useState } from 'react';

const Dashboard = ({ onClose }) => {
    const [timeRange, setTimeRange] = useState('weekly');

    const stats = [
        { label: 'Total Distance', value: '2,450 km', icon: '🚲', color: 'from-blue-500 to-cyan-400' },
        { label: 'Money Saved', value: '$320.50', icon: '💰', color: 'from-emerald-500 to-green-400' },
        { label: 'CO₂ Saved', value: '150 kg', icon: '🌱', color: 'from-green-500 to-teal-400' },
        { label: 'Total Rides', value: '42', icon: '🗺️', color: 'from-purple-500 to-pink-400' },
    ];

    const weeklyData = [
        { day: 'Mon', dist: 12 },
        { day: 'Tue', dist: 18 },
        { day: 'Wed', dist: 0 },
        { day: 'Thu', dist: 22 },
        { day: 'Fri', dist: 15 },
        { day: 'Sat', dist: 45 },
        { day: 'Sun', dist: 30 },
    ];

    const monthlyData = [
        { day: 'Week 1', dist: 85 },
        { day: 'Week 2', dist: 120 },
        { day: 'Week 3', dist: 95 },
        { day: 'Week 4', dist: 140 },
    ];

    const data = timeRange === 'weekly' ? weeklyData : monthlyData;
    const maxDist = Math.max(...data.map(d => d.dist));

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
                            {data.map((item, index) => (
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
                                            height: `${(item.dist / maxDist) * 100}%`,
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
                                                fontWeight: '600'
                                            }}>
                                                {item.dist}km
                                            </div>
                                        </div>
                                    </div>
                                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
