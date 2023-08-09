import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetails, isLoggedIn } from '../auth'

const Post = ({post={id : -1, title:"This is default post title", content:"This is default post content"}, deletePost}) => {

  const [user, setUser] = useState(null)
  const [login, setLogin] = useState(null)
  
  useEffect(()=>{
    setUser(getCurrentUserDetails())
    setLogin(isLoggedIn)
  }, [])

  return (
    <Card className='border-0 shadow-sm mt-3'>
        <CardBody>
            <h1>{post.title}</h1>
            <CardText dangerouslySetInnerHTML={{__html : post.content.substring(0,70)+"..."}}>
            </CardText>

            <div>
                <Link className='btn btn-secondary border-0' to={'/posts/' + post.id}>Read More..</Link>
           
                {
                  isLoggedIn && (user && user.id === post.user.id ? <Button onClick={()=> deletePost(post)} color='danger' className='ms-2'>Delete</Button> : '')
                }
            </div>

        </CardBody>
    </Card>
  )
}

export default Post