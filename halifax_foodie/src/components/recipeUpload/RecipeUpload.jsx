import axios from "axios";
import React, { useRef, useState } from "react";
import db from "../../firebase";

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
      createdTime: new Date().getTime(),
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
      setTitle(result[0].title);
      setIngredients(result[0].ingredients);
      setSimilarRecipe(result[0].similarRecipies);
    } catch (error) {
      console.error(error); // NOTE - use "error.response.data` (not "error")
    }

    const recipe = {
      title: title,
      ingredients: ingredients,
      createdTime: new Date().getTime(),
    };

    db.collection("recipes")
      .add(recipe)
      .then((doc) => {
        console.log("data Submitted Successfully.");
      })
      .catch((err) => {
        console.error("error:", err);
      });
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
          <b>Title: {title}</b>
        </span>
      </div>

      <div className="m-3">
        <span>
          <b>Ingredients: {ingredients} </b>
        </span>
      </div>

      <div className="m-3">
        <span>
          <b>Similar Recipe: {displaySimilarRecipe} </b>
        </span>
      </div>
    </div>
  );
}

export default RecipeUpload;