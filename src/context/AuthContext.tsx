import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
    name: string;
    email: string;
    phone: string;
    password?: string;
}

export interface Order {
    id: string;
    date: string;
    items: {
        productName: string;
        size: string;
        price: number;
        quantity: number;
    }[];
    total: number;
    status: 'confirmed' | 'delivered';
}

interface AuthContextType {
    user: User | null;
    orderHistory: Order[];
    login: (user: User) => void;
    signup: (user: User) => void;
    logout: () => void;
    addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [orderHistory, setOrderHistory] = useState<Order[]>([]);

    useEffect(() => {
        const savedUser = localStorage.getItem('doza_user');
        const savedOrders = localStorage.getItem('doza_orders');
        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedOrders) setOrderHistory(JSON.parse(savedOrders));
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('doza_user', JSON.stringify(userData));
    };

    const signup = (userData: User) => {
        setUser(userData);
        localStorage.setItem('doza_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('doza_user');
    };

    const addOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
        const newOrder: Order = {
            ...orderData,
            id: `DOZA-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
            status: 'confirmed'
        };
        const updatedHistory = [newOrder, ...orderHistory];
        setOrderHistory(updatedHistory);
        localStorage.setItem('doza_orders', JSON.stringify(updatedHistory));
        return newOrder.id;
    };

    return (
        <AuthContext.Provider value={{ user, orderHistory, login, signup, logout, addOrder }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
