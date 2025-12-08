import { useState } from "react"

function App() {

  const [username,setUsername] = useState("")
  const [file,setFile] = useState(null)
  const [message,setMessage] = useState("")
  const [messageType,setMessageType] = useState("")
  const [previewUrl,setPriviewUrl] = useState("")

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    if(selectedFile && selectedFile.type.startsWith("image/")){
      const localUrl = URL.createObjectURL(selectedFile)
      console.log(localUrl)
      setPriviewUrl(localUrl)
    }else{
      setPriviewUrl("")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setMessageType("")

    if(!file){
      setMessage("Please select a file")
      setMessageType("error")
      return
    }

    const formData = new FormData()
    formData.append("username",username)
    formData.append("avatar",file)

    try{
      const res = await fetch("http://localhost:5000/upload",{
        method:"POST",
        body:formData
      })

      const data = await res.json()

      if(!data.success){
        setMessage(data.message || "upload failed")
        setMessageType("error")
        return
      }

      setMessage(data.message)
      setMessageType("success")

      if(data.file && data.file.url && data.file.mimetype.startsWith("image/")){
        setPriviewUrl(data.file.url)
      }
    }catch(err){
      console.log(err)
      setMessage("something went wrong")
      setMessageType("error")
    }
  }

    const messageStyle = {
    marginTop: "16px",
    padding: "10px",
    borderRadius: "4px",
    border:
      messageType === "success"
        ? "1px solid #147d3a"
        : messageType === "error"
        ? "1px solid #b3261e"
        : "none",
    backgroundColor:
      messageType === "success"
        ? "#e7f7ed"
        : messageType === "error"
        ? "#fdecea"
        : "transparent",
    color: messageType === "success" ? "#147d3a" : "#b3261e",
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "40px auto",
      }}
    >
      <h1>Multer File Upload (React + Express)</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label>
            Your Name:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                marginLeft: "8px",
                padding: "4px 8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>
            Choose an image:
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ marginLeft: "8px" }}
            />
          </label>
        </div>

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Upload
        </button>
      </form>

      {message && <div style={messageStyle}>{message}</div>}

      {previewUrl && (
        <div style={{ marginTop: "16px" }}>
          <h3>Preview:</h3>
          <img
            src={previewUrl}
            alt="Uploaded"
            style={{
              maxWidth: "100%",
              border: "1px solid #ccc",
              padding: "4px",
              borderRadius: "4px",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App
