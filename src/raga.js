import React, { Component } from 'react';
import { View, FlatList, TextInput, Button } from 'react-native';
import { firebaseApp } from '../../config/firebase';
import toast from '../../Public/Component/toast';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

class Profile extends Component {
    state = {
        data: [],
        text: '',
    };
    // static navigationOptions = {
    //   headerShown: false,
    // };

    componentDidMount() {
        this.getFriend();
        this.onCountFriend();
    }

    handleInput = text => {
        this.setState({ text });
    };

    onCountFriend = () => {
        let db = firebaseApp.database();
        let myid = this.props.auth.data.uid;
        db.ref(`/users/${myid}/friend`).on('value', function (snapshot) {
            console.log(snapshot.numChildren());
        });
    };

    addFriend = () => {
        try {
            let db = firebaseApp.database();
            let myid = this.props.auth.data.uid;
            db.ref('users')
                .orderByChild('email')
                .equalTo(this.state.text)
                .once('value', res => {
                    if (res.val() != null) {
                        const idFriend = Object.keys(res.val())[0];
                        db.ref(`/users/${myid}/friend`)
                            .child(idFriend)
                            .set({
                                ...res.val()[idFriend],
                            });
                        toast('Friend added');
                    } else {
                        toast('email not found, plase input the correct email');
                    }
                });
        } catch (error) {
            toast('Failed add friend');
        }
    };

    getFriend = () => {
        let db = firebaseApp.database();
        let myid = this.props.auth.data.uid;
        try {
            db.ref(`/users/${myid}/friend`).on('value', res => {
                let data = res.val();
                const objectToArray = data ? Object.values(data) : [];
                this.setState({ data: objectToArray });
            });
        } catch (error) {
            toast('Error get friend');
        }
    };

    handleChat = () => {
        this.props.navigation.navigate('Chat');
    };

    render() {
        return (
            <View>
                <View>
                    <TextInput
                        placeholder="Masukkan email"
                        onChangeText={text => this.handleInput(text)}
                    />
                    <Button
                        title="Hit me"
                        onPress={() => this.addFriend(this.state.text)}
                    />
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <TouchableOpacity onPress={() => this.handleChat()}>
                                    <ListItem
                                        leftAvatar={{
                                            source: require('../../Public/Assets/images/default.png'),
                                        }}
                                        title={item.name}
                                        subtitle={item.email}
                                    />
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = dispatch => ({
    requestAuth: payload =>
        dispatch({
            type: 'POST_LOGIN_FULFILLED',
            payload,
        }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Profile);
