import React, { useContext } from 'react'
import Base from '../../components/Base'
import userContext from '../../context/userContext'

const ProfileInfo = () => {

  const user = useContext(userContext)

  return (
    <Base>
      <div>ProfileInfo</div>
      <h2>Welcome {user.name}</h2>
    </Base>
  )
}

export default ProfileInfo