import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import {storage,db} from './firebase'
import firebase from "firebase";
import './ImageUpload.css'

function ImageUpload({username}) {
    const [caption,setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [image , setImage]= useState(null);

   const handleChange = (e) => {
      
      if(e.target.files[0])
        {
          setImage(e.target.files[0]);
      }

   }

    const handleUpload = () =>{
        const uploadTast = storage.ref(`images/${image.name}`).put(image);
  
        uploadTast.on(
           "state_changed",
           (snapshot) => {
//progressfunction
            const progress = Math.round(
                (snapshot.bytesTransferred/ snapshot.totalBytes) * 100

            );
            setProgress(progress);

           },
           (error) => {
               console.log(error);
               alert(error.message)
           } ,
           ()=> {
             
              storage
               .ref("images")
               .child(image.name)
               .getDownloadURL()
               .then(url => {
                   //post image inside DB
                  
                 db.collection("posts").add({
                     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                     caption:caption,
                     imageUrl: url,
                     username:username
                 });
                 setProgress(0)
                 setCaption('')
                 setImage(null);

               })


           }  
              

         ) 

    }


    return (
        <div className="imagupload">
      {/* I want to have a Post uploader */}
            {/* Caption Input */}
            {/* File Picker */}
            {/* Post button */}
            <progress className="imageprogress" value={progress} max="100" />
           <input type ="text" placeholder='Enter a caption... ' onChange={event => setCaption(event.target.value)}/>
            <input type="file" onChange={handleChange} />
            <Button  onClick={handleUpload} >
            Upload </Button> 
                          

            
        </div>
    )
}

export default ImageUpload
