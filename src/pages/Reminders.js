import React, { useState, useEffect } from 'react';
import { CalendarToday, AccessTime, Close } from '@mui/icons-material';

const checkupTypes = [
  'General Health Checkup',
  'Dental Checkup',
  'Eye Examination',
  'Blood Test',
  'Cardiology Checkup',
  'Dermatology Checkup',
  'Gynecology Checkup',
  'Urology Checkup',
  'Pediatric Checkup',
  'Vaccination',
  'Other'
];

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [type, setType] = useState(checkupTypes[0]);
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Load reminders from localStorage on component mount
  useEffect(() => {
    const savedReminders = localStorage.getItem('healthConnectReminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);

  // Save reminders to localStorage when they change
  useEffect(() => {
    localStorage.setItem('healthConnectReminders', JSON.stringify(reminders));
  }, [reminders]);

  // Show popup if any reminder is set for today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todaysReminder = reminders.find(r => r.date === today);
    if (todaysReminder) {
      alert(`Reminder: You have a "${todaysReminder.type}" today!`);
    }
  }, [reminders]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date) return;

    const newReminder = {
      id: Date.now().toString(),
      type,
      date,
      notes: notes.trim() !== '' ? notes : undefined
    };

    setReminders([...reminders, newReminder]);
    setSuccessMessage('Reminder set successfully.');
    setTimeout(() => setSuccessMessage(''), 3000);
    setType(checkupTypes[0]);
    setDate('');
    setNotes('');
  };

  const removeReminder = (id) => {
    const today = new Date().toISOString().split('T')[0];
    const reminderToDelete = reminders.find(r => r.id === id);

    if (reminderToDelete?.date === today) {
      alert("Today's reminder cannot be deleted.");
      return;
    }

    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const sortedReminders = [...reminders].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 24, marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <CalendarToday style={{ color: '#3b82f6', marginRight: 10 }} />
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Monthly Checkup Reminders</h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
          <div>
            <label htmlFor="checkupType" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
              Select Checkup Type
            </label>
            <select
              id="checkupType"
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc' }}
            >
              {checkupTypes.map(ct => (
                <option key={ct} value={ct}>{ct}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="reminderDate" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
              Reminder Date
            </label>
            <input
              type="date"
              id="reminderDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
              style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label htmlFor="notes" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
              Note (Optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc' }}
              placeholder="Add any additional notes about your checkup"
            />
          </div>

          <button
            type="submit"
            style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '12px 18px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
          >
            SET REMINDER
          </button>

          {successMessage && (
            <p style={{ color: '#16a34a', fontWeight: 600 }}>{successMessage}</p>
          )}
        </form>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>Upcoming Reminders</h2>

        {sortedReminders.length === 0 ? (
          <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No reminders set. Use the form above to add a reminder.</p>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {sortedReminders.map(reminder => (
              <div
                key={reminder.id}
                style={{ border: '1px solid #e5e7eb', borderRadius: 10, padding: 16, transition: 'box-shadow 0.25s' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontWeight: 600 }}><span style={{ color: '#374151' }}>Checkup:</span> {reminder.type}</p>
                    <p style={{ margin: '0', color: '#4b5563' }}><span style={{ fontWeight: 600 }}>Date:</span> {new Date(reminder.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    {reminder.notes && (
                      <p style={{ margin: '8px 0 0 0', color: '#4b5563' }}><span style={{ fontWeight: 600 }}>Notes:</span> {reminder.notes}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeReminder(reminder.id)}
                    aria-label="Remove reminder"
                    style={{ backgroundColor: '#e5e7eb', padding: 8, borderRadius: 8, border: 'none', cursor: 'pointer' }}
                  >
                    <Close style={{ width: 18, height: 18, color: '#374151' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reminders;
