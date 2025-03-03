import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the context with a default value
const UserDetailContext = createContext({
  userDetail: null,
  setUserDetail: () => {}
});

const UserDetailProvider = ({ children }) => {
    const [userDetail, setUserDetail] = useState(null);
    
    // Load saved user data on startup
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const savedUser = await AsyncStorage.getItem('userDetail');
                if (savedUser) {
                    console.log("Loaded user data from storage");
                    setUserDetail(JSON.parse(savedUser));
                }
            } catch (e) {
                console.error("Error loading user data:", e);
            }
        };
        
        loadUserData();
    }, []);
    
    // Create a wrapper for setUserDetail that also saves to AsyncStorage
    const handleSetUserDetail = (userData) => {
        console.log("Setting user detail:", userData);
        setUserDetail(userData);
        
        // Save to AsyncStorage
        if (userData) {
            AsyncStorage.setItem('userDetail', JSON.stringify(userData))
                .catch(e => console.error("Error saving user data:", e));
        } else {
            AsyncStorage.removeItem('userDetail')
                .catch(e => console.error("Error removing user data:", e));
        }
    };
    
    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail: handleSetUserDetail }}>
            {children}
        </UserDetailContext.Provider>
    );
};

export { UserDetailContext, UserDetailProvider };