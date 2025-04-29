const candidateReducer = (state, action) => {
    switch (action.type) {

        case "SET_LOADING":
            return {
                ...state,
                isLoading: true
            }

        case "SET_ALL_JOBS":
            return {
                ...state,
                isLoading: false,
                allJobs: action.payload.allJobs || []
            }

        case "SET_APPLIED_JOBS":
            return {
                ...state,
                isLoading: false,
                appliedJobs: action.payload.appliedJobs || []
            }

        default:
            return state
    }
}

export default candidateReducer