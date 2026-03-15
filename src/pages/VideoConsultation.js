import React, { useState } from 'react';
import { CalendarToday, Videocam, ChatBubbleOutline, Info } from '@mui/icons-material';
import { doctors } from '../data/doctors';

const VideoConsultation = () => {
  const [selectedTab, setSelectedTab] = useState('video');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const filteredDoctors = doctors.filter((doctor) => {
    return (
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.qualification.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleConsultationRequest = (doctorId, type) => {
    const doctor = doctors.find((doc) => doc.id === doctorId);

    if (doctor) {
      setSelectedDoctor(doctorId);
      setConfirmationMessage(
        `Your ${type} consultation request with ${doctor.name} has been sent. You will receive a confirmation shortly.`
      );
      setShowModal(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Online Consultation</h1>
        <p className="text-gray-600 mt-2">Connect with doctors through video calls or chat</p>
      </div>

      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-4 px-6 ${
              selectedTab === 'video'
                ? 'border-b-2 border-blue-500 font-medium text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedTab('video')}
          >
            <div className="flex items-center">
              <Videocam fontSize="small" className="mr-2" />
              Video Consultation
            </div>
          </button>
          <button
            className={`py-4 px-6 ${
              selectedTab === 'chat'
                ? 'border-b-2 border-blue-500 font-medium text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedTab('chat')}
          >
            <div className="flex items-center">
              <ChatBubbleOutline fontSize="small" className="mr-2" />
              Chat Consultation
            </div>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mb-8 bg-blue-50 rounded-lg p-4 flex items-start">
        <Info fontSize="small" className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-blue-800 mb-1">About Online Consultations</h3>
          <p className="text-blue-700 text-sm">
            {selectedTab === 'video'
              ? 'Video consultations allow you to speak face-to-face with a doctor from the comfort of your home. Make sure you have a good internet connection and a quiet space for your appointment.'
              : 'Chat consultations let you discuss your health concerns through text messaging. This is convenient for non-emergency questions and follow-ups.'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CalendarToday fontSize="small" className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search doctors by name or specialty..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                    <p className="text-blue-600">{doctor.specialty}</p>
                    <p className="text-gray-600 text-sm">{doctor.qualification}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <CalendarToday fontSize="small" className="mr-2" />
                    <span>Available today: 10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Info fontSize="small" className="mr-2" />
                    <span>Consultation fee: ₹{(doctor.consultationFee || 600).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => handleConsultationRequest(doctor.id, 'video')}
                    className={`flex-1 py-2 rounded-md flex items-center justify-center ${
                      selectedTab === 'video'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={selectedTab !== 'video'}
                  >
                    <Videocam fontSize="small" className="mr-2" />
                    Video Call
                  </button>
                  <button
                    onClick={() => handleConsultationRequest(doctor.id, 'chat')}
                    className={`flex-1 py-2 rounded-md flex items-center justify-center ${
                      selectedTab === 'chat'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={selectedTab !== 'chat'}
                  >
                    <ChatBubbleOutline fontSize="small" className="mr-2" />
                    Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">No doctors found matching your search criteria.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Consultation Request Sent!</h2>
              <p className="text-gray-600">{confirmationMessage}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h3 className="font-medium text-gray-800 mb-2">What to expect next:</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>You'll receive a confirmation email with a link to join the consultation.</li>
                <li>Be prepared 5 minutes before your scheduled time.</li>
                <li>Make sure you have a stable internet connection.</li>
                <li>Have your medical history or questions ready.</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoConsultation;
