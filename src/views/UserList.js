import React, { useContext } from 'react'
import { Button, Icon } from '@rneui/base'
import { View, FlatList, Alert } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import UsersContext from '../context/UsersContext'

export default props => {

    const { state, dispatch } = useContext(UsersContext)

    const editUser = (user) => props.navigation.navigate('UserForm', user)
 
    const deleteUser = user => {
      Alert.alert('Excluir Usúario', 'Deseja excluir o usúario', [{
        text: 'Sim',
        onPress: () => {
            dispatch({
                type: 'deleteUser',
                payload: user,
            })
        }
      }, {
        text: 'Não'
      }])
    }

    function getUserItem({ item: user }) {
        return (
            <ListItem key={user.id} 
            bottomDivider
            onPress={() => props.navigation.navigate('UserForm')}
            >
                <Avatar source={{ uri: user.avatarUrl }}/>
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <View style={{ flexDirection: 'row'}}>
                    <Button type='clear'
                     onPress={() => editUser(user)} 
                     icon={
                        <Icon name='edit' size={25} color='orange'/>
                        } />
                    <Button type='clear' onPress={() => deleteUser(user)} 
                        icon={
                         <Icon name='delete' size={25} color='red'/>
                        } />
                </View>
             </ListItem>
        )
    }


    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}