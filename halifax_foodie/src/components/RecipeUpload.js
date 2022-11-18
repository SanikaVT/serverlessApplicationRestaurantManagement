import React, { useState, useRef } from "react";
import axios from "axios";

function RecipeUpload() {
  const [uploadedFileName, setUploadedFileName] = useState();
  const [fileContent, setFileContent] = useState("");

  const inputRef = useRef();

  const handleUpload = () => {
    inputRef.current?.click();
  };

  const handleSubmit = async () => {
    const body = {
      filecontent: fileContent,
      filename: uploadedFileName,
    };

    try {
      let result = await axios.post(
        "https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/addrecipe",

        JSON.stringify(body),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result);
    } catch (error) {
      console.error(error); // NOTE - use "error.response.data` (not "error")
    }
  };

  const handleDisplayFileDetails = () => {
    inputRef.current?.files &&
      setUploadedFileName(inputRef.current.files[0].name);
    console.log(inputRef.current.files[0]);
    const reader = new FileReader();
    reader.readAsText(inputRef.current.files[0]);
    reader.onload = async (e) => {
      const text = e.target.result;
      console.log(text);
      setFileContent(text);
    };
  };
  return (
    <div className="m-3">
      <label className="mx-3">Upload a new recipe:</label>
      <input
        ref={inputRef}
        onChange={handleDisplayFileDetails}
        className="d-none"
        type="file"
      />
      <button
        onClick={handleUpload}
        className={`btn btn-outline-${
          uploadedFileName ? "success" : "primary"
        }`}
      >
        {uploadedFileName ? uploadedFileName : "Upload"}
      </button>
      <div></div>
      <div></div>

      <div className="m-3">
        <span>{fileContent}</span>
      </div>

      <button className="m-3" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default RecipeUpload;
