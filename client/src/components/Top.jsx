import React from 'react'
import { useContext } from 'react'
import { GlobalState } from '../Context/GlobalState'

export const Top = () => {
    const { userInfo: [userInfo] } = useContext(GlobalState)

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{userInfo.firstName} {userInfo.lastName}</h1>
        </div>
    )
}
