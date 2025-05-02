import { createContext, useContext, useReducer } from "react";
import superAdminReducer from "../reducer/superadmin-reducer";
import axios from "axios";
import { useAuthContext } from "./auth-context";
import toast from "react-hot-toast";

const SuperAdmminContext = createContext()

const initialState = {
    isLoading: false,
    companies: [],
    allCompaniesWithTheirJobs: [],
    companieProfile: [],
    companyJobs: [],
    jobDetails: {},
    applicants: {
        job: {},
        applicant: []
    },
    applicantProfile: {}
}

const SuperAdminProvider = ({ children }) => {

    const [state, dispatch] = useReducer(superAdminReducer, initialState)
    const { server } = useAuthContext()

    const token = localStorage.getItem("token")

    const getAllCompanies = async () => {
        dispatch({ type: "SET_LOADING" });

        try {
            const response = await axios.get(`${server}/api/v1/superadmin/get-all-companies`,
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                });

            const { companiesWithJobs } = response.data;

            dispatch({ type: "SET_ALL_COMPANIES", payload: companiesWithJobs });
        } catch (error) {
            console.error("Error fetching companies:", error);

            dispatch({ type: "SET_LOADING_FALSE" });

            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.dismiss();
            toast.error(errorMessage);
        }
    };

    const getAllJobOfSingleCompany = async (id) => {
        dispatch({ type: "SET_LOADING" });

        try {
            const response = await axios.get(`${server}/api/v1/superadmin/get-companies-all-jobs/${id}`,
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                });

            const { jobs } = response.data;
            dispatch({ type: "SET_ALL_JOBS_OF_SINGLE_COMPANIES", payload: jobs });
        } catch (error) {
            console.error("Error fetching companies:", error);

            dispatch({ type: "SET_LOADING_FALSE" });

            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.dismiss();
            toast.error(errorMessage);
        }
    }

    const getDetailsOfSingleJob = async (jobId) => {
        dispatch({ type: "SET_LOADING" });

        try {
            const response = await axios.get(`${server}/api/v1/superadmin/getJobDetails/${jobId}`,
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                });

            const { jobDetail } = response.data;
            dispatch({ type: "SET_DETAILS_OF_SINGLE_JOB", payload: jobDetail });
        } catch (error) {
            console.error("Error fetching companies:", error);
            dispatch({ type: "SET_LOADING_FALSE" });
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.dismiss();
            toast.error(errorMessage);
        }
    }

    const handleChangeStatus = async (status, jobId) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await axios.post(`${server}/api/v1/superadmin/changeJobStatus/${jobId}`,
                { status },
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                });

            const { message } = response.data;
            toast.dismiss();
            toast.success(message)

            dispatch({ type: "SET_LOADING_FALSE" });
        } catch (error) {
            console.error("Error fetching companies:", error);

            dispatch({ type: "SET_LOADING_FALSE" });

            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.dismiss();
            toast.error(errorMessage);
        }
    }

    const handleViewApplicants = async () => { }

    const handleMarkAsFlag = async (jobId) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await axios.patch(`${server}/api/v1/superadmin/mark-as-flagged/${jobId}`,
                {},
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                });

            const { message } = response.data;
            toast.dismiss();
            toast.success(message)

            dispatch({ type: "SET_LOADING_FALSE" });
        } catch (error) {
            console.error("Error fetching companies:", error);

            dispatch({ type: "SET_LOADING_FALSE" });

            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.dismiss();
            toast.error(errorMessage);
        }
    }

    const handleMarkAsUnFlag = async (jobId) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await axios.patch(`${server}/api/v1/superadmin/remove-as-flagged/${jobId}`,
                {},
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                });

            const { message } = response.data;
            toast.dismiss();
            toast.success(message)

            dispatch({ type: "SET_LOADING_FALSE" });
        } catch (error) {
            console.error("Error fetching companies:", error);
            dispatch({ type: "SET_LOADING_FALSE" });
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.dismiss();
            toast.error(errorMessage);
        }
    }

    const handleConfirmDeleteJob = async (jobId) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await axios.delete(`${server}/api/v1/superadmin/deleteJob/${jobId}`,
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                });
            // getAllCompanies()

            const { message } = response.data;
            toast.dismiss();
            toast.success(message)
            dispatch({ type: "SET_LOADING_FALSE" });
        } catch (error) {
            console.error("Error fetching companies:", error);
            dispatch({ type: "SET_LOADING_FALSE" });
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.dismiss();
            toast.error(errorMessage);
        }
    }

    const handleApplicants = async (jobId) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await axios.get(`${server}/api/v1/superadmin/getAllApplicants/${jobId}`,
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                });

            const { job, applicants } = response.data;

            dispatch({ type: "SET_APPLICANTS_DATA", payload: { job, applicants } });
        } catch (error) {
            console.error("Error fetching companies:", error);
            dispatch({ type: "SET_LOADING_FALSE" });
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.dismiss();
            toast.error(errorMessage);
        }
    }

    const getApplicantsProfile = async (id) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const response = await axios.get(`${server}/api/v1/superadmin/getSingleApplicants/${id}`,
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                });

            const { applicantProfile } = response.data;

            dispatch({ type: "SET_SINGLE_APPLICANTS_DATA", payload: applicantProfile });
        } catch (error) {
            console.error("Error fetching companies:", error);
            dispatch({ type: "SET_LOADING_FALSE" });
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.dismiss();
            toast.error(errorMessage);
        }
    }

    return (
        <SuperAdmminContext.Provider value={{
            ...state,
            getAllCompanies,
            getAllJobOfSingleCompany,
            getDetailsOfSingleJob,
            handleChangeStatus,
            handleViewApplicants,
            handleMarkAsFlag,
            handleMarkAsUnFlag,
            handleConfirmDeleteJob,
            handleApplicants,
            getApplicantsProfile
        }}>
            {children}
        </SuperAdmminContext.Provider>
    )
}

const useSuperAdminContext = () => {
    const SuperAdmminContextValue = useContext(SuperAdmminContext)

    if (!SuperAdmminContextValue) {
        throw new Error("useSuperAdminContext used outside of the Provider")
    }

    return SuperAdmminContextValue
}

export { SuperAdmminContext, SuperAdminProvider, useSuperAdminContext }