import { Auth } from "aws-amplify";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import db from "../../firebase";
import firebase from "firebase/app";

export default function MultiFactor() {
  const history = useHistory();

  const [answer, setanswer] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const question = "What is Your favorite color?";
  const [role, setRole] = useState("customer");
  const [setQuestion, setsetQuestion] = useState();
  const [cipher, setCipher] = useState("");
  var dbUser;
  useEffect(async () => {
    let dbUser;
    //Checking if the user is a registered user
    !JSON.parse(localStorage.getItem("IsQuestion")) &&
      (await Auth.currentUserPoolUser().then((obj) => {
        const user = {
          username: obj.username,
          email: obj.attributes.email,
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("IsQuestion", false);
      }));
    const user = JSON.parse(localStorage.getItem("user"));
    const users = await db.collection("users");
    const userData = await users.where("username", "==", user.username).get();

    userData.forEach((doc) => {
      dbUser = doc.data();
    });
    console.log(dbUser);

    if (dbUser) {
      setsetQuestion(true);
    } else {
      setsetQuestion(false);
    }
  }, []);

  const generateCipherText = async () => {
    var u = JSON.parse(localStorage.getItem("user"));

//sign-up third factor
var body = {
  email: u.email,
  userName: u.username,
  role: role,
  key: key,
  plainText: value,
};
console.log(body);
//Reference: https://axios-http.com/docs/post_example

try {
  let result = await axios.post(
    "https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/addcipher",

    JSON.stringify(body),
    { headers: { "Content-Type": "application/json" } }
  );
  console.log("op", result);
  setCipher(result.data.body)
} catch (error) {
  console.error(error);
}
  };

  // On submit, perform 2nd and 3rd factor authentication, first check 2nd factor auth and if the answer is invalid, show invalid answer otherwise perform third factor auth
  const onSubmitForm = async (e) => {
    e.preventDefault();

    console.log(setQuestion);
    if (setQuestion) {
      const user = JSON.parse(localStorage.getItem("user"));
      dbUser = {};

      const users = await db.collection("users");
      const userData = await users.where("username", "==", user.username).get();

      userData.forEach((doc) => {
        dbUser = doc.data();
      });
      console.log(dbUser.securityAnswer);
      var count;
      if (dbUser.securityAnswer) {
        if (answer === dbUser?.securityAnswer) {
          localStorage.setItem("IsQuestion", true);
          localStorage.setItem("Role", dbUser.role);
          console.log(dbUser.role);
          console.log(dbUser.loginCount);
          db.collection("users")
            .doc(dbUser.email)
            .update({
              loginCount: dbUser.loginCount || 0 + 1,
              lastAuthTime: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then((doc) => {
              console.log("data Submitted Successfully.");
            })
            .catch((err) => {
              console.error("error:", err);
            });
        } else {
          alert("invalid answer");
        }
      }

      //login 3rd factor
      var body = {
        cipher: cipher,
        username: user.username,
      };
      console.log(body);
    //Reference: https://axios-http.com/docs/post_example

      await axios
        .post(
          "https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/thirdfactor",

          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
              "Content-Type": "application/json",
            },
            crossDomain: true,
            body: JSON.stringify(body),
          }
        )
        .then((response) => {
          console.log(response);
          history.push("/");
          window.location.reload();
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else {
      var u = JSON.parse(localStorage.getItem("user"));

      //signup 2nd factor
      const firebase_body = {
        email: u.email,
        securityQuestion: question,
        securityAnswer: answer,
        role: role,
        username: u.username,
        loginCount: 0,
        lastAuthTime: firebase.firestore.FieldValue.serverTimestamp(),
      };
      console.log(firebase_body);
      await axios
        .post(
          "https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/addtofirebase",

          JSON.stringify(firebase_body),
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log(response);
          localStorage.setItem("IsQuestion", true);
          localStorage.setItem("Role", role);
          history.push("/");
          window.location.reload();
        })
        .catch((err) => {
          console.log("error", err);
        });
      
    }
  };

  return (
    <div className="row justify-content-center align-items-center mt-4">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <form onSubmit={(e) => onSubmitForm(e)}>
              <div className="mb-5">
                {setQuestion ? (
                  <div></div>
                ) : (
                  <div>
                    <div>
                      <h4> Enter Role</h4>
                    </div>
                    <div>
                      <span>Please enter your role here</span>
                      <input
                        className="input-design top-space form-control"
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value.toLowerCase())}
                        placeholder="Customer"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div></div>
              <div className="mb-5">
                {setQuestion ? (
                  <h4>2nd Factor Authentication</h4>
                ) : (
                  <h4>Set up 2nd Factor Authentication</h4>
                )}

                <div className="cus-form form-top-space">
                  <span>What is Your favorite color?</span>
                  <input
                    className="input-design top-space form-control"
                    type="text"
                    value={answer}
                    onChange={(e) => setanswer(e.target.value)}
                    placeholder="Your Answer"
                  />
                </div>
              </div>

              <div></div>

              <div className="mb-5">
                {setQuestion ? (
                  <div>
                    <h4>3rd Factor Authentication</h4>
                    <div className="cus-form form-top-space">
                      <span>Enter a cipher</span>
                      <input
                        className="input-design top-space form-control"
                        type="text"
                        value={cipher}
                        onChange={(e) => setCipher(e.target.value)}
                        placeholder="Enter cipher value"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4>Set Up 3rd Factor Authentication</h4>
                    <div className="cus-form form-top-space">
                      <span>Enter a key</span>
                      <input
                        className="input-design top-space form-control"
                        type="text"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="Enter key"
                      />
                    </div>

                    <div className="cus-form form-top-space">
                      <span>Enter a value</span>
                      <input
                        className="input-design top-space form-control"
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter Value"
                      />
                    </div>
                    <div className="mb-3"></div>
                    <Button onClick={generateCipherText}>Generate Cipher</Button>
                    <div className="mb-2"></div>
                    <span>{cipher}</span>
                  </div>
                )}
              </div>

              <div className="cus-form form-top-space">
                <button className="btn btn-primary" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
