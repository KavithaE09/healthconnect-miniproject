import React, { useState } from 'react';
import { hospitals } from '../data/hospitals';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';
import './NearbyHospitals.css';

const NearbyHospitals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);
  const [bookedHospital, setBookedHospital] = useState(null);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);

  const [userCheckup, setUserCheckup] = useState('');
  const [userDate, setUserDate] = useState('');
  const [userTime, setUserTime] = useState('');

  const specialties = ['All', ...new Set(hospitals.flatMap((hospital) => hospital.specialties))].sort();

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === 'All' ||
      hospital.specialties.some((s) => s.includes(selectedSpecialty));

    return matchesSearch && matchesSpecialty;
  });

  const handleBookAppointment = (hospitalId) => {
    setSelectedHospitalId(hospitalId);
    const hospital = hospitals.find((h) => h.id === hospitalId);
    if (hospital) {
      setBookedHospital(hospital.name);
      setShowBookingForm(true);
    }
  };

  const handleConfirmBooking = () => {
    if (userCheckup && userDate && userTime) {
      setShowBookingForm(false);
      setShowBookingConfirm(true);
    }
  };

  return (
    <div className="nearby-hospitals">
      <div className="text-center mb-8">
        <h1>Nearby Hospitals in Tirunelveli</h1>
        <p>Find the best hospitals around you for checkups and treatments</p>
      </div>

      <div className="search-panel">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon fontSize="small" style={{ color: '#94a3b8' }} />
            </div>
            <input
              type="text"
              placeholder="Search by hospital name or location..."
              className="block w-full pl-10 pr-3 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <select
              className="block w-full px-3 py-2"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="hospitals-grid">
        {filteredHospitals.map((hospital) => (
          <div key={hospital.id} className="hospital-card">
            <div className="h-48 overflow-hidden">
              <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
            </div>
            <div className="hospital-body">
              <h2>{hospital.name}</h2>
              <div className="info-row">
                <LocationOnIcon fontSize="small" style={{ color: '#ef4444' }} />
                <span>{hospital.location}</span>
              </div>
              <div className="info-row">
                <PhoneIcon fontSize="small" style={{ color: '#0ea5e9' }} />
                <span>{hospital.contact}</span>
              </div>
              <div className="info-row">
                <StarIcon fontSize="small" style={{ color: '#fbbf24' }} />
                <span>Rating: {hospital.rating}</span>
              </div>

              <div className="spec-list">
                {hospital.specialties.map((specialty, index) => (
                  <span key={index} className="spec-pill">
                    {specialty}
                  </span>
                ))}
              </div>

              <button onClick={() => handleBookAppointment(hospital.id)}>
                BOOK APPOINTMENT
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredHospitals.length === 0 && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">No hospitals found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedSpecialty('All');
            }}
            className="mt-4 action-btn"
          >
            Clear Filters
          </button>
        </div>
      )}

      {showBookingForm && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Book Appointment</h2>
            <p className="mb-2">{bookedHospital}</p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter checkup type"
                className="w-full px-4 py-2 border rounded-md"
                value={userCheckup}
                onChange={(e) => setUserCheckup(e.target.value)}
              />
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-md"
                value={userDate}
                onChange={(e) => setUserDate(e.target.value)}
              />
              <input
                type="time"
                className="w-full px-4 py-2 border rounded-md"
                value={userTime}
                onChange={(e) => setUserTime(e.target.value)}
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button onClick={() => setShowBookingForm(false)} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleConfirmBooking} className="action-btn">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showBookingConfirm && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckIcon fontSize="large" style={{ color: '#16a34a' }} />
              </div>
              <h2>Thank you for booking at {bookedHospital}!</h2>
            </div>
            <div className="mb-6 text-center">
              <p className="text-gray-700 mb-2">
                Your appointment for <strong>{userCheckup}</strong> on <strong>{userDate}</strong> at <strong>{userTime}</strong> has been confirmed.
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setShowBookingConfirm(false);
                  setUserCheckup('');
                  setUserDate('');
                  setUserTime('');
                }}
                className="action-btn"
              >
                BOOK ANOTHER APPOINTMENT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyHospitals;
