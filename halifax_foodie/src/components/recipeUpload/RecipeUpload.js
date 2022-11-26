import React, { useState, useRef } from "react";
import axios from "axios";

function RecipeUpload() {
  const [uploadedFileName, setUploadedFileName] = useState();
  const [fileContent, setFileContent] = useState("");
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [similarRecipe, setSimilarRecipe] = useState("");
  const [displaySimilarRecipe, setDisplaySimilarRecipe] = useState("");

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
      console.error(error);
    }
  };
  const getSimilarRecipe = () => {
    setDisplaySimilarRecipe(similarRecipe);
  };
  const exportRecipe = async () => {
    const body = {
      filename: uploadedFileName,
    };

    try {
      let result = await axios.post(
        "https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/exportrecipe",

        JSON.stringify(body),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(uploadedFileName);
      console.log(result.data.body);

      result = JSON.parse(result.data.body);
      console.log(result);
      setTitle("Title: " + result[0].title);
      setIngredients("Ingredients: " + result[0].ingredients);
      setSimilarRecipe("Similar Recipe: " + result[0].similarRecipies);
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
        <span>File Content: {fileContent}</span>
      </div>

      <button className="m-3" onClick={handleSubmit}>
        Submit
      </button>
      <div></div>

      <button className="m-3" onClick={exportRecipe}>
        Extract Title and Ingredients
      </button>

      <button className="m-3" onClick={getSimilarRecipe}>
        Get Similar recipes
      </button>

      <div className="m-3">
        <span>
          <b>{title}</b>
        </span>
      </div>

      <div className="m-3">
        <span>
          <b>{ingredients} </b>
        </span>
      </div>

      <div className="m-3">
        <span>
          <b>{displaySimilarRecipe} </b>
        </span>
      </div>
    </div>
  );
}

export default RecipeUpload;
