import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import { useHistory } from "react-router-dom";

export default function Question() {
  const history = useHistory();

  const [answer, setanswer] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const question = "What is Your Nickname?";
  const [role, setRole] = useState("Customer");
  const [setQuestion, setsetQuestion] = useState();
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  var dbUser;
  useEffect(async () => {
    let dbUser;

    !JSON.parse(localStorage.getItem("IsQuestion")) &&
      (await Auth.currentUserPoolUser().then((obj) => {
        const user = {
          username: obj.username,
          email: obj.attributes.email,
        };
        console.log(obj);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("IsQuestion", false);
      }));

    const user = JSON.parse(localStorage.getItem("user"));
    console.log("u1: ", user);
    const users = await db.collection("users");
    const userData = await users.where("username", "==", user.username).get();
    console.log("err", userData);

    userData.forEach((doc) => {
      console.log("data", doc.data());
      dbUser = doc.data();
    });
    if (dbUser) {
      setsetQuestion(true);
    } else {
      setsetQuestion(false);
    }
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    // localStorage.setItem("IsQuestion", true)
    // window.location.reload()
    if (setQuestion) {
      const user = JSON.parse(localStorage.getItem("user"));
      dbUser = {};

      const users = await db.collection("users");
      const userData = await users.where("username", "==", user.username).get();

      userData.forEach((doc) => {
        console.log("data", doc.data());
        dbUser = doc.data();
      });

      if (dbUser.answer) {
        if (answer === dbUser?.answer) {
          localStorage.setItem("IsQuestion", true);
          localStorage.setItem("Role", dbUser.role);
          history.push("/");
          window.location.reload();
        } else {
          alert("invalid answer");
        }
      }
    } else {
      await Auth.currentAuthenticatedUser().then((obj) => {
        const user = {
          username: obj.username,
          email: obj.attributes.email,
          question: question,
          answer: answer,
          role: role,
        };

        console.log("user:", user);
        db.collection("users")
          .add(user)
          .then((doc) => {
            console.log("data Submitted Successfully.");
            localStorage.setItem("IsQuestion", true);
            localStorage.setItem("Role", role);

            history.push("/");
            window.location.reload();
          })
          .catch((err) => {
            console.error("error:", err);
          });
      });
    }
  };

  return (
    <>
      {console.log("local :", JSON.parse(localStorage.getItem("user")))}
      <div className="all-content-center">
        <div className="container">
          <div className="center-box">
            <div className="main-box">
              <form onSubmit={(e) => onSubmitForm(e)}>
                <div class="mb-5">
                  <div>
                    <h3> Enter Role</h3>
                  </div>

                  <div>
                    <span>Please enter your role here</span>
                    <input
                      className="input-design top-space"
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Customer"
                    />
                  </div>
                  <div></div>
                </div>
                <div className="heading-text">
                  {setQuestion ? (
                    <h1>2nd Factor Authentication</h1>
                  ) : (
                    <h1>Set up 2nd Factor Authentication</h1>
                  )}
                </div>

                <div className="cus-form form-top-space">
                  <span>What is Your favorite color?</span>
                  <input
                    className="input-design top-space"
                    type="text"
                    value={answer}
                    onChange={(e) => setanswer(e.target.value)}
                    placeholder="Your Answer"
                  />
                </div>
                <div></div>

                <div className="heading-text">
                  {setQuestion ? (
                    <h1>3rd Factor Authentication</h1>
                  ) : (
                    <h1>Set Up 3rd Factor Authentication</h1>
                  )}
                </div>

                <div className="cus-form form-top-space">
                  <span>Enter a key</span>
                  <input
                    className="input-design top-space"
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Enter key"
                  />
                </div>

                <div className="cus-form form-top-space">
                  <span>Enter a value</span>
                  <input
                    className="input-design top-space"
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter Value"
                  />
                </div>

                <div className="cus-form form-top-space">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
