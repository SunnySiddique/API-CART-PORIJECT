import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deletePost,
  getPost,
  setEdit,
  updatePost,
} from "../redux/features/PostSlice";
import Spinner from "./Spinner";

const Post = () => {
  const [id, setId] = useState();
  const [textBody, setTextBody] = useState("");
  const navigate = useNavigate();
  const { isLoading, post, body, edit } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      window.alert("Please Provide Post ID");
    } else {
      dispatch(getPost({ id }));
      setId("");
    }
  };

  // delete handler

  const handleDelete = () => {
    dispatch(deletePost({ id: post[0].id }));
    window.location.reload();
    window.alert("Post Deleted !");
  };

  useEffect(() => {
    if (body) {
      setTextBody(body);
    }
  }, [body]);

  return (
    <>
      <div className="row container mt-4">
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Search By ID:
              </label>
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Fetch Post
            </button>
            <button
              onClick={() => navigate("/createpost")}
              type="button"
              className="btn btn-warning ms-4"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {post.length > 0 && (
              <>
                <div className="card mt-4">
                  <div className="card-body">
                    <h5 className="card-title">{post[0].title}</h5>
                    {edit ? (
                      <>
                        <div className="form-floating">
                          <textarea
                            value={textBody}
                            onChange={(e) => setTextBody(e.target.value)}
                            className="form-control"
                            id="floatingTextarea"
                          />
                          <label htmlFor="floatingTextarea">
                            add post description
                          </label>
                        </div>
                        <div className="mt-4 d-flex align-items-end justify-content-end">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              dispatch(
                                updatePost({
                                  id: post[0].id,
                                  title: post[0].title,
                                  body: textBody,
                                })
                              );
                              dispatch(setEdit({ edit: false, body: "" }));
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-danger ms-4"
                            onClick={() =>
                              dispatch(setEdit({ edit: false, body: "" }))
                            }
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="card-text">{post[0].body}</p>
                      </>
                    )}
                    {!edit && (
                      <div className="d-flex align-items-end justify-content-end">
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            dispatch(
                              setEdit({ edit: true, body: post[0].body })
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-4"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Post;
