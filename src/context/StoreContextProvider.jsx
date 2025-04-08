import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // const URL = 'http://localhost:4000';
    const URL = import.meta.env.VITE_API_BASE_URL;
    console.log(URL);
    const [userType, setUserType] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [roll, setRoll] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            if (token) {
                await getUserProfile();
            }
        };
        loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]); 

    const getUserProfile = async () => {
        try {
            const response = await axios.get(`${URL}/api/user/profile`, {
                headers: { Authorization: `Bearer ${token}` } 
            });
        
            if (response.data.success) {
                setRoll(response.data.user.role);
            }
            else{
                toast.error(response.data.error);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    const contextValues = {
        URL,
        userType,
        setUserType,
        token,
        setToken,
        roll
    };

    return (
        <StoreContext.Provider value={contextValues}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
