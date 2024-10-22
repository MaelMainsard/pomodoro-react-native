import {Layout, Spinner, Text, useTheme} from '@ui-kitten/components';
import { askAllPermission } from '../hooks/usePermission';
import React, { useEffect } from "react";
import { UserProfile } from '../components/UserProfile';
import { useAuth } from "@/context/AuthContext";
import { HistoricList } from "@/components/HistoricList";
import {TimerWidget} from "@/components/TimerWidget";
import {GoogleButton} from "@/components/GoogleButton";


export default function HomeScreen() {

    const theme = useTheme();
    const { userInfo, isLoading } = useAuth();

    useEffect(() => {
        askAllPermission();
    }, []);


    return (
        <Layout style={{ flex:1, alignItems:"center", backgroundColor: theme['color-primary-50'] }}>
             {isLoading ? (
                 <Spinner style={{ borderColor: theme['color-primary-300'] }} />
             ):userInfo ? (
                 <UserProfile/>
             ) : (
                <GoogleButton/>
             )}
             <TimerWidget/>
             <HistoricList/>
        </Layout>
    );
}