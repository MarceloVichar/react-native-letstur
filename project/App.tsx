import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {createTheme, ThemeProvider} from "@rneui/themed";

const theme = createTheme({
    lightColors: {
        primary: '#33C8B6',
    },
    darkColors: {
        primary: '#000',
    },
    mode: 'light',
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <View style={styles.container}>
                <Text>Open up App.tsx to start working on your app!</Text>
                <StatusBar style="auto"/>
            </View>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
