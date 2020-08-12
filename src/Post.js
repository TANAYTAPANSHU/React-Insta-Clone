import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import "./Post.css"
import Avatar from '@material-ui/core/Avatar';
import tanay from './dev.png'
import I1 from './I1.png'

function Post(prop) {
  
    let [comments, setcomments] = useState([]);
    let [comment, setcomment] = useState([]);

    useEffect(() => {
        let unsubscribe;
        if(prop.postid){
       unsubscribe= db.collection('posts').doc(prop.postid).collection('comments').onSnapshot(snapshot => {
            setcomments(snapshot.docs.map(doc => doc.data()
    
            ));
        })
    }

  
    return()=>{ unsubscribe()};
    }, [prop.postid])

    let postcomment = (event) => {
       event.preventDefault();
       db.collection('posts').doc(prop.postid).collection('comments').add({
           text:comment,
           username:prop.user.displayName 
       });
       setcomment('')


    }

    return (
        <div className="post">
        <div className="post__header">
            <Avatar className="post__avatar"  alt="Tanay Tapanshu" src={tanay} />
    <h3>{prop.username}</h3>
       {/*header -> avtar + username */}
            </div>

            <img className="post__image img-fluid"  src={prop.imageUrl}/> 
          {/* image */}
          <h4 className="post__text"><strong>{prop.username}</strong> {prop.caption}</h4>



          
            <div className="post__comments">
            {
               comments.map((comment) => (
                   <p>
                    <b>{comment.username}</b> 
                       {comment.text}
                   </p>


               ))

            }
            </div>  



          
         
       <form>
           <input 
              className="post__input"
              type="text"
              placeholder="Add comment"
              onChange={(e)=> setcomment(e.target.value)}


           />

                <button
                    className="post__button"
                    type="text"
                     
                    onClick={postcomment}


                >Post</button>




       </form>

          {/* username + caption */}
        </div>
    )
}

export default Post
