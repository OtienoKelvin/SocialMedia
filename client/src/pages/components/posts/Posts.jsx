import Post from '../post/post'
import './posts.scss'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import instance from '../../../axios'

const Posts = ({userId}) => {
  console.log(userId)

    const {isLoading, error, data} = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await instance.get(userId ? `posts?userId=${userId}` :"/posts")
            return res.data
        }
    })

    // temp dummy data

  return (
    <div className='posts'>
        {error ? "Something went wrong" : isLoading ? "Loading..." : data?.map(post => (
           <Post post={post} key={post.id} /> 
           
        ))}
      
    </div>
  )
}

export default Posts
