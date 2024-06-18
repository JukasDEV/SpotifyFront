"use client"
// import { QuestionType } from '@/app/app/interview/questions/_components/question';
import React, { createContext, useState, useContext } from 'react';


const UserContext = createContext<any | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<Object>()
    
    return (
        <UserContext.Provider value={{ 
            user, setUser
            }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
