import { createContext, useContext, useEffect, useReducer } from "react";
import companyReducer from "../reducer/company-reducer";
import axios from "axios";
import { useAuthContext } from "./auth-context";
import toast from "react-hot-toast";

const CompanyContext = createContext()

const initialState = {
    isLoading: false,
    jobList: [],
    allAppliedCandidates: [],
    appiledCandidates: [],
    reports: [],
    notifications: [],
    unreadCount: 0
}

const CompanyProvider = ({ children }) => {

    const [state, dispatch] = useReducer(companyReducer, initialState)
    const { server } = useAuthContext()

    const token = localStorage.getItem("token")

    const getAllJobs = async () => {
        dispatch({ type: "SET_LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/company/get-all-job`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            )

            const { jobs } = response.data

            dispatch({ type: "SET_JOBS", payload: { jobs } })
        } catch (error) {
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const addJob = async (jobData) => {
        try {
            const response = await axios.post(`${server}/api/v1/company/create-job-post`,
                jobData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                }
            )
            toast.dismiss()
            toast.success(response.data.message);
        } catch (error) {
            toast.dismiss()
            toast.error(error.response.data.message);
        }
    }

    const handleJobEdit = async (id, data) => {
        try {
            const res = await axios.patch(`${server}/api/v1/company/update-job/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            await getAllJobs()
            toast.success(res.data.message)
        } catch (error) {
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    };

    const handleConfirmDeleteJob = async (jobToDeleteId) => {
        dispatch({ type: "SET_LOADING" })
        try {
            await axios.delete(`${server}/api/v1/company/delete-job/${jobToDeleteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: "SET_DELETE_JOB", payload: { jobToDeleteId } })
        } catch (error) {
            // console.error('Error deleting job:', error);
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    };

    const getAllApplicantsOnAllJob = async () => {
        dispatch({ type: "SET_LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/company/allapplicants`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            )
            const { applicants } = response.data
            dispatch({ type: "SET_ALL_APPLIED_CANDIDATE", payload: { applicants } })
        } catch (error) {
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const getApplicantsOnJob = async (jobId) => {
        dispatch({ type: "SET_LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/company/applicants/${jobId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            )
            const { applicants } = response.data
            dispatch({ type: "SET_APPLIED_CANDIDATE", payload: { applicants } })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const rejectShortlist = async (status, candidateId, applicationId) => {
        try {
            const response = await axios.put(`${server}/api/v1/company/changeStatus/${applicationId}`,
                { status, candidateId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            )
            const { message } = response.data
            toast.dismiss()
            toast.success(message)
        } catch (error) {
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    const getNotification = async () => {
        dispatch({ type: "SET_LOADING" })
        try {
            const response = await axios.get(`${server}/api/v1/company/getCompanyNotification`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            )
            const { notifications, unreadCount } = response.data
            dispatch({ type: "SET_NOTIFICATION", payload: { notifications, unreadCount } })
        } catch (error) {
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        getNotification()
    }, [])

    const markAsRead = async (id) => {
        try {
            const res = await axios.patch(`${server}/api/v1/company/markAsRead/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            )
            getNotification()
            toast.success(res.data.message);
        } catch (error) {
            toast.dismiss()
            toast.error(error.response.data.message)
        }
    }

    return (
        <CompanyContext.Provider value={{
            ...state,
            getAllJobs,
            addJob,
            handleJobEdit,
            handleConfirmDeleteJob,
            getAllApplicantsOnAllJob,
            rejectShortlist,
            getNotification,
            markAsRead
        }}>
            {children}
        </CompanyContext.Provider>
    )
}

const useCompanyContext = () => {
    const CompanyContextValue = useContext(CompanyContext)

    if (!CompanyContextValue) {
        throw new Error("useCompanyContext used outside of the Provider")
    }

    return CompanyContextValue
}

export { CompanyContext, CompanyProvider, useCompanyContext }