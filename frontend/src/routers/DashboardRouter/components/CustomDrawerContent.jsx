import { View } from 'react-native'
import React from 'react'
import LogOutButton from './LogOutButton'
import DashboardProfile from './DashboardProfile'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import LoginButton from './LoginButton'

const CustomDrawerContent = ({authContext, ...props}) => {
    return (
        <View style={{ flex: 1, marginTop: 40 }}>
            <DashboardProfile />
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ paddingTop: 0 }}
            >
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            {!!authContext.authToken ? <LogOutButton /> : <LoginButton />}
        </View>
    )
}

export default CustomDrawerContent
