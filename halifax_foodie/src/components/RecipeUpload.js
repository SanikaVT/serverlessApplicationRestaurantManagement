import React, { useState, useRef } from "react";

function RecipeUpload() {
  const [uploadedFileName, setUploadedFileName] = useState();
  const inputRef = useRef();

  const handleUpload = () => {
    inputRef.current?.click();
  };

  const handleSubmit = () => {};
  const handleDisplayFileDetails = () => {
    inputRef.current?.files &&
      setUploadedFileName(inputRef.current.files[0].name);
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

      <button className="m-3" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default RecipeUpload;
