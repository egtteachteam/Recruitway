import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../../../context/auth-context';
import { Link, useNavigate } from 'react-router-dom';
import { useCompanyContext } from '../../../context/company-context';
import formatDateToRelative from '../../../Helper/dateFormatter';

const CompanyNavbar = () => {

    const { user, logout } = useAuthContext();
    const [showModal, setShowModal] = useState(false);

    return (
        <header className="app-header">
            <nav className="navbar navbar-expand-lg navbar-light px-1 px-md-1 px-lg-5">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button className="nav-link sidebartoggler nav-icon-hover ms-n3 bg-white border-0" id="headerCollapse" >
                            <i className="ti ti-menu-2"></i>
                        </button>
                    </li>
                    <li className="nav-item d-none d-lg-block">
                        <a
                            className="nav-link nav-icon-hover"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowModal(true);
                            }}
                        >
                            <i className="ti ti-search"></i>
                        </a>
                    </li>
                </ul>
                <div className="d-block d-lg-none">
                    <img src="/images/logos/logo.webp" className="light-logo" width="160" alt="" />
                </div>
                <button className="navbar-toggler p-0 border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="p-2">
                        <i className="ti ti-dots fs-7"></i>
                    </span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <div className="d-flex align-items-center justify-content-between">
                        <a
                            className="nav-link nav-icon-hover d-lg-none"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowModal(true);
                            }}
                        >
                            <i className="ti ti-search fs-7"></i>
                        </a>

                        <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-center">
                            <NotificationsDropdown />
                            <ProfileDropdown user={user} logout={logout} />
                        </ul>
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <div
                        className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1" >
                        <div className="modal-dialog modal-md">
                            <div className="modal-content rounded-3 shadow-lg">
                                <div className="modal-header border-0 px-3 pt-3">
                                    <h5 className="modal-title fw-semibold">Search</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body px-3 pb-3">
                                    <div className="input-group input-group-md">
                                        <input
                                            type="search"
                                            className="form-control rounded-start"
                                            placeholder="Type your query..."
                                            id="search"
                                        />
                                        <button className="btn btn-primary rounded-end px-4">
                                            <i className="bi bi-search me-2"></i>Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

const NotificationsDropdown = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();

    const { notifications, unreadCount } = useCompanyContext();

    const handleToggleDropdown = (e) => {
        e.preventDefault();
        const newState = !showDropdown;
        setShowDropdown(newState);
    };

    const handleViewAll = () => {
        navigate('/company/notifications');
        setShowDropdown(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <li className="nav-item dropdown" ref={dropdownRef}>
            <button
                ref={buttonRef}
                className="nav-link nav-icon-hover position-relative p-0 bg-transparent border-0"
                onClick={handleToggleDropdown}
                aria-expanded={showDropdown}
                aria-label="Notifications"
            >
                <i className="ti ti-bell-ringing"></i>
                {unreadCount > 0 && (
                    <span className="position-absolute start-100 translate-middle badge bg-danger p-1">
                        {unreadCount > 9 ? '9+' : unreadCount}
                        <span className="visually-hidden">unread notifications</span>
                    </span>
                )}
            </button>

            <div
                className={`dropdown-menu dropdown-menu-end dropdown-menu-animate-up p-0 ${showDropdown ? 'show' : ''}`}
                style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    zIndex: 1000,
                    minWidth: '350px'
                }}
            >
                <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
                    <h5 className="mb-0 fw-semibold">Notifications</h5>
                    {unreadCount > 0 && (
                        <span className="badge bg-primary rounded-pill">{unreadCount} new</span>
                    )}
                </div>

                <div className="notification-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {notifications.length > 0 ? (
                        <>
                            {notifications.map((item) => (
                                <div
                                    key={item._id}
                                    role="button"
                                    tabIndex={0}
                                    className={`dropdown-item p-3 d-flex align-items-start gap-3 ${!item.read ? 'bg-light-primary' : ''}`}
                                >
                                    <div className={`flex-shrink-0 rounded-circle p-2 ${item.read ? 'bg-light' : 'bg-primary bg-opacity-10'}`}>
                                        {item.metadata?.applicantPhoto ? (
                                            <img
                                                src={item.metadata.applicantPhoto}
                                                alt={item.metadata.applicantName}
                                                className="rounded-circle"
                                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <i className={`ti ti-${item.icon || 'bell'} fs-5 ${item.read ? 'text-muted' : 'text-primary'}`}></i>
                                        )}
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-start mb-1 gap-2">
                                            <h6 className={`mb-0 fw-semibold ${item.read ? 'text-muted' : 'text-dark'} text-truncate`}>
                                                {item.metadata.jobTitle}
                                            </h6>
                                            <small className="text-muted text-nowrap">
                                                {formatDateToRelative(item.timestamp)}
                                            </small>
                                        </div>
                                        <p className={`mb-0 ${item.read ? 'text-muted' : ''} text-wrap`}>
                                            {item.message}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="text-center py-5 px-4">
                            <div className="bg-light rounded-circle p-4 d-inline-flex mb-3">
                                <i className="ti ti-bell-off fs-4 text-muted"></i>
                            </div>
                            <h6 className="text-muted mb-1">No notifications</h6>
                            <p className="small text-muted mb-0">You're all caught up</p>
                        </div>
                    )}
                </div>

                <div className="p-3 border-top">
                    <button
                        className="btn btn-outline-secondary w-100"
                        onClick={handleViewAll}
                    >
                        View All Notifications
                    </button>
                </div>
            </div>
        </li>
    );
};

const ProfileDropdown = ({ user, logout }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate()
    
    const handleClick = (e) => {
        e.preventDefault();
        setShowDropdown(!showDropdown);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <li className="nav-item dropdown position-relative" ref={dropdownRef}>
            <a
                ref={buttonRef}
                className="nav-link pe-0"
                href="#"
                onClick={handleClick}
                aria-expanded={showDropdown}
            >
                <div className="d-flex align-items-center">
                    <div className="user-profile-img">
                        <img
                            src={user?.profilePicture ? user?.profilePicture : "/images/profile/user-1.jpg"}
                            className="rounded-circle object-fit-cover"
                            width="35"
                            height="35"
                            alt="Profile"
                        />
                    </div>
                </div>
            </a>

            {showDropdown && (
                <div className="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up show bg-light-primary"
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: '100%',
                        zIndex: 1000,
                        minWidth: '350px'
                    }}
                >
                    <div className="profile-dropdown position-relative" data-simplebar style={{ maxHeight: '80vh' }}>
                        <div className="py-3 px-7 pb-0">
                            <h5 className="mb-0 fs-5 fw-semibold text-capitalize">{user?.role} Profile</h5>
                        </div>
                        <div className="d-flex align-items-center py-9 mx-7 border-bottom">
                            <img
                                src={user?.profilePicture ? user?.profilePicture : "/images/profile/user-1.jpg"}
                                className="rounded-circle object-fit-cover"
                                width="80"
                                height="80"
                                alt="Profile"
                            />
                            <div className="ms-3">
                                <h5 className="mb-1 fs-3 text-capitalize">{user?.fullname}</h5>
                                <span className="mb-1 d-block text-dark text-capitalize">{user?.role}</span>
                                <p className="mb-0 d-flex text-dark align-items-center gap-1">
                                    <i className="ti ti-mail fs-4"></i> {user?.email}
                                </p>
                            </div>
                        </div>
                        <div className="message-body">
                            <Link
                                to="/company/profile"
                                className="py-8 px-7 mt-8 d-flex align-items-center"
                                onClick={() => setShowDropdown(false)}
                            >
                                <span className="d-flex align-items-center justify-content-center bg-white rounded-1 p-6">
                                    <img
                                        src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-account.svg"
                                        alt="Profile"
                                        width="24"
                                        height="24"
                                    />
                                </span>
                                <div className="w-75 d-inline-block v-middle ps-3">
                                    <h6 className="mb-1 bg-hover-primary fw-semibold">My Profile</h6>
                                    <span className="d-block text-dark">Account Settings</span>
                                </div>
                            </Link>
                            <Link
                                to="/company/inbox"
                                className="py-8 px-7 d-flex align-items-center"
                                onClick={() => setShowDropdown(false)}
                            >
                                <span className="d-flex align-items-center justify-content-center bg-white rounded-1 p-6">
                                    <img
                                        src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-inbox.svg"
                                        alt="Inbox"
                                        width="24"
                                        height="24"
                                    />
                                </span>
                                <div className="w-75 d-inline-block v-middle ps-3">
                                    <h6 className="mb-1 bg-hover-primary fw-semibold">My Inbox</h6>
                                    <span className="d-block text-dark">Messages & Emails</span>
                                </div>
                            </Link>
                        </div>
                        <div className="d-grid py-4 px-7 pt-8">
                            <div className="upgrade-plan bg-white-primary position-relative overflow-hidden rounded-4 p-4 mb-9">
                                <div className="row">
                                    <div className="col-6">
                                        <h5 className="fs-4 mb-3 w-50 fw-semibold text-dark">Unlimited Access</h5>
                                        <button className="btn btn-primary text-white">Upgrade</button>
                                    </div>
                                    <div className="col-6">
                                        <div className="m-n4">
                                            <img
                                                src="/images/backgrounds/unlimited-bg.png"
                                                alt="Upgrade"
                                                className="w-100"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    logout();
                                    setShowDropdown(false);
                                    navigate("/login")
                                }}
                                className="btn btn-outline-primary"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </li>
    );
};

export default CompanyNavbar;
