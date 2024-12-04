// MoodTrackerCard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../../../utils/url';
import './MoodTrackerCard.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const MoodTrackerCard = ({ userId }) => {
  const [scale, setScale] = useState(null);
  const [message, setMessage] = useState('');
  const [pastWeekData, setPastWeekData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Submit mood data
  const handleSubmit = async () => {
    if (!scale) {
      setMessage('Please select a mood scale.');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${apiBaseUrl}/api/feeling`,
        { userId, scale },
        { withCredentials: true }
      );
      setMessage('Mood logged successfully!');
      setScale(null); // Reset selected scale
      fetchPastWeekData(); // Refresh data for the graph
    } catch (error) {
      console.error('Error logging mood:', error);
      setMessage(
        error.response?.data?.message || 'Error logging mood. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch mood data for the past week
  const fetchPastWeekData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${apiBaseUrl}/api/feeling/past-week/${userId}`,
        { withCredentials: true }
      );

      // Process data: format dates and sort
      const data = response.data.map((entry) => ({
        date: new Date(entry.date).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
        scale: entry.scale,
      }));

      // Sort data by date
      data.sort((a, b) => new Date(a.date) - new Date(b.date));

      setPastWeekData(data);
    } catch (error) {
      console.error('Error fetching past week data:', error);
      setMessage('Error fetching mood data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPastWeekData();
    } else {
      setMessage('Please log in to use the Mood Tracker.');
    }
  }, [userId]);

  // Handle the case where userId is not provided
  if (!userId) {
    return (
      <div className="mood-tracker">
        <h2>Mood Tracker</h2>
        <p>Please log in to use the Mood Tracker.</p>
      </div>
    );
  }

  return (
    <div className="mood-tracker">
      <h2>Mood Tracker</h2>

      {/* Mood Rating Buttons */}
      <div className="mood-rating">
        {[...Array(10)].map((_, i) => (
          <button
            key={i + 1}
            className={`mood-button ${scale === i + 1 ? 'active' : ''}`}
            onClick={() => setScale(i + 1)}
            disabled={isSubmitting}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <button
        className="mood-button submit"
        onClick={handleSubmit}
        disabled={isSubmitting || !scale}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Mood'}
      </button>

      {/* Message */}
      {message && <p className="message">{message}</p>}

      {/* Graph Section */}
      <div className="mood-graph">
        <h3>Past Week Mood Data</h3>
        {isLoading ? (
          <p>Loading mood data...</p>
        ) : pastWeekData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pastWeekData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[1, 10]} />
              <Tooltip />
              <Line type="monotone" dataKey="scale" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>No mood data available for the past week.</p>
        )}
      </div>

      {/* Links */}
      <div className="mood-links">
        <a href="/albert" className="talk-to-albert">
          Talk to Albert
        </a>
        <a href="/forum" className="forum-link">
          Forum
        </a>
        <a href="/meditation" className="meditation">
          Meditation
        </a>
      </div>
    </div>
  );
};

export default MoodTrackerCard;