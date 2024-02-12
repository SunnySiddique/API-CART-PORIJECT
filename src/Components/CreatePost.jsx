import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/features/PostSlice";
import Spinner from "./Spinner";

const CreatePost = () => {
  const [values, setValues] = useState({
    title: "",
    body: "",
  });
  const { title, body } = values;

  const [showPost, setShowPost] = useState(false);

  const { isLoading, post } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  //   handle post funcation

  const hanldeCreate = (e) => {
    e.preventDefault();
    dispatch(createPost({ values }));
    setValues({ title: "", body: "" });
    setShowPost(true);
  };

  //   show created post funcation

  const showCreatedPost = () => {
    return (
      <>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">{post[0].title}</h5>
              <p className="card-text">{post[0].body}</p>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <form onSubmit={hanldeCreate}>
        <h1 className="text-center bg-dark text-white pt-2 pb-2 mt-4">
          Create Post
        </h1>
        <div className="mb-3 mt-4">
          <input
            value={title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Post Title"
          />
        </div>
        <div className="form-floating">
          <textarea
            value={body}
            onChange={(e) => setValues({ ...values, body: e.target.value })}
            className="form-control"
            placeholder="add post description"
            id="floatingTextarea"
          />
          <label htmlFor="floatingTextarea">add post description</label>
        </div>
        <div className="mt-4 d-flex align-items-end justify-content-end">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go Home
          </button>
          <button type="submit" className="btn btn-danger ms-4">
            Submit
          </button>
        </div>
      </form>
      <div className="mt-4">{showPost && <div>{showCreatedPost()}</div>}</div>
    </>
  );
};

export default CreatePost;
