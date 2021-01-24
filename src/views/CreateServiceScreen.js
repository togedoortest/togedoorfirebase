import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../css/createService.css";
import Header from "../components/headers/Header";
import { storage } from "../components/firebase/firebase";

import store from "../store";
const CreateServiceScreen = ({history}) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('');
  const [formData2, setformData2] = useState('')
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [flag, setflag] = useState(true)
//firebase 
  const [image, setImage] = useState(null);
  const [ImageName, setImageName] = useState(null);
 
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
// end firebase
  const { form, handleSubmit, errors } = useForm();
  const user = store.getState();

  const [categoryName, handleCategoryName] = useState("");
  const [service, setService] = useState({


    
//  ########################################################  عماد هون غيرت

    name: "",
    description: "",
    rating: 0,
    price: "",
    serviceImage: null,
    //serviceImage: "",
  //subCategory: "",
    subCategoryID:"5ff7504511a4834b00d3429e",
   // subCategoryID:subCategories
    //_id:"init"
  });


//firebase functions
//#####################################################
function handleChange (e)  {
  setFile(e.target.files[0]);
  setFilename(e.target.files[0].name);
  if (e.target.files[0]) {
    setImage(e.target.files[0]);
    setImageName(Date.now()+e.target.files[0].name);
   
  }
};
console.log('date'+ Date.now());
 
// function handleUpload ()  {
//   const uploadTask = storage.ref(`images/${image.name}`).put(image);
//   uploadTask.on(
//     "state_changed",
//     snapshot => {
//       const progress = Math.round(
//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//       );
//       setProgress(progress);
//     },
//     error => {
//       console.log(error);
//     },
//     () => {
//       storage
//         .ref("images")
//         .child(image.name)
//         .getDownloadURL()
//         .then(url => {
//          // setUrl(url);
//           // console.log(url)
//           // if(url){return (url)}
          
//         });
//     }
//  );};
//#####################################################
// end firebase functions

//https://togedoorfirebase.herokuapp.com/

//  ########################################################  لحد هون 
///console.log("aaaa");
// try {
//   //console.log(subCategories[0]._id); 
  
// } catch (error) {
//   ///console.log(error);
// }


/// my submit //////// aaaa
//const onSubmitFile =()=>{
  const onChangefile = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    //console.log(e.target.file[0]);
   // setformData2(formData)
  };
  
  
  const onSubmitFile = async e => {
    e.preventDefault();

    // console.log('firbase url'); 
    // console.log(url); 
  

    if(image){
    handleUpload ()
  }else{

    const formData1 = new FormData();
    // formData.append('file', file);
 // formData.append("document", service);
 formData1.append("url",JSON.stringify(url));
 formData1.append("document",JSON.stringify(service));
 formData1.append("user",JSON.stringify(user));
 
   // console.log('form data');
  //  console.log(formData);
   // try {
    //,'Authorization':'ddddd'
   // var headers = {
      //'Content-Type': 'multipart/form-data',
     // 'Authorization': `rrrrrr`
   // }
    var config1 = {
      headers: { 
       'Content-Type': 'multipart/form-data'
      ,
       'Authorization':user.auth.token
        }}


        // firebase upload 

//         <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "AIzaSyBVaQ9uzWLKJNMaFdqwLi7TwFt0a5e9Bnc",
//     authDomain: "togedoor-cef55.firebaseapp.com",
//     projectId: "togedoor-cef55",
//     storageBucket: "togedoor-cef55.appspot.com",
//     messagingSenderId: "122813550209",
//     appId: "1:122813550209:web:fe1a8b4dfa9d488e6d0780",
//     measurementId: "G-SG5MPRHHMM"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>
//https://togedoorfirebase.herokuapp.com/
//https://togedoorfirebase.herokuapp.com/

        // end firebase upload
    // axios.post('https://togedoorfirebase.herokuapp.com/services/uploadfile',formData, {headers: { 'Content-Type': 'multipart/form-data'} }) 
  axios.post('https://togedoorfirebase.herokuapp.com/services/uploadfile',formData1,config1) 
 
     
       .then((response) => {
          console.log(response);
         
          history.push('/')
        })
        .catch((error) => {
          console.log(error);
        })


  }//end else
  
    function handleUpload ()  {
      // ${Date.now()}
     
      //  const uploadTask = storage.ref(`images/${image.name}`).put(image);
      const uploadTask = storage.ref(`images/${ImageName}`).put(image);
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
             // .child(image.name)
         .child(ImageName)
     

              .getDownloadURL()
              .then(url => {
               // setUrl(url);
                // console.log(url)
                // if(url){return (url)}
                ///########################


                const formData = new FormData();
                // formData.append('file', file);
             // formData.append("document", service);
             formData.append("url",JSON.stringify(url));
             formData.append("document",JSON.stringify(service));
             formData.append("user",JSON.stringify(user));
             
               // console.log('form data');
              //  console.log(formData);
               // try {
                //,'Authorization':'ddddd'
               // var headers = {
                  //'Content-Type': 'multipart/form-data',
                 // 'Authorization': `rrrrrr`
               // }
                var config1 = {
                  headers: { 
                   'Content-Type': 'multipart/form-data'
                  ,
                   'Authorization':user.auth.token
                    }}
            
            
                    // firebase upload 
            
            //         <!-- The core Firebase JS SDK is always required and must be listed first -->
            // <script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js"></script>
            
            // <!-- TODO: Add SDKs for Firebase products that you want to use
            //      https://firebase.google.com/docs/web/setup#available-libraries -->
            // <script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-analytics.js"></script>
            
            // <script>
            //   // Your web app's Firebase configuration
            //   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
            //   var firebaseConfig = {
            //     apiKey: "AIzaSyBVaQ9uzWLKJNMaFdqwLi7TwFt0a5e9Bnc",
            //     authDomain: "togedoor-cef55.firebaseapp.com",
            //     projectId: "togedoor-cef55",
            //     storageBucket: "togedoor-cef55.appspot.com",
            //     messagingSenderId: "122813550209",
            //     appId: "1:122813550209:web:fe1a8b4dfa9d488e6d0780",
            //     measurementId: "G-SG5MPRHHMM"
            //   };
            //   // Initialize Firebase
            //   firebase.initializeApp(firebaseConfig);
            //   firebase.analytics();
            // </script>
            
            
            
                    // end firebase upload
                // axios.post('https://togedoorfirebase.herokuapp.com/services/uploadfile',formData, {headers: { 'Content-Type': 'multipart/form-data'} }) 
              axios.post('https://togedoorfirebase.herokuapp.com/services/uploadfile',formData,config1) 
             
                 
                   .then((response) => {
                      console.log(response);
                     
                      history.push('/')
                    })
                    .catch((error) => {
                      console.log(error);
                    })
          
          
          



                ///########################


       

              });
          }

          );
          
          ///fire  
      };


  //  handleUpload()
  // const resfirebase= await handleUpload()
  // if(url){  
   
      // }
      }

       

      //  },
        //onUploadProgress: progressEvent => {
         // setUploadPercentage(
         //   parseInt(
//Math.round((progressEvent.loaded * 100) / progressEvent.total)
           // )
//);

          // Clear percentage
       //   setTimeout(() => setUploadPercentage(0), 10000);
      //  }
     // });

     // const { fileName, filePath } = res.data;

    //  setUploadedFile({ fileName, filePath });

     // setMessage('File Uploaded');
  //  } catch (err) {
  //    if (err.response.status === 500) {
   //     setMessage('There was a problem with the server');
   //   } else {
   //     setMessage(err.response.data.msg);
//}
  //  }
 // };




//}
///// end my submit /////////

  const onSubmit = (e) => {
   //const onSubmit = async e => {
    // e.preventDefault();

     
    const formDataT = new FormData();
    formDataT.append('serviceImage', file);
   // console.log('form data');
  



  
        axios.post("https://togedoorfirebase.herokuapp.com/services/create", service)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (e) => {
    e.persist();
    setService({ ...service, [e.target.name]: e.target.value });//////////////////////////////
  //  console.log("sub ca");
 //   console.log(service);
  };
  
  const onFileChange = (e) => {
  
///////////////////////////////////////////////////////////////////////////////////////
const file = e.target.files[0];
//setFile(file)
setFile(file)
  //  setService({ ...service, serviceImage: file });
  };

  const onChange2 = (e) => {
    e.persist();
    handleCategoryName(e.target.value);
   // setService({ ...service, [e.target.name]: e.target.value });
  //  console.log("handel");
  ///  console.log(e.target.value);
    ///////////////////////////////////////////////////////////////////////////
  };


  var config2 = {
    headers: { 
    //  'Content-Type': 'multipart/form-data'
    // ,
     'Authorization':user.auth.token
      }}
  // useEffect(() => {
    
  //   async function fetchData() {
  //     const response = await axios.get("https://togedoorfirebase.herokuapp.com/categories",config2);
  //     setCategories(response.data);
  //   }


  //   fetchData();
  // }, []);
  useEffect(() => {
   // console.log(' useEffect 1');
    var tempoC=''
    axios.get("https://togedoorfirebase.herokuapp.com/categories",config2).then((response)=>{
      tempoC=response.data
      setCategories(tempoC);
      return (axios.get(`https://togedoorfirebase.herokuapp.com/categories/name/Agriculture & Natural Resources`)).then((res)=>{
        setSubCategories(res.data.subcategories);
        console.log(' useEffect 2');
      })

    });

  },[])


  useEffect(() => {

    async function fetchData() {
     // console.log(' useEffect 3');
      const response = await axios.get(
        `https://togedoorfirebase.herokuapp.com/categories/name/${categoryName
          .split(" ")
          .join("-")}`
      );
     // console.log("my response :", response.data.subcategories);
      setSubCategories(response.data.subcategories);
    
  }

    fetchData();
  }, [categoryName]);

// useEffect(() => {
//   //console.log('sub cttttt1');
//   return () => {
//     console.log('sub cttttt22');
//   }
// }, [categoryName])

  return (
    <div>
     {/* <button className='btn btn-primary' onClick={() => { history.push('/')}}>re dir</button> */}
      <Header />
      <Container
        className="service_register"
        style={{ border: "0.5px solid #cccccc" }}
      >
        <Row>
          <Col>
            <Form onSubmit={handleSubmit(onSubmit),onSubmitFile}>
              <Form.Group className="service_title">
                <Form.Label>POST YOUR GIG</Form.Label>
              </Form.Group>

              <Form.Group as={Row} className="service_form">
                <Form.Label column sm={4}>
                  NAME:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    name="name"
                    autoComplete="off"
                    value={service.name}
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="service_form">
                <Form.Label column sm={4}>
                  DESCRIPTION:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    as="textarea"
                    autoComplete="off"
                    name="description"
                    value={service.description}
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="service_form">
                <Form.Label column sm={4}>
                  CATEGORY:
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    name="category"
                    as="select"
                onChange={onChange2}
                    //onChange={onChange}

                  >
                    {categories.map((category) => (
                      <option>{category.name}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col sm={4}>
                  <Form.Control
                    onChange={onChange}
                   // name="subCategory"
                   name="subCategoryID"
                    as="select"
                  >
                    {subCategories.length &&
                      subCategories.map((subCategory, key) => (
                                                                         // Emad  I added the "value"
                        <option value={subCategory._id} key={subCategory._id}> 
                         {subCategory.name}
                         {/* {subCategory._id} */}
                        </option>
                      ))}
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="service_form">
                <Form.Label column sm={4}>
                  PRICE:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    name="price"
                    autoComplete="off"
                    value={service.price}
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>



       {/* my form onSubmit */}

       <form onSubmit={onSubmitFile}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
          // onChange={onChangefile}
           onChange={handleChange}
           
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
          <progress value={progress} max="100" />
        </div>

      {/* <Progress percentage={uploadPercentage} /> */}

        {/* <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        /> */}
      </form>



       {/* end my form submit  */}



{/*   
              <Form.Group as={Row} className="service_form">
                <Form.Label column sm={4}>
                  PHOTO:
                </Form.Label>
                <Col sm={8}>
                  <Form.File
                    name="serviceImage"
                    autoComplete="off"
                    onChange={onFileChange}
                  />
                </Col>
              </Form.Group> */}

              <Form.Group className="service_form">
                <Col sm={12}>
                  <Button type="submit">POST</Button>
                </Col>
              </Form.Group>
              {service.serviceImage ? (
                <div className="row mt-5">
                  {" "}
                  <div className="col-md-6 m-auto">
                    <img
                      style={{ width: "100%" }}
                      src={service.serviceImage.filePath}
                      alt=""
                    />
                  </div>
                </div>
              ) : (
                <h1></h1>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    
      <br />
      <br />
      {/* <input type="file" onChange={handleChange} /> */}
      {/* <button onClick={handleUpload}>Upload the image</button> */}

    </div>
  );
};

CreateServiceScreen.propTypes = {
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(CreateServiceScreen);
