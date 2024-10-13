import React, { createContext, useContext } from 'react';
import { useTimerLogic, TimerPhase, UseTimerLogicType } from '../hooks/useTimerLogic';

const TimerContext = createContext<UseTimerLogicType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
    const timerLogic = useTimerLogic();

    return (
        <TimerContext.Provider value={timerLogic}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error('useTimer must be used within a TimerProvider');
    }
    return context;
};

export { TimerPhase };
