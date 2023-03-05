import React, { useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import "./_commens.css";
import { useParams, useNavigate } from "react-router-dom";

const Comments = () => {
  let [Posts, setPostList] = useState(null);
  let [comments, setComments] = useState([]);
  const { postId } = useParams();
  const [addComent, setAddComents] = useState();
  let [com, setCom] = useState(false);
  let [edit, setEdit] = useState(false);
  let [id, setid] = useState();
  let [name, setName] = useState();
  let [pcomment, setPComment] = useState(false);
  let [aaa, setA] = useState(true);
  let navigate = useNavigate();

  ///////////////////Post Edit/////////////

  let [PostEdit, setPostEdit] = useState();
  let [PostEditabale, setPostEditable] = useState(false);
  /////////////////////Text Editable///////////////////
  let [makeeditable, setMakeeditable] = useState(false);
  let [commentEdit, setCommentEdit] = useState();
  let [treackComment, setTreackComment] = useState();
  let [MainCommentEdit, setMainCommentEdit] = useState(false);

  /////////////////////nested Comment edit/////////////
  let [EditDone, setEditDone] = useState(false);
  let [editabale, setEditable] = useState(false);

  let [nnComent, setnnComent] = useState(false);
  let [commetnText, setCommentText] = useState();
  console.log(commetnText);

  if (Posts == null) {
    let Obj = {
      method: "get",
      url: `http://localhost:3003/getpostWithComments/${postId}`,
    };
    fetchDataFromApi(Obj).then((res) => {
      console.log(res);
      setPostList(res.GetPost);
      setComments(res.comments);
    });
  }

  /////////////////////////////New Comments////////////////////////////
  const createComments = () => {
    let Obj = {
      method: "post",
      url: `http://localhost:3003/createcomment`,
      data: { Comment: addComent, PostId: postId, Name: name },
    };
    fetchDataFromApi(Obj).then((res) => {
      console.log(res);
      window.location.reload();
    });
  };

  ///////////////////////////////Update Comments////////////////////////
  const sendComments = (text) => {
    let Obj = {
      method: "put",
      url: `http://localhost:3003/updatecomment`,
      data: { Reply: addComent, Comment: PostEdit, _id: id, Name: name },
    };
    fetchDataFromApi(Obj).then((res) => {
      console.log(res);
      // setPostList(res.GetPost);
      // setComments(res.comments);
      window.location.reload();
    });
  };

  //////////////////////////////Update Nasted Comments////////////////////

  const UpdateComments = (id, rpId, text) => {
    let Obj = {
      method: "put",
      url: `http://localhost:3003/updateNestedcomment`,
      data: { replyId: rpId, Comment: text, _id: id, Name: name },
    };
    fetchDataFromApi(Obj).then((res) => {
      console.log(res);
      // setPostList(res.GetPost);
      // setComments(res.comments);
      window.location.reload();
    });
  };


  ////////////////////////////////////Update Post///////////////////////
  const editPost = (text) => {
    let Obj = {
      method: "put",
      url: `http://localhost:3003/updatepost`,
      data: { Post: PostEdit, _id: postId },
    };
    fetchDataFromApi(Obj).then((res) => {
      console.log(res);
      // setPostList(res.GetPost);
      // setComments(res.comments);
      window.location.reload();
    });
  };

  //////////////////////////////////Delete Post//////////////////////////

  const deletePost = () => {
    let Obj = {
      method: "Delete",
      url: `http://localhost:3003/deletepost`,
      data: { _id:postId },
    };
    fetchDataFromApi(Obj).then((res) => {
      console.log(res);
      // setPostList(res.GetPost);
      // setComments(res.comments);
      navigate('/Home');
    });
  };
  //////////////////////////////////Delete Comments/////////////////////

  const deleteCom = (id, rpId) => {
    let Obj = {
      method: "Delete",
      url: `http://localhost:3003/deletecomment`,
      data: { _id: id, replyId: rpId },
    };
    fetchDataFromApi(Obj).then((res) => {
      console.log(res);
      // setPostList(res.GetPost);
      // setComments(res.comments);
      window.location.reload();
    });
  };

  return (
    <div>
      <div className="container mb-5 mt-5">
        <div>
          <div style={{ display: "flex", textAlign: "end", width: "100%" }}>
            <button
              style={{
                borderRadius: "20px",
                backgroundColor: "transparent",
                color: "white",
              }}
              onClick={() => {
                navigate("/Home");
              }}
            >
              Home
            </button>
            <button
              style={{
                borderRadius: "20px",
                backgroundColor: "transparent",
                color: "white",
              }}
              onClick={() => {
                navigate("/post");
              }}
            >
              Create Post
            </button>
          </div>
          <div class="container py-5">
            <div class="row text-center text-white mb-5">
              <div class="col-lg-7 mx-auto" style={{ minWidth: "900px" }}>
                <h1 class="display-4">Post</h1>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-8 mx-auto">
                <ul class="list-group shadow">
                  <li class="list-group-item">
                    <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                      <div class="media-body order-2 order-lg-1">
                        <h5 class="mt-0 font-weight-bold mb-2">
                          {Posts ? Posts.Name : ""}
                        </h5>
                        <p
                          class="font-italic text-muted mb-0 small"
                          contenteditable={`${edit}`}
                          onInput={(e) => {
                            setPostEdit(e.currentTarget.textContent);
                          }}
                        >
                          {Posts ? Posts.Post : ""}
                        </p>
                        <div class="d-flex align-items-center justify-content-between mt-1">
                          <div style={{ display: "flex", width: "100%" }}>
                            {edit ? (
                              <button
                                onClick={() => {
                                  setEdit((edit = !edit));
                                  editPost(Posts.Post);
                                }}
                                class="font-weight-bold my-2"
                                style={{
                                  borderBlock: "bold",
                                  borderRadius: "20px",
                                  marginRight: "0px",
                                }}
                              >
                                Done
                              </button>
                            ) : (
                              <div>
                                {" "}
                                <button
                                  onClick={() => {
                                    setPComment(true);
                                    setCom((com = !com));
                                  }}
                                  class="font-weight-bold my-2"
                                  style={{
                                    borderBlock: "bold",
                                    borderRadius: "20px",
                                  }}
                                >
                                  Comments
                                </button>
                                <button
                                  onClick={() => {
                                    setEdit((edit = !edit));
                                  }}
                                  class="font-weight-bold my-2"
                                  style={{
                                    borderBlock: "bold",
                                    borderRadius: "20px",
                                    marginRight: "0px",
                                  }}
                                >
                                  edit
                                </button>

                                <button
                                  onClick={() => {
                                    alert('are you sure you want to delete?');
                                    deletePost();
                                  }}
                                  class="font-weight-bold my-2"
                                  style={{
                                    borderBlock: "bold",
                                    borderRadius: "20px",
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                          <ul class="list-inline small"></ul>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {com ? (
          <div style={{ textAlign: "center" }}>
            <h1>Add Comment</h1>
            <label
              onChange={(event) => {
                setName(event.target.value);
              }}
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
                setAddComents(event.target.value);
              }}
            ></textarea>
            <button
              style={{
                border: "bold",
                color: "black",
                borderColor: "transparent",
              }}
              onClick={() => {
                pcomment ? createComments() : sendComments(addComent);
              }}
            >
              Send
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="card">
          <div className="row">
            <div className="col-md-12">
              <h3 className="text-center mb-5">Nested comment section</h3>
              <div className="row">
                <div className="col-md-12">
                  {comments !== 0
                    ? comments.map((items, index) => {
                        return (
                          <div className="media">
                            <a
                              className="pr-3"
                              href={"#"}
                              onClick={() => {
                                setA(!aaa);
                                setMainCommentEdit(true);
                              }}
                            >
                              <img
                                className="rounded-circle"
                                alt="Bootstrap Media Another Preview"
                                src="https://cdn-icons-png.flaticon.com/512/552/552848.png"
                              />
                            </a>
                            <div className="media-body">
                              <div className="row">
                                <div className="col-8 d-flex">
                                  <h5>{items ? items.Name : ""}</h5>
                                  <span>- 2 hours ago</span>
                                </div>

                                <div className="col-4">
                                  {aaa ? (
                                    <div className="pull-right reply">
                                      <a
                                        href={"#"}
                                        onClick={() => {
                                          setCom((com = !com));
                                          setid(items._id);
                                          setPComment(false);
                                        }}
                                      >
                                        <span>
                                          <i className="fa fa-reply"></i> reply
                                        </span>
                                      </a>
                                    </div>
                                  ) : (
                                    <div className="pull-right reply">
                                      {MainCommentEdit ? (
                                        <>
                                          {" "}
                                          <a
                                            href={"#"}
                                            onClick={() => {
                                              setid(items._id);
                                              setMakeeditable(!makeeditable);
                                              setPostEditable(!PostEditabale);
                                              setMainCommentEdit(false);
                                            }}
                                          >
                                            <span>
                                              <i>edit</i>
                                            </span>
                                          </a>
                                          <br />
                                          <a
                                            href={"#"}
                                            onClick={() => {
                                              setid(items._id);
                                              deleteCom(items._id);
                                            }}
                                          >
                                            <span>
                                              <i>delete</i>
                                            </span>
                                          </a>
                                        </>
                                      ) : (
                                        ""
                                      )}
                                      <br />

                                      {PostEditabale ? (
                                        <a
                                          href={"#"}
                                          onClick={() => {
                                            setMakeeditable(!makeeditable);
                                            setA(!aaa);
                                            setid(items._id);
                                            sendComments();
                                          }}
                                        >
                                          <span>
                                            <i>Done</i>
                                          </span>
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <p
                                contenteditable={`${makeeditable}`}
                                onInput={(e) => {
                                  setPostEdit(e.currentTarget.textContent);
                                }}
                              >
                                {items ? items.Comment : ""}
                              </p>
                              {items.Reply.map((x, y) => {
                                return (
                                  <div className="media mt-4">
                                    <a
                                      className="pr-3"
                                      href={"#"}
                                      onClick={() => {
                                        setEditable(!editabale);
                                      }}
                                    >
                                      <img
                                        className="rounded-circle"
                                        alt="Bootstrap Media Another Preview"
                                        src="https://cdn-icons-png.flaticon.com/512/552/552848.png"
                                      />
                                    </a>
                                    <div className="media-body">
                                      <div className="row">
                                        <div className="col-12 d-flex">
                                          <h5>{x.Name}</h5>
                                          <span>- 3 hours ago</span>
                                        </div>
                                      </div>
                                      <div className="pull-right reply">
                                        {editabale ? (
                                          <>
                                            <a
                                              href={"#"}
                                              onClick={() => {
                                                setid(x._id);
                                                setnnComent(!nnComent);
                                                setEditDone(!EditDone);
                                                setEditable(false);
                                              }}
                                            >
                                              <span>
                                                <i>edit</i>
                                              </span>
                                            </a>

                                            <br />

                                            <a
                                              href={"#"}
                                              onClick={() => {
                                                deleteCom(items._id, x._id);
                                              }}
                                            >
                                              <span>
                                                <i>delete</i>
                                              </span>
                                            </a>
                                          </>
                                        ) : (
                                          ""
                                        )}

                                        <br />

                                        {EditDone ? (
                                          <a
                                            href={"#"}
                                            onClick={() => {
                                              setMakeeditable(!makeeditable);
                                              setA(!aaa);
                                              setid(x._id);
                                              UpdateComments(items._id, x._id ,commetnText);
                                            }}
                                          >
                                            <span>
                                              <i>Done</i>
                                            </span>
                                          </a>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <p
                                        contenteditable={`${nnComent}`}
                                        onInput={(e) => {
                                          setCommentText(
                                            e.currentTarget.textContent
                                          );
                                        }}
                                      >
                                        {x.reply}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
