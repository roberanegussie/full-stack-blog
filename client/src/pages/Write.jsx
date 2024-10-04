import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import axios from 'axios'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
 
const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.descc || "");
  const [title, setTitle] = useState(state?.title ||"");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat ||"")

  const navigate = useNavigate()
  
  const upload = async() =>{
    try{
      const formData = new FormData();
      formData.append("file",file)
      const res = await axios.post("/upload", formData)
      return res.data
    }catch(err){
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
      } else {
        console.error("Error message:", err.message);
      }
    }
  } 
   
  const handleClick = async (e)=>{
    e.preventDefault()
    const imgURL= file ? await upload(file) : null
    try{
      state 
        ? await axios.put(`/posts/${state.id}`,{
          title,
          descc: value, 
          cat, 
          img: file ? imgURL: "",          
          date: state ? undefined : moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
          })
        : await axios.post(`/posts/`,{
          title, 
          descc: value, 
          cat, 
          img: file ? imgURL: "",
          date: state ? undefined : moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        });
        navigate("/")
    } 
      catch (err) {
        if (err.response) {
          console.error("Error response data:", err.response.data);
          console.error("Error response status:", err.response.status);
        } else {
          console.error("Error message:", err.message);
        }
      }
      
  }

  return (
    <div className='add'>
        <div className="content">
            <input type="text" 
              value={title} 
              placeholder="Title"
              onChange={(e)=>setTitle(e.target.value)}
            />
            <div className="editorContainer">
                <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
            </div>
        </div>

        <div className="menu">
            <div className="item">
              <h1>
                Publish
              </h1>
              <span>
                <b>Staus: </b> Draft
              </span>
              <span>
                <b>Visibility: </b> Public
              </span>
              <input 
                style={{ display:"none" }} 
                type="file"
                id="file" 
                name="" 
                accept="image/png, image/jpeg"
                onChange={(e) =>setFile(e.target.files[0])} />
              <label className="file" htmlFor="file" >Upload Image</label>
              <div className="buttons">
                <button>
                  Save as a draft
                </button>
                <Link to="/" onClick={handleClick}>
                <button>
                  Publish
                </button>
                </Link>
              </div>
            </div>
            <div className="item">
              <h1>
                Category
              </h1>
              <div className="cat">
                <input  
                  type="radio" 
                  checked={cat === "art"} 
                  name="cat" 
                  value="art" 
                  id="art" 
                  onChange={(e)=>setCat(e.target.value)}
                />
                <label htmlFor="art">Art</label>
              </div>
              <div className="cat">
                <input 
                  type="radio" 
                  checked={cat === "science"} 
                  name="cat" 
                  value="science" 
                  id="science" 
                  onChange={(e)=>setCat(e.target.value)}
                />
                <label htmlFor="science">Science</label>
              </div>
              <div className="cat">
                <input 
                  type="radio" 
                  checked={cat === "technology"} 
                  name="cat" 
                  value="technology" 
                  id="technology" 
                  onChange={(e)=>setCat(e.target.value)}
                  />
                <label htmlFor="technology">Technology</label>
              </div>
              <div className="cat">
                <input 
                  type="radio" 
                  checked={cat === "cinema"} 
                  name="cat" 
                  value="cinema" 
                  id="cinema" 
                  onChange={(e)=>setCat(e.target.value)}
                  />
                <label htmlFor="cinema">Cinema</label>
              </div>
              <div className="cat">
                <input 
                  type="radio" 
                  checked={cat === "sport"} 
                  name="cat" 
                  value="sport" 
                  id="sport" 
                  onChange={(e)=>setCat(e.target.value)}
                  />
                <label htmlFor="sport">Sport</label>
              </div>
              <div className="cat">
                <input 
                  type="radio" 
                  checked={cat === "food"} 
                  name="cat" 
                  value="food" 
                  id="food" 
                  onChange={(e)=>setCat(e.target.value)}
                  />
                <label htmlFor="food">Food</label>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Write