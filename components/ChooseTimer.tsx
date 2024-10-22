import React from "react";
import {View} from "react-native";
import {useTimer} from "@/context/TimerContext";
import {Layout, Text, useTheme, Button} from "@ui-kitten/components";

export function ChooseTimer()  {

    const theme = useTheme();
    const { startTimer } = useTimer();

    return (
        <Layout style={{flex:1 ,justifyContent: "center", alignItems: "center", paddingVertical: 20, backgroundColor: theme['color-primary-50']}}>
            <Text style={{marginBottom: 100, color: theme['color-basic-50'], fontSize: 25}}>Sélectionnez un rythme de travail</Text>
            <View style={{width: "90%",justifyContent: "space-around", height: 280}}>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-around", marginBottom: 20}}>
                    <Text style={{color: theme['color-basic-50'], fontSize: 25}}>Travail</Text>
                    <Text style={{color: theme['color-basic-50'], fontSize: 25}}>Pause</Text>
                </View>
                <Button style={{backgroundColor: theme['color-primary-300'], borderColor: theme['color-primary-300'], borderRadius: 10}} size="large" onPress={()=>startTimer(45,15)}>
                    45 min / 15 min
                </Button>
                <Button style={{backgroundColor: theme['color-primary-300'], borderColor: theme['color-primary-300'], borderRadius: 10}} size="large" onPress={()=>startTimer(25,5)}>
                    25 min / 5 min
                </Button>
                <Button style={{backgroundColor: theme['color-primary-300'], borderColor: theme['color-primary-300'], borderRadius: 10}} size="large" onPress={()=>startTimer(1,1)}>
                    1 min / 1 min
                </Button>
            </View>
        </Layout>
    );
}