const superAdminReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true
            };

        case "SET_LOADING_FALSE":
            return {
                ...state,
                isLoading: false
            };

        case "SET_ALL_COMPANIES_WITH_JOBS":
            return {
                ...state,
                isLoading: false,
                allCompaniesWithTheirJobs: action.payload
            };

        case "SET_ALL_JOBS_OF_SINGLE_COMPANIES":
            return {
                ...state,
                isLoading: false,
                companyJobs: action.payload
            };

        case "SET_DETAILS_OF_SINGLE_JOB":
            return {
                ...state,
                isLoading: false,
                jobDetails: action.payload
            };

        case "SET_APPLICANTS_DATA":
            return {
                ...state,
                isLoading: false,
                applicants: {
                    job: action.payload.job,
                    applicant: action.payload.applicants
                }
            };

        case "SET_SINGLE_APPLICANTS_DATA":
            return {
                ...state,
                isLoading: false,
                applicantProfile: action.payload
            }

        case "SET_INTERVIEWER":
            return {
                ...state,
                isLoading: false,
                interviewers: action.payload
            }

        case "SET_ALL_COMPANIES_WITH_VERIFICATION_STATUS":
            return {
                ...state,
                isLoading: false,
                companies: action.payload
            }

        case "SET_ALL_CANDIDATES_WITH_VERIFICATION_STATUS":
            return {
                ...state,
                isLoading: false,
                candidates: action.payload
            }

        case "SET_ALL_INTERVIEWS_OF_ALL_CANDIDATES":
            return {
                ...state,
                isLoading: false,
                interviewes: action.payload
            }

        default:
            return state;
    }
};

export default superAdminReducer;

