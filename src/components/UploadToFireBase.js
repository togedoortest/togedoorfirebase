import React, { useState } from "react";
// import { render } from "react-dom";
import { storage } from "./firebase/firebase";



export default function UploadToFireBase() {
 




  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
            // console.log(url)
          });
      }
 
 
   );
  



    };
    //###################################################
  const handledownload = () => {console.log('my handle download')
  const downloadTask = storage.ref();
  downloadTask.child('images/').listAll().then(function(result){
    result.items.forEach(function(imagefef){
      console.log(imagefef.toString())
    })
  })}
  // console.log("image: ", image);
//##############################################
  return (
    <div>
      <progress value={progress} max="100" />
      <br />
      <br />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      {/* <button onClick={()=>{handledownload()}}>download</button> */}
      <br />
      {url}
      <br />
      {/* <img src={url || "http://via.placeholder.com/300"} alt="firebase-image" /> */}
    </div>
  );

}