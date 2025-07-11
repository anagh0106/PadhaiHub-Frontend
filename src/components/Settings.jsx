import React, { useState } from 'react';
import "../assets/css/Settings.css";
import { motion } from 'framer-motion';
import { FaEdit, FaBell, FaLock, FaUndo, FaShieldAlt, FaUser, FaEnvelope, FaPhone, FaHome, FaBirthdayCake, FaLanguage } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import VantaBackground from './Background';

const SettingsPage = () => {
    const initialProfileState = {
        name: 'John Doe',
        username: '@johndoe',
        profilePic: 'https://i.pravatar.cc/150?img=3',
        phone: '',
        email: '',
        address: '',
        birthdate: '',
        language: 'English',
        privacy: true,
        notifications: true,
        twoFactorAuth: false,
    };

    const [profile, setProfile] = useState(initialProfileState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempInfo, setTempInfo] = useState(profile);

    // Handle profile picture change
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProfile((prev) => ({ ...prev, profilePic: reader.result }));
            reader.readAsDataURL(file);
        }
    };

    // Handle save settings action
    const handleSave = () => {
        toast.success('Settings saved!', { position: 'top-center' });
    };

    // Reset settings to default
    const resetSettings = () => {
        setProfile(initialProfileState);
        toast.info('Settings reset to default', { position: 'top-center' });
    };

    // Save profile updates from modal
    const handleModalSave = () => {
        setProfile(tempInfo);
        setIsModalOpen(false);
        toast.success('Profile updated successfully!', { position: 'top-center' });
    };

    // Toggle feature settings (privacy, notifications, etc.)
    const toggleFeature = (key) => {
        setProfile((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
        toast.info(`${key.charAt(0).toUpperCase() + key.slice(1)} toggled!`, { position: 'top-center' });
    };

    // Modal form field change handler
    const handleModalChange = (e, field) => {
        const { value } = e.target;
        setTempInfo((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <>
            <VantaBackground />
            <div className="settings-page">
                <div className="settings-container">
                    <ToastContainer />
                    <motion.div
                        className="settings-card"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="profile-section">
                            <img src={profile.profilePic} alt="Profile" className="profile-pic" />
                            <label className="edit-btn">
                                Change Picture
                                <input type="file" onChange={handleImageUpload} hidden />
                            </label>
                        </div>

                        <div className="info-section">
                            <h2>{profile.name}</h2>
                            <p>{profile.username}</p>
                            <button className="icon-btn" onClick={() => {
                                setTempInfo(profile);
                                setIsModalOpen(true);
                            }}>
                                <FaEdit /> Edit Info
                            </button>
                        </div>

                        <hr />

                        <div className="details-section">
                            <p><strong>Phone:</strong> {profile.phone || 'Not Provided'}</p>
                            <p><strong>Email:</strong> {profile.email || 'Not Provided'}</p>
                            <p><strong>Address:</strong> {profile.address || 'Not Provided'}</p>
                            <p><strong>Birthdate:</strong> {profile.birthdate || 'Not Provided'}</p>
                            <p><strong>Language:</strong> {profile.language}</p>
                            <p><strong>Privacy:</strong> {profile.privacy ? 'Enabled' : 'Disabled'}</p>
                            <p><strong>Notifications:</strong> {profile.notifications ? 'Enabled' : 'Disabled'}</p>
                            <p><strong>Two-Factor Auth:</strong> {profile.twoFactorAuth ? 'Enabled' : 'Disabled'}</p>
                        </div>

                        <hr />

                        <div className="settings-section">
                            <button className="setting-btn" onClick={() => toggleFeature('privacy')}>
                                <FaLock className="icon" /> {profile.privacy ? 'Disable' : 'Enable'} Privacy
                            </button>
                            <button className="setting-btn" onClick={() => toggleFeature('notifications')}>
                                <FaBell className="icon" /> {profile.notifications ? 'Disable' : 'Enable'} Notifications
                            </button>
                            <button className="setting-btn" onClick={() => toggleFeature('twoFactorAuth')}>
                                <FaShieldAlt className="icon" /> {profile.twoFactorAuth ? 'Disable' : 'Enable'} 2FA
                            </button>
                        </div>

                        <button className="save-btn" onClick={handleSave}>Save Changes</button>
                        <button className="reset-btn" onClick={resetSettings}>
                            <FaUndo /> Reset Settings
                        </button>

                        <button className="return-btn" onClick={() => window.history.back()}>
                            Return
                        </button>
                    </motion.div>

                    {isModalOpen && (
                        <div className="modal-overlay">
                            <motion.div className="modal" initial={{ scale: 0.7 }} animate={{ scale: 1 }}>
                                <h3>Edit Profile Info</h3>

                                <div className="modal-field">
                                    <FaUser className="icon" />
                                    <input
                                        type="text"
                                        value={tempInfo.name}
                                        onChange={(e) => handleModalChange(e, 'name')}
                                        placeholder="Name"
                                    />
                                </div>

                                <div className="modal-field">
                                    <FaUser className="icon" />
                                    <input
                                        type="text"
                                        value={tempInfo.username}
                                        onChange={(e) => handleModalChange(e, 'username')}
                                        placeholder="Username"
                                    />
                                </div>

                                <div className="modal-field">
                                    <FaPhone className="icon" />
                                    <input
                                        type="tel"
                                        value={tempInfo.phone}
                                        onChange={(e) => handleModalChange(e, 'phone')}
                                        placeholder="Phone Number"
                                    />
                                </div>

                                <div className="modal-field">
                                    <FaEnvelope className="icon" />
                                    <input
                                        type="email"
                                        value={tempInfo.email}
                                        onChange={(e) => handleModalChange(e, 'email')}
                                        placeholder="Email"
                                    />
                                </div>

                                <div className="modal-field">
                                    <FaHome className="icon" />
                                    <input
                                        type="text"
                                        value={tempInfo.address}
                                        onChange={(e) => handleModalChange(e, 'address')}
                                        placeholder="Address"
                                    />
                                </div>

                                <div className="modal-field">
                                    <FaBirthdayCake className="icon" />
                                    <input
                                        type="date"
                                        value={tempInfo.birthdate}
                                        onChange={(e) => handleModalChange(e, 'birthdate')}
                                    />
                                </div>

                                <div className="modal-field">
                                    <FaLanguage className="icon" />
                                    <select
                                        value={tempInfo.language}
                                        onChange={(e) => handleModalChange(e, 'language')}
                                    >
                                        <option value="English">English</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="Spanish">Spanish</option>
                                        <option value="French">French</option>
                                    </select>
                                </div>

                                <div className="modal-actions">
                                    <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                                    <button onClick={handleModalSave}>Save</button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SettingsPage;