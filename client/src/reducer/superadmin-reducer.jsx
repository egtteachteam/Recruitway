// const superAdminReducer = (state, action) => {

//     switch (action.type) {

//         case "SET_LOADING":
//             return {
//                 ...state,
//                 isLoading: true,
//             }

//         case "SET_ALL_COMPANIES":
//             return {
//                 ...state,
//                 isLoading: false,
//                 companieProfile: action.payload.companieProfile,
//                 companyJobs: action.payload.companyJobs
//             }

//         default:
//             return state
//     }
// }

// export default superAdminReducer



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

        case "SET_ALL_COMPANIES":
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

        default:
            return state;
    }
};

export default superAdminReducer;

