import React from 'react';
import { ExpoLinksView } from '@expo/samples';
import {
        Button,
        StyleSheet,
        View,
} from 'react-native';

class SignInScreen extends React.Component {
        render() {
                return (
                        <View>
                                <Button title="Sign in!" onPress={this._signInAsync} />
                        </View>
                );
        }

        _signInAsync = async () => {
                // await AsyncStorage.setItem('userToken', 'abc');
                // this.props.navigation.navigate('App');
                console.log("eyy");
        };
}
SignInScreen.navigationOptions = {
        title: 'Please sign in',
};

const styles = StyleSheet.create({
        container: {
                flex: 1,
                paddingTop: 15,
                backgroundColor: '#fff',
        },
});

export default SignInScreen;