import React, { useState ,} from "react";
import { fetchDataFromApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import "./_postList.css";

const Postlist = () => {
  let [Posts, setPostList] = useState([]);
  
  let navigate=useNavigate();

  //  if(!products){
  //   Product().then((res)=>{
  //    // console.log(res.props);
  //      setproductlist(res.props);
  //   })
  //  }
  

  if (Posts.length === 0) {
    let Obj = {
      method: "get",
      url: `https://melodious-stardust-14bd07.netlify.app/.netlify/functions/api/getpost`,
    };
    fetchDataFromApi(Obj).then((res) => {
      console.log(res);
       setPostList(res);
    });
  }

  return (
    <div>
      <button style={{borderRadius:'20px', backgroundColor:"transparent", color:'white'}} onClick={() => {navigate('/post')}} >Create Post</button>
      <div className="container py-5">
        <div className="row text-center text-white mb-5">
          <div className="col-lg-7 mx-auto" style={{minWidth:'900px'}}  >
            <h1 className="display-4" >Post List</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <ul className="list-group shadow">
            { Posts.map((item,index)=>{
              
              return(<li className="list-group-item">
                <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                  <div className="media-body order-2 order-lg-1">
                    <h5 className="mt-0 font-weight-bold mb-2">
                     {item.Name}
                    </h5>
                    <p className="font-italic text-muted mb-0 small">
                     {item.Post}
                    </p>
                    <div className="d-flex align-items-center justify-content-between mt-1">
                      <button className="font-weight-bold my-2" style={{borderBlock:"bold", borderRadius:"20px"}}  onClick={()=>{navigate(`/comments/${item._id}`)}}>Comments</button>
                      <ul className="list-inline small">

                      </ul>
                    </div>
                  </div>
                 
                </div>
              </li>)
            })
            }

              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postlist;
