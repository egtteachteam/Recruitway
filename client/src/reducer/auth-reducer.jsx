const authReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_TOKEN":
            return {
                ...state,
                isAuthenticated: !!action.payload.token,
                token: action.payload.token,
            }

        case "AUTH_LOADING":
            return {
                ...state,
                loading: true,
            }

        case "REGISTER":
            return {
                ...state,
                loading: false,
                error: null,
            };

        case "REGISTER_ERROR":
            return {
                ...state,
                token: null,
                loading: false,
                error: action.payload,
            }

        case "LOGIN":
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                loading: false,
                error: null,
            }

        case "UPDATE_PROFILE":
            return {
                ...state,
                loading: false,
                error: null,
            }

        case "LOGIN_ERROR":
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                loading: false,
                error: action.payload.error,
            }

        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null,
            }

        case "LOAD_USER_DATA":
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.data,
                token: action.payload.token,
            }

        case "LOAD_SUPER_ADMIN":
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                superAdmin: action.payload.data
            }

        case "ADDRESS_LOADING":
            return {
                ...state,
                addressLoading: true,
                error: null,
            }

        case "ALL_ADDRESS":
            return {
                ...state,
                addressLoading: false,
                address: action.payload.data.data,
                error: null,
            }

        case "SINGLE_ADDRESS_SUCCESS":
            return {
                ...state,
                addressLoading: false,
                singleAddress: action.payload.data,
                error: null,
            }

        case "ADDRESS_ERROR":
            return {
                ...state,
                addressLoading: false,
            }

        case "ORDER_LOADING":
            return {
                ...state,
                order: action.payload.data,
            }

        default:
            return state
    }

}

export default authReducer;