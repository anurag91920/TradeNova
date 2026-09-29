import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store/slices/authSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    username: user?.username || '',
    fullName: user?.fullName || '',
    email: user?.email || '',
  });

  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put('/api/settings/profile', profile);
      dispatch(updateUser(data.data));
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwords.newPassword.length < 6) return toast.error('Password too short');
    try {
      await axios.put('/api/settings/password', passwords);
      setPasswords({ currentPassword: '', newPassword: '' });
      toast.success('Password updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-100">Settings</h1>

      <div className="card">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Profile</h2>
        <form onSubmit={handleProfileSave} className="space-y-4">
          {Object.keys(profile).map((key) => (
            <div key={key}>
              <label className="label capitalize">{key === 'fullName' ? 'Full Name' : key}</label>
              <input
                type={key === 'email' ? 'email' : 'text'}
                value={profile[key]}
                onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                className="input-field"
              />
            </div>
          ))}
          <button type="submit" className="btn-primary">Save Changes</button>
        </form>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Change Password</h2>
        <form onSubmit={handlePasswordSave} className="space-y-4">
          <div>
            <label className="label">Current Password</label>
            <input type="password" value={passwords.currentPassword}
              onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
              className="input-field" />
          </div>
          <div>
            <label className="label">New Password</label>
            <input type="password" value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              className="input-field" />
          </div>
          <button type="submit" className="btn-primary">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;