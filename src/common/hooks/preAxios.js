import axios from "axios";
import { apiBaseURL, developmentBaseURL } from "./apiBaseURL";


export const connectSpring = axios.create({    
    baseURL: process.env.NODE_ENV === 'production' ? apiBaseURL : developmentBaseURL,
    // baseURL: apiBaseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

