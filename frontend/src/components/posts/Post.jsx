import React, { useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import {useNavigate } from "react-router-dom";

const Post = () => {
  let [name, setName] = useState();
  let [PostText, setPostText]= useState();

  let navigate=useNavigate();

  const creatPost = () => {
    let Obj = {
      method: "post",
      url: `https://melodious-stardust-14bd07.netlify.app/.netlify/functions/api/createpost`,
      data: {Name: name , Post:PostText},
    };
    fetchDataFromApi(Obj).then((res) => {
      console.log(res);
      // setPostList(res.GetPost);
      // setComments(res.comments);
      alert('Post created successfully')
      window.location.reload();
    });
  };



  return (
    <div>
      <div style={{display:'flex', textAlign:'end', width:"100%"}}>
          <button style={{borderRadius:'20px', backgroundColor:"transparent", color:'white'}} onClick={() => {navigate('/Home')}} >Home</button>
        </div>
      <div style={{ textAlign: "center" }}>
            <h1 style={{color:"white"}}>Create Post</h1>
            <label
              onChange={(event) => {
                setName(event.target.value);
              }}
              style={{color:"white"}}
            >
              Name <input></input>
            </label>
            <textarea
              style={{ textAlign: "center", width: "100%" }}
              id="w3review"
              name="w3review"
              rows="4"
              cols="50"
              onChange={(event) => {
                setPostText(event.target.value);
              }}
            ></textarea>
            <button
              style={{
                border: "bold",
                color: "black",
                borderColor: "transparent",
              }}
              onClick={() => {
                creatPost();
                
              }}
            >
              Upload Post
            </button>
          </div>
    </div>
  )
}

export default Post
