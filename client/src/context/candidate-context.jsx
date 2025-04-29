import { createContext, useContext, useReducer } from "react";
import candidateReducer from "../reducer/candidate-reducer";
import { useAuthContext } from "./auth-context";
import axios from "axios";
import toast from "react-hot-toast";

const CandidateContext = createContext()

const initialState = {
    isLoading: false,
    allJobs: [],
    appliedJobs: [],
    shortlistedJobs: []
}

const CandidateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(candidateReducer, initialState)
    const { server, token, user } = useAuthContext()

    const getAllJobs = async () => {
        dispatch({ type: "SET_LOADING" })
        try {
            const res = await axios.get(`${server}/api/v1/candidate/getAllJobs`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            const { allJobs } = res.data
            dispatch({ type: "SET_ALL_JOBS", payload: { allJobs } })
        } catch (error) {
            console.log(error);
        }
    }

    const appllyJobs = async (jobId) => {
        try {
            const res = await axios.post(`${server}/api/v1/candidate/apply-job`,
                { jobId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res?.data?.message) {
                toast.dismiss()
                toast.success(res.data.message);
            } else {
                toast.dismiss()
                toast.success("Applied successfully!");
            }
        } catch (error) {
            console.error(error);
            const message =
                error?.response?.data?.message || "Failed to apply for job.";
            toast.error(message);
        }
    };

    const getAppliedJobs = async () => {
        dispatch({ type: "SET_LOADING" })
        try {
            const res = await axios.get(`${server}/api/v1/candidate/applied-jobs/${user?.userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { appliedJobs } = res.data
            dispatch({ type: "SET_APPLIED_JOBS", payload: { appliedJobs } })
        } catch (error) {
            console.error(error);
            const message =
                error?.response?.data?.message || "Failed to fetch applied jobs.";
            toast.dismiss()
            toast.error(message);
        }
    };

    const withdrawJobApplication = async (jobId) => {
        try {
            const res = await axios.delete(`${server}/api/v1/candidate/withdraw-job/${jobId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.dismiss()
            toast.success(res.data.message || "Withdrawn successfully.");
            await getAppliedJobs();

        } catch (error) {
            console.error(error);
            const message =
                error?.response?.data?.message || "Failed to withdraw application.";
            toast.dismiss()
            toast.error(message);
        }
    };

    return (
        <CandidateContext.Provider value={{
            ...state,
            getAllJobs,
            appllyJobs,
            getAppliedJobs,
            withdrawJobApplication
        }}>
            {children}
        </CandidateContext.Provider>
    )
}

const useCandidateContext = () => {
    const CandidateContextValue = useContext(CandidateContext)

    if (!CandidateContextValue) {
        throw new Error("useCandidateContext used outside of the Provider")
    }

    return CandidateContextValue
}

export { CandidateContext, CandidateProvider, useCandidateContext }