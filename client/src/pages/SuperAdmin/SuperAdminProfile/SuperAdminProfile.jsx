// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useAuthContext } from '../../../context/auth-context';
// import PasswordCheck from '../../../components/PasswordCheck';

// const SuperAdminProfile = () => {
//     const { server } = useAuthContext();
//     const token = localStorage.getItem("token");
//     const [editMode, setEditMode] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [showPasswordModal, setShowPasswordModal] = useState(false);
//     const [message, setMessage] = useState({ text: '', type: '' });
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [preview, setPreview] = useState('');

//     const [superAdmin, setSuperAdmin] = useState({
//         profilePicture: null,
//         fullName: "",
//         email: "",
//         phoneNumber: "",
//         role: "Super Admin",
//         permissions: [],
//         lastLogin: "",
//         accountStatus: "Active",
//         securitySettings: {
//             twoFactorAuth: false,
//             loginAlerts: true,
//             passwordChangedAt: ""
//         },
//         systemAccess: {
//             adminPanel: true,
//             userManagement: true,
//             settingsManagement: true,
//             auditLogs: true
//         }
//     });

//     // Fetch super admin profile data
//     const getSuperAdminProfile = async () => {
//         try {
//             const response = await axios.get(`${server}/api/v1/superadmin/profile`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             const data = response.data.data || {};
//             setSuperAdmin({
//                 profilePicture: data.profilePicture || "",
//                 fullName: data.fullName || "",
//                 email: data.email || "",
//                 phoneNumber: data.phoneNumber || "",
//                 role: data.role || "Super Admin",
//                 permissions: data.permissions || [],
//                 lastLogin: data.lastLogin || "",
//                 accountStatus: data.accountStatus || "Active",
//                 securitySettings: data.securitySettings || {
//                     twoFactorAuth: false,
//                     loginAlerts: true,
//                     passwordChangedAt: ""
//                 },
//                 systemAccess: data.systemAccess || {
//                     adminPanel: true,
//                     userManagement: true,
//                     settingsManagement: true,
//                     auditLogs: true
//                 }
//             });
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Failed to fetch profile');
//         }
//     };

//     useEffect(() => {
//         getSuperAdminProfile();
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setSuperAdmin(prev => ({ ...prev, [name]: value }));
//     };

//     const handleObjectChange = (objectName, field, value) => {
//         setSuperAdmin(prev => ({
//             ...prev,
//             [objectName]: { ...prev[objectName], [field]: value }
//         }));
//     };

//     const handleCheckboxChange = (objectName, field) => {
//         setSuperAdmin(prev => ({
//             ...prev,
//             [objectName]: {
//                 ...prev[objectName],
//                 [field]: !prev[objectName][field]
//             }
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setMessage({ text: "", type: "" });

//         try {
//             const formData = new FormData();
//             Object.entries(superAdmin).forEach(([key, value]) => {
//                 if (key !== 'profilePicture' && value !== null && value !== undefined) {
//                     formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
//                 }
//             });

//             if (selectedFile) {
//                 formData.append('profilePicture', selectedFile);
//             }

//             const response = await axios.post(
//                 `${server}/api/v1/superadmin/update-profile`,
//                 formData,
//                 {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                         'Authorization': `Bearer ${token}`
//                     }
//                 }
//             );

//             toast.success('Profile updated successfully!');
//             setEditMode(false);
//             setMessage({ text: 'Profile updated successfully!', type: 'success' });
//             getSuperAdminProfile(); // Refresh profile data
//         } catch (error) {
//             console.error('Error updating profile:', error);
//             setMessage({
//                 text: error.response?.data?.message || 'Failed to update profile',
//                 type: 'error'
//             });
//             toast.error(error.response?.data?.message || 'Failed to update profile');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleFileChange = (e) => {
//         if (!e.target.files || e.target.files.length === 0) {
//             setSelectedFile(null);
//             return;
//         }

//         const file = e.target.files[0];
//         const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//         const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

//         if (!allowedTypes.includes(file.type)) {
//             setMessage({ text: 'Only JPG, JPEG, and PNG formats are allowed.', type: 'error' });
//             setSelectedFile(null);
//             return;
//         }

//         if (file.size > maxSizeInBytes) {
//             setMessage({ text: 'File size should be less than 5MB.', type: 'error' });
//             setSelectedFile(null);
//             return;
//         }

//         setSelectedFile(file);
//         setMessage({ text: '', type: '' });
//     };

//     useEffect(() => {
//         if (!selectedFile) {
//             setPreview('');
//             return;
//         }

//         const objectUrl = URL.createObjectURL(selectedFile);
//         setPreview(objectUrl);

//         return () => URL.revokeObjectURL(objectUrl);
//     }, [selectedFile]);

//     const handlePasswordVerify = async (password) => {
//         try {
//             if (!password) {
//                 return toast.error("Please enter your password.");
//             }

//             const response = await axios.post(
//                 `${server}/api/v1/auth/checkPassword`,
//                 { password },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );

//             if (response.data.success) {
//                 toast.success("Password verified successfully!");
//                 setMessage({ text: "", type: "" });
//                 setEditMode(true);
//                 setShowPasswordModal(false);
//             } else {
//                 toast.error(response.data.message || "Password verification failed.");
//             }
//         } catch (error) {
//             console.error("Password verification error:", error);
//             toast.error(error.response?.data?.message || "Something went wrong during password verification.");
//         }
//     };

//     const handleEditClick = () => {
//         setShowPasswordModal(true);
//     };

//     return (
//         <div className="container-fluid">
//             <div className="container py-4">
//                 {/* Profile Header */}
//                 <form onSubmit={editMode ? handleSubmit : (e) => e.preventDefault()}>
//                     {message?.text && (
//                         <div className={`mb-4 p-3 rounded ${message?.type === 'success' ? 'alert alert-success' : 'alert alert-danger'}`}>
//                             {message.text}
//                         </div>
//                     )}

//                     <div className="row mb-4">
//                         <div className="col-12">
//                             <div className="card shadow-sm">
//                                 <div className="card-body">
//                                     <div className="d-flex flex-column flex-md-row align-items-start gap-4">
//                                         {/* Profile Picture */}
//                                         <div className="d-flex flex-column align-items-center text-center mb-4">
//                                             <div className="position-relative mb-3">
//                                                 <img
//                                                     src={preview || superAdmin?.profilePicture || '/images/profilePictures/user-pic.png'}
//                                                     alt="Profile"
//                                                     className="img-fluid rounded-circle border border-4 border-light"
//                                                     style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//                                                 />
//                                                 {editMode && (
//                                                     <label
//                                                         htmlFor="profilePicture"
//                                                         className="position-absolute bottom-0 end-0 bg-primary text-white p-2 rounded-circle cursor-pointer"
//                                                     >
//                                                         <i className="bi bi-camera"></i>
//                                                         <input
//                                                             id="profilePicture"
//                                                             type="file"
//                                                             accept="image/*"
//                                                             onChange={handleFileChange}
//                                                             className="visually-hidden"
//                                                         />
//                                                     </label>
//                                                 )}
//                                             </div>
//                                             {editMode && (
//                                                 <p className="text-muted small">Click on the camera icon to change your profile picture</p>
//                                             )}
//                                         </div>

//                                         {/* Profile Info */}
//                                         <div className="flex-grow-1">
//                                             <div className="d-flex flex-column flex-lg-row align-items-start justify-content-between gap-4">
//                                                 <div className="flex-grow-1">
//                                                     {editMode ? (
//                                                         <>
//                                                             <input
//                                                                 type="text"
//                                                                 name="fullName"
//                                                                 value={superAdmin?.fullName}
//                                                                 onChange={handleInputChange}
//                                                                 className="form-control form-control-lg mb-2"
//                                                                 placeholder="Full Name"
//                                                                 required
//                                                             />
//                                                             <input
//                                                                 type="email"
//                                                                 name="email"
//                                                                 value={superAdmin?.email}
//                                                                 onChange={handleInputChange}
//                                                                 className="form-control mb-2"
//                                                                 placeholder="Email"
//                                                                 required
//                                                             />
//                                                         </>
//                                                     ) : (
//                                                         <>
//                                                             <h1 className="mb-2">{superAdmin?.fullName || "Super Admin"}</h1>
//                                                             <h2 className="h4 text-muted mb-3">{superAdmin?.email || "Email"}</h2>
//                                                         </>
//                                                     )}

//                                                     <div className="d-flex flex-wrap gap-3">
//                                                         {editMode ? (
//                                                             <div className="d-flex align-items-center gap-2">
//                                                                 <i className="bi bi-telephone me-2"></i>
//                                                                 <input
//                                                                     type="tel"
//                                                                     name="phoneNumber"
//                                                                     value={superAdmin?.phoneNumber}
//                                                                     onChange={handleInputChange}
//                                                                     className="form-control form-control-sm"
//                                                                     placeholder="Phone Number"
//                                                                     style={{ width: '180px' }}
//                                                                 />
//                                                             </div>
//                                                         ) : (
//                                                             <span className="d-flex align-items-center">
//                                                                 <i className="bi bi-telephone me-2"></i>
//                                                                 {superAdmin?.phoneNumber || "Phone Number"}
//                                                             </span>
//                                                         )}
//                                                         <span className="d-flex align-items-center">
//                                                             <i className="bi bi-shield-lock me-2"></i>
//                                                             {superAdmin?.role}
//                                                         </span>
//                                                         <span className="d-flex align-items-center">
//                                                             <i className="bi bi-circle-fill me-2 text-success"></i>
//                                                             {superAdmin?.accountStatus}
//                                                         </span>
//                                                     </div>
//                                                 </div>

//                                                 <div className="d-flex flex-column flex-sm-row gap-2">
//                                                     <button
//                                                         type={editMode ? "submit" : "button"}
//                                                         className={`btn btn-sm ${editMode ? 'btn-success' : 'btn-primary'}`}
//                                                         onClick={!editMode ? handleEditClick : undefined}
//                                                         disabled={isSubmitting}
//                                                     >
//                                                         {isSubmitting ? (
//                                                             <>
//                                                                 <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                                                                 Saving...
//                                                             </>
//                                                         ) : (
//                                                             <>
//                                                                 <i className="bi bi-pencil-square me-2"></i>
//                                                                 {editMode ? 'Save Profile' : 'Edit Profile'}
//                                                             </>
//                                                         )}
//                                                     </button>

//                                                     {editMode && (
//                                                         <button
//                                                             type="button"
//                                                             className="btn btn-sm btn-secondary"
//                                                             onClick={() => {
//                                                                 setEditMode(false);
//                                                                 setMessage({ type: '', text: '' });
//                                                                 setSelectedFile(null);
//                                                             }}
//                                                             disabled={isSubmitting}
//                                                         >
//                                                             Cancel
//                                                         </button>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Main Content */}
//                     <div className="row">
//                         {/* Left Column - Security Settings */}
//                         <div className="col-lg-6 mb-4">
//                             <div className="card shadow-sm h-100">
//                                 <div className="card-header bg-white">
//                                     <h3 className="h5 mb-0">
//                                         <i className="bi bi-shield-lock me-2"></i>
//                                         Security Settings
//                                     </h3>
//                                 </div>
//                                 <div className="card-body">
//                                     <div className="mb-4">
//                                         <h4 className="h6 mb-3">Account Security</h4>
//                                         <div className="form-check form-switch mb-3">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="checkbox"
//                                                 id="twoFactorAuth"
//                                                 checked={superAdmin?.securitySettings?.twoFactorAuth}
//                                                 onChange={() => handleCheckboxChange('securitySettings', 'twoFactorAuth')}
//                                                 disabled={!editMode}
//                                             />
//                                             <label className="form-check-label" htmlFor="twoFactorAuth">
//                                                 Two-Factor Authentication
//                                             </label>
//                                         </div>
//                                         <div className="form-check form-switch">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="checkbox"
//                                                 id="loginAlerts"
//                                                 checked={superAdmin?.securitySettings?.loginAlerts}
//                                                 onChange={() => handleCheckboxChange('securitySettings', 'loginAlerts')}
//                                                 disabled={!editMode}
//                                             />
//                                             <label className="form-check-label" htmlFor="loginAlerts">
//                                                 Login Alerts
//                                             </label>
//                                         </div>
//                                     </div>

//                                     <div className="mb-3">
//                                         <h4 className="h6 mb-3">Last Login</h4>
//                                         <p className="text-muted">
//                                             <i className="bi bi-clock-history me-2"></i>
//                                             {superAdmin?.lastLogin || "No login history available"}
//                                         </p>
//                                     </div>

//                                     <div className="mb-3">
//                                         <h4 className="h6 mb-3">Password Last Changed</h4>
//                                         <p className="text-muted">
//                                             <i className="bi bi-calendar-event me-2"></i>
//                                             {superAdmin?.securitySettings?.passwordChangedAt || "Not available"}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Right Column - System Access */}
//                         <div className="col-lg-6 mb-4">
//                             <div className="card shadow-sm h-100">
//                                 <div className="card-header bg-white">
//                                     <h3 className="h5 mb-0">
//                                         <i className="bi bi-lock me-2"></i>
//                                         System Access
//                                     </h3>
//                                 </div>
//                                 <div className="card-body">
//                                     <div className="mb-4">
//                                         <h4 className="h6 mb-3">Access Permissions</h4>
//                                         <div className="form-check form-switch mb-3">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="checkbox"
//                                                 id="adminPanel"
//                                                 checked={superAdmin?.systemAccess?.adminPanel}
//                                                 onChange={() => handleCheckboxChange('systemAccess', 'adminPanel')}
//                                                 disabled
//                                             />
//                                             <label className="form-check-label" htmlFor="adminPanel">
//                                                 Admin Panel Access
//                                             </label>
//                                         </div>
//                                         <div className="form-check form-switch mb-3">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="checkbox"
//                                                 id="userManagement"
//                                                 checked={superAdmin?.systemAccess?.userManagement}
//                                                 onChange={() => handleCheckboxChange('systemAccess', 'userManagement')}
//                                                 disabled
//                                             />
//                                             <label className="form-check-label" htmlFor="userManagement">
//                                                 User Management
//                                             </label>
//                                         </div>
//                                         <div className="form-check form-switch mb-3">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="checkbox"
//                                                 id="settingsManagement"
//                                                 checked={superAdmin?.systemAccess?.settingsManagement}
//                                                 onChange={() => handleCheckboxChange('systemAccess', 'settingsManagement')}
//                                                 disabled
//                                             />
//                                             <label className="form-check-label" htmlFor="settingsManagement">
//                                                 System Settings
//                                             </label>
//                                         </div>
//                                         <div className="form-check form-switch">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="checkbox"
//                                                 id="auditLogs"
//                                                 checked={superAdmin?.systemAccess?.auditLogs}
//                                                 onChange={() => handleCheckboxChange('systemAccess', 'auditLogs')}
//                                                 disabled
//                                             />
//                                             <label className="form-check-label" htmlFor="auditLogs">
//                                                 Audit Logs Access
//                                             </label>
//                                         </div>
//                                     </div>

//                                     <div>
//                                         <h4 className="h6 mb-3">Permissions</h4>
//                                         {superAdmin?.permissions?.length > 0 ? (
//                                             <div className="d-flex flex-wrap gap-2">
//                                                 {superAdmin.permissions.map((permission, index) => (
//                                                     <span key={index} className="badge bg-primary">
//                                                         {permission}
//                                                     </span>
//                                                 ))}
//                                             </div>
//                                         ) : (
//                                             <p className="text-muted">No specific permissions assigned</p>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </div>

//             <PasswordCheck
//                 show={showPasswordModal}
//                 onClose={() => setShowPasswordModal(false)}
//                 onVerify={handlePasswordVerify}
//             />
//         </div>
//     );
// };

// export default SuperAdminProfile;







// import React, { useState } from 'react';
// import axios from 'axios';
// import PasswordCheck from '../../../components/PasswordCheck';
// import toast from 'react-hot-toast';
// import { useAuthContext } from '../../../context/auth-context';


// const SuperAdminProfile = () => {
//     const [superAdmin, setSuperAdmin] = useState({
//         profilePicture: null,
//         fullName: "",
//         phoneNumber: "",
//         address: ""
//     });
//     const [editMode, setEditMode] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [showPasswordModal, setShowPasswordModal] = useState(false);
//     const [originalData, setOriginalData] = useState({});
//     const token = localStorage.getItem('token');
//     const {server} = useAuthContext()

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setSuperAdmin(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setSuperAdmin(prev => ({
//                 ...prev,
//                 profilePicture: URL.createObjectURL(file)
//             }));
//         }
//     };

//     const handleEditClick = () => {
//         setOriginalData({ ...superAdmin });
//         setShowPasswordModal(true);
//     };

//     const handleCancelEdit = () => {
//         setSuperAdmin({ ...originalData });
//         setEditMode(false);
//     };

//     const handlePasswordVerify = async (password) => {
//         try {
//             if (!password) {
//                 return toast.error("Please enter your password.");
//             }

//             const response = await axios.post(`${server}/api/v1/auth/checkPassword`,
//                 { password },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );

//             if (response.data.success) {
//                 toast.success("Password verified successfully!");
//                 setEditMode(true);
//                 setShowPasswordModal(false);
//             } else {
//                 toast.error(response.data.message || "Password verification failed.");
//             }
//         } catch (error) {
//             console.error("Password verification error:", error);
//             toast.error(error.response?.data?.message || "Something went wrong during password verification.");
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         try {
//             console.log('SuperAdmin data:', superAdmin);
//             toast.success("Profile updated successfully!");
//             setEditMode(false);
//         } catch (error) {
//             console.error("Update error:", error);
//             toast.error(error.response?.data?.message || "Failed to update profile");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <>
//             <div className="container-fluid">
//                 <div className="container mt-5" style={{ maxWidth: '600px' }}>
//                     <h2 className="mb-4">SuperAdmin Profile</h2>

//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-4 d-flex align-items-center">
//                             {/* Profile Picture Upload */}
//                             <div className="me-3">
//                                 <img
//                                     src={superAdmin.profilePicture || "https://via.placeholder.com/80"}
//                                     alt="Profile"
//                                     className="rounded-circle"
//                                     style={{ width: '80px', height: '80px', objectFit: 'cover' }}
//                                 />
//                             </div>
//                             <div>
//                                 <label className={`btn ${editMode ? 'btn-primary' : 'btn-secondary'}`}>
//                                     <i className="bi bi-cloud-upload me-2"></i>
//                                     Upload Profile Picture
//                                     <input
//                                         type="file"
//                                         className="d-none"
//                                         accept="image/*"
//                                         onChange={handleFileChange}
//                                         disabled={!editMode}
//                                     />
//                                 </label>
//                             </div>
//                         </div>

//                         {/* Full Name */}
//                         <div className="mb-3">
//                             <label htmlFor="fullName" className="form-label">Full Name</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="fullName"
//                                 name="fullName"
//                                 value={superAdmin.fullName}
//                                 onChange={handleInputChange}
//                                 required
//                                 disabled={!editMode}
//                             />
//                         </div>

//                         {/* Phone Number */}
//                         <div className="mb-3">
//                             <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
//                             <input
//                                 type="tel"
//                                 className="form-control"
//                                 id="phoneNumber"
//                                 name="phoneNumber"
//                                 value={superAdmin.phoneNumber}
//                                 onChange={handleInputChange}
//                                 required
//                                 disabled={!editMode}
//                             />
//                         </div>

//                         {/* Address */}
//                         <div className="mb-4">
//                             <label htmlFor="address" className="form-label">Address</label>
//                             <textarea
//                                 className="form-control"
//                                 id="address"
//                                 name="address"
//                                 rows="4"
//                                 value={superAdmin.address}
//                                 onChange={handleInputChange}
//                                 required
//                                 disabled={!editMode}
//                             ></textarea>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="d-flex gap-2">
//                             {!editMode ? (
//                                 <button
//                                     type="button"
//                                     className="btn btn-primary flex-grow-1 py-2"
//                                     onClick={handleEditClick}
//                                     disabled={isSubmitting}
//                                 >
//                                     Edit Profile
//                                 </button>
//                             ) : (
//                                 <>
//                                     <button
//                                         type="submit"
//                                         className="btn btn-success flex-grow-1 py-2"
//                                         disabled={isSubmitting}
//                                     >
//                                         {isSubmitting ? 'Saving...' : 'Save Changes'}
//                                     </button>
//                                     <button
//                                         type="button"
//                                         className="btn btn-danger flex-grow-1 py-2"
//                                         onClick={handleCancelEdit}
//                                         disabled={isSubmitting}
//                                     >
//                                         Cancel
//                                     </button>
//                                 </>
//                             )}
//                         </div>
//                     </form>
//                 </div>

//                 {/* Password Verification Modal */}
//                 <PasswordCheck
//                     show={showPasswordModal}
//                     onClose={() => setShowPasswordModal(false)}
//                     onVerify={handlePasswordVerify}
//                 />
//             </div>
//         </>
//     );
// };

// export default SuperAdminProfile;





import React, { useState } from 'react';
import axios from 'axios';
import PasswordCheck from '../../../components/PasswordCheck';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../../context/auth-context';

const SuperAdminProfile = () => {
    const [superAdmin, setSuperAdmin] = useState({
        profilePicture: null,
        fullName: "",
        phoneNumber: "",
        address: ""
    });
    const [editMode, setEditMode] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [originalData, setOriginalData] = useState({});
    const [preview, setPreview] = useState(null);
    const token = localStorage.getItem('token');
    const { server } = useAuthContext()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSuperAdmin(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setSuperAdmin(prev => ({
                ...prev,
                profilePicture: file
            }));
        }
    };

    const handleEditClick = () => {
        setOriginalData({ ...superAdmin });
        setShowPasswordModal(true);
    };

    const handleCancelEdit = () => {
        setSuperAdmin({ ...originalData });
        setPreview(null);
        setEditMode(false);
    };

    const handlePasswordVerify = async (password) => {
        try {
            if (!password) {
                return toast.error("Please enter your password.");
            }

            const response = await axios.post(`${server}/api/v1/auth/checkPassword`,
                { password },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                toast.success("Password verified successfully!");
                setEditMode(true);
                setShowPasswordModal(false);
            } else {
                toast.error(response.data.message || "Password verification failed.");
            }
        } catch (error) {
            console.error("Password verification error:", error);
            toast.error(error.response?.data?.message || "Something went wrong during password verification.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Here you would typically send the data to your backend
            console.log('SuperAdmin data:', superAdmin);
            toast.success("Profile updated successfully!");
            setEditMode(false);
        } catch (error) {
            console.error("Update error:", error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="container py-4">
                    {/* Company Header */}
                    <form onSubmit={editMode ? handleSubmit : (e) => e.preventDefault()}>
                        <div className="row mb-4">
                            {/* {message?.text && (
                                <div className={`mb-4 p-3 rounded ${message?.type === 'success' ? 'alert alert-success' : 'alert alert-danger'}`}>
                                    {message.text}
                                </div>
                            )} */}
                        </div>
                        <div className="col-12">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex flex-column flex-md-row align-items-start gap-4">
                                        {/* Profile Picture Section */}
                                        <div className="d-flex flex-column align-items-start text-center mb-4">
                                            <div className="position-relative mb-3">
                                                <img
                                                    src={preview || superAdmin.profilePicture || '/images/profilePictures/user-pic.png'}
                                                    alt="Profile"
                                                    className="img-fluid rounded-circle border border-4 border-light"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                                {editMode && (
                                                    <label
                                                        htmlFor="profilePicture"
                                                        className="position-absolute bottom-0 end-0 bg-primary text-white p-2 rounded-circle cursor-pointer hover-bg-primary"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            fill="currentColor"
                                                            className="bi bi-camera"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                                                            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                                                        </svg>
                                                        <input
                                                            id="profilePicture"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleFileChange}
                                                            className="visually-hidden"
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                            {editMode && (
                                                <p className="text-muted small">Click on the camera icon to change your profile picture</p>
                                            )}
                                        </div>

                                        {/* Profile Details Section */}
                                        <div className="d-flex flex-column flex-lg-row align-items-start gap-4 w-100">
                                            <div className="flex-grow-1 text-start">
                                                {editMode ? (
                                                    <>
                                                        <input
                                                            type="text"
                                                            name="fullName"
                                                            value={superAdmin.fullName}
                                                            onChange={handleInputChange}
                                                            className="form-control form-control-lg mb-2"
                                                            placeholder="Full Name"
                                                            required
                                                        />
                                                        <input
                                                            type="tel"
                                                            name="phoneNumber"
                                                            value={superAdmin.phoneNumber}
                                                            onChange={handleInputChange}
                                                            className="form-control mb-3"
                                                            placeholder="Phone Number"
                                                            required
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <h1 className="mb-2">{superAdmin.fullName || "Full Name"}</h1>
                                                        <h2 className="h4 text-muted mb-3">
                                                            <i className="ti ti-phone me-2"></i>
                                                            {superAdmin.phoneNumber || "Phone Number"}
                                                        </h2>
                                                    </>
                                                )}

                                                <div className="mb-3">
                                                    {editMode ? (
                                                        <textarea
                                                            name="address"
                                                            value={superAdmin.address}
                                                            onChange={handleInputChange}
                                                            className="form-control"
                                                            rows="3"
                                                            placeholder="Address"
                                                            required
                                                        />
                                                    ) : (
                                                        <div className="d-flex align-items-start">
                                                            <i className="ti ti-map-pin me-2 mt-1"></i>
                                                            <div>
                                                                <h3 className="h6 mb-1">Address</h3>
                                                                <p className="text-muted">
                                                                    {superAdmin.address || "No address provided"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="mt-3 mt-md-0 d-flex flex-column flex-sm-row gap-2">
                                                <button
                                                    type={editMode ? "submit" : "button"}
                                                    className={`btn btn-sm ${editMode ? 'btn-success' : 'btn-primary'}`}
                                                    style={{
                                                        backgroundColor: !editMode && '#5D87FF',
                                                        borderColor: !editMode && '#5D87FF'
                                                    }}
                                                    onClick={!editMode ? handleEditClick : undefined}
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                            Saving...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="ti ti-user-edit me-2"></i>
                                                            {editMode ? 'Save Profile' : 'Edit Profile'}
                                                        </>
                                                    )}
                                                </button>

                                                {editMode && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-secondary"
                                                        onClick={handleCancelEdit}
                                                        disabled={isSubmitting}
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Password Verification Modal */}
                            <PasswordCheck
                                show={showPasswordModal}
                                onClose={() => setShowPasswordModal(false)}
                                onVerify={handlePasswordVerify}
                            />
                        </div>
                    </form >
                </div >
            </div >
        </>
    );
};

export default SuperAdminProfile;