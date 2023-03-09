import Comments from "./components/comments/Comments";
import Postlist from "./components/PostDetails/Postlist";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Post from "./components/posts/Post";

// import Post from "./components/posts/Post";

function App() {
  return (
       <BrowserRouter>
       <Routes>
         <Route path="/comments/:postId" element={<Comments/>}/>
         <Route path="/home" element={<Postlist/>}/>
         <Route path="/" element={<Postlist/>}/>
         <Route path="/post" element={<Post/>}/>
       </Routes>
       </BrowserRouter>
  );
}

export default App;
