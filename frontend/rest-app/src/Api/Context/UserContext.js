import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext('');

export const UserProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("Token") ? localStorage.getItem("Token") : '');
    useEffect(() => {
        const fetchUser = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            };
            const response = await fetch("/api/users/me", requestOptions);

            if (!response.ok) {
                setToken(
                    ''
                );
            }
            localStorage.setItem("Token", token);
        };
        fetchUser();
    }, [token]);

    return (
        <UserContext.Provider value={[token,setToken]}>
            {props.children}
        </UserContext.Provider>
    );
};