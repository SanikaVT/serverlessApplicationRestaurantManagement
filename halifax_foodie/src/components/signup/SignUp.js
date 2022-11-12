import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { Select, MenuItem, InputLabel, FormHelperText, FormControl } from "@mui/material";
import axios from "axios";

// import { Auth } from "aws-amplify";
import UserPool from "../../UserPool";

export default function USignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securtiyAnswer, setSecurityAnswer] = useState("");
    const securityQuestions = [
        "What's the name of your first pet?", "What's your nickname?", "What's your birthplace?"
    ];
    const [key, setKey] = useState("");
    const [string, setString] = useState("");

    var data = {
        userName: name,
        id: email,
        userPassword: password,
        role: role,
        key: key,
        plainText: string,
    }
    const onSubmit = (event) => {
        event.preventDefault();
        console.log("email", email)
        console.log("password", password)
        console.log("role", role)
        console.log("securityQuestion", securityQuestion)
        console.log("key", key)
        console.log("string", string)

        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                console.error(err);
            }
            console.log(data)
        });

        axios.post("https://hbdfzpguzakxzaxrhq3lxjluty0vyzwr.lambda-url.us-east-1.on.aws/", data)
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    };
    const card = {
        backgroundColor: "white",
        borderRadius: "10px",
        borderWidth: 1,
        margin: "20px",
        padding: "20px",
    };
    return (
        <Container component="main" maxWidth="xs">
            <Card variant="outlined" style={card}>
                <Box
                    sx={{
                        marginTop: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "#33A5FF" }}></Avatar>
                    <Typography fontSize={25}>Halifax Foodie</Typography>
                    <br />

                    <Box>
                        <form onSubmit={onSubmit}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                required
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                fullWidth
                                name="email"
                                label="Email Address"
                                required
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type={"password"}
                                required
                                sx={{ marginBottom: 1 }}
                                onChange={(event) => setPassword(event.target.value)}
                                onSubmit={onSubmit}
                                value={password}
                            //   error={formError.password}
                            />
                            {/* <FormHelperText>{formError.password}</FormHelperText> */}

                            <div onChange={(event) => setRole(event.target.value)} >
                                <input type="radio" value={"User"} name="role" /> User
                                <input type="radio" value={"Owner"} name="role" /> Owner
                            </div>
                            <br />
                            <FormControl fullWidth sx={{ marginBottom: 1 }} required>
                                <InputLabel>Select a security question</InputLabel>
                                <Select value={securityQuestion} onChange={(event) => setSecurityQuestion(event.target.value)}>
                                    <MenuItem value={securityQuestions[0]} name="securityQuestion">What's the name of your first pet?</MenuItem>
                                    <MenuItem value={securityQuestions[1]} name="securityQuestion">What's your nickname?</MenuItem>
                                    <MenuItem value={securityQuestions[2]} name="securityQuestion">What's your birthplace?</MenuItem>
                                </Select>
                            </FormControl>

                            <br />
                            <TextField
                                fullWidth
                                label="Security Answer"
                                name="securityAnswer"
                                required
                                sx={{ marginBottom: 1 }}
                                onChange={(event) => setSecurityAnswer(event.target.value)}
                                value={securtiyAnswer}
                            />

                            <TextField
                                fullWidth
                                label="Key Word"
                                name="key"
                                required
                                sx={{ marginBottom: 1 }}
                                onChange={(event) => setKey(event.target.value)}
                                value={key}
                            />
                            <TextField
                                fullWidth
                                label="Plain Text"
                                name="string"
                                required
                                sx={{ marginBottom: 1 }}
                                onChange={(event) => setString(event.target.value)}
                                value={string}
                            />
                            <Button fullWidth variant="contained" type={"submit"}>
                                Sign Up
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Card>
        </Container>
    );

};
