import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Post from "./Post"
import './App.css';
import { db } from './firebase';
import Button from '@material-ui/core/Button';
import { auth } from './firebase';
import ImageUpload from './ImageUpload.js'
import InstagramEmbed from 'react-instagram-embed';

// useEffect runs a code based on a specific condition



function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}



const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {

 const [posts, setPosts] = useState([]) ;
 const [open, setOpen] = useState(false);
 const [username,setusername] = useState('');
 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');
 const [user, setUser] = useState(null);
 const [openSignIn,setOpenSignIn] = useState(false)



  const [modalStyle] = useState(getModalStyle);
 const classes = useStyles();


useEffect(()=>{
auth.onAuthStateChanged((authUser) => {

  if(authUser) {
   
   //user has logged in..

   console.log(authUser);
   setUser(authUser);

  

  } else {

   //user has logged out..
    
    setUser(null);

  }
}) 


}, [user, username]);


 useEffect(() => {
 db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
   setPosts(snapshot.docs.map(doc => ({post:doc.data(),
                                       id:doc.id  })));
 })
 },[])

 const signup = (event)=>{
   event.preventDefault();

   auth
   .createUserWithEmailAndPassword(email, password)
   .then((authUser) => {
     return authUser.user.updateProfile({
       displayName: username
     })
   })
   .catch((error) => alert(error.message));

   setOpen(false);
   
 };

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false)
  }

  return (
    <div className="App">
    

      <Modal


        open={open}
        onClose={(open) => setOpen(false)}

      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__form">
            <center id="center">
              <img
                className="app_headerImage "
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" />

              <input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}

              />



              <input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

              />

              <input
                placeholder="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

              />
              <Button type="sumbit" onClick={signup}>Sign-up</Button>
            </center>
          </form>
        </div>
      </Modal>




    <Modal
        open={openSignIn}
        onClose={(open) => setOpenSignIn(false)}
       
      >
      <div style={modalStyle} className={classes.paper}>
      <form className="app__form">
      <center id="center">
      <img 
          className="app_headerImage "
                src="
https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" />
          
      
      
       <input  
        placeholder="email"
        type="text"
       
        onChange={(e) => setEmail(e.target.value)}
       
        />

         <input  
        placeholder="password"
        type="text"
        
        onChange={(e) => setPassword(e.target.value)}
       
        />
        <Button type="sumbit" onClick={signIn}>Sign-In</Button>
        </center>
        </form>
        </div>
      </Modal>


     



     <div className="app_header">
     <img 
          className="app_headerImage "
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"/>

        {user ? (<Button onClick={() => auth.signOut()}>Logout</Button>) :
          (<div className="app_logincontainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign-In</Button>
            <Button onClick={() => setOpen(true)}>Sign-up</Button>

          </div>)}


    
      </div> 
      <div className="postMain">

      <div className="postLeft">

{
        posts.map(({post,id}) => <Post key={id} postid={id} user={user} username={post.username} caption = {post.caption} imageUrl = {post.imageUrl} /> )
}

</div>
<div className="postRight">
<InstagramEmbed
  url='https://www.instagram.com/p/B9UxIHjJnFu/'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  protocol=''
  injectScript
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/>
</div>

</div>
      
    
      {user?.displayName ? (<ImageUpload username={user.displayName} />) :
        (<h3> You need to login </h3>)}
    



    </div>
  );
}

export default App;
