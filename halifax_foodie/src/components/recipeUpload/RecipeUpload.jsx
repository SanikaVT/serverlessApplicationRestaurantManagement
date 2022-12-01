import axios from "axios";
import React, { useRef, useState } from "react";
import db from "../../firebase";
import firebase from "firebase/app";

function RecipeUploadComp() {
  const [uploadedFileName, setUploadedFileName] = useState();
  const [fileContent, setFileContent] = useState("");
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [similarRecipe, setSimilarRecipe] = useState("");
  const [displaySimilarRecipe, setDisplaySimilarRecipe] = useState("");

  const ipRef = useRef();

  const handleUpload = () => {
    ipRef.current?.click();
  };

  const handleSubmit = async () => {
    const body = {
      filecontent: fileContent,
      filename: uploadedFileName,
    };

    try {
        //Reference: https://axios-http.com/docs/post_example
       await axios.post(
        "https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/addrecipe",

        JSON.stringify(body),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const getSimilarRecipe = () => {
    setDisplaySimilarRecipe(similarRecipe);
  };

  //Export recipe function
  const exportRecipe = async () => {
    const body = {
      filename: uploadedFileName,
      createdTime: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      //Reference: https://axios-http.com/docs/post_example
      let result = await axios.post(
        "https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/exportrecipe",
        JSON.stringify(body),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      result = JSON.parse(result.data.body);
      setTitle(result[0].title);
      setIngredients(result[0].ingredients.toString());
      setSimilarRecipe(result[0].similarRecipies);
      const recipe = {
        title: title,
        ingredients: ingredients,
        createdTime: new Date().toLocaleString(),
      };

      db.collection("recipes")
        .add(recipe)
        .then((doc) => {
        })
        .catch((err) => {
        });
    } catch (error) {
      console.error(error); // NOTE - use "error.response.data` (not "error")
    }
  };

  //Code to uplaod recipe file from the system
  const uploadFileFromSystem = () => {
    ipRef.current?.files &&
      setUploadedFileName(ipRef.current.files[0].name);
    const fileReader = new FileReader();
    fileReader.readAsText(ipRef.current.files[0]);
    fileReader.onload = async (e) => {
      const txt = e.target.result;
      setFileContent(txt);
    };
  };
  return (
    <div className="m-3">
      <label className="mx-3">Upload a new recipe:</label>
      <input
        ref={ipRef}
        onChange={uploadFileFromSystem}
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

export default RecipeUploadComp;
