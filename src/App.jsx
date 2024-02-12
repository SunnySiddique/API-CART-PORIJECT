import { Route, Routes } from "react-router-dom";
import CreatePost from "./Components/CreatePost";
import Post from "./Components/Post";

function App() {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
