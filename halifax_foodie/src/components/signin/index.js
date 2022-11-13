import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import FormHelperText from "@mui/material/FormHelperText";
import { useState } from "react";
import axios from "axios";

export default function SignIn() {
  const card = {
    backgroundColor: "white",
    borderRadius: "10px",
    borderWidth: 1,
    margin: "10px",
    padding: "10px",
  };

  const initialValues = { password: "", email: "" };
  const [formValue, setFormValue] = useState(initialValues);
  const [formError, setFormError] = useState({});
  let errori = 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(formValue));
    if (errori === 0) {
      const form_data = {
        email: formValue.email,
        password: formValue.password,
      };
      localStorage.setItem("email", formValue.email);
      axios
        .post("API_CALL", form_data)
        .then((response) => {
          if (response.status === 200) {
            window.location.href = "/dashboard";
          }
        })
        .catch(function (error) {
          console.log("Exception occured");
        });
    } else {
      console.log("error");
      console.log(formError);
    }
  };

  const validate = (values) => {
    const errors = {};
    const emailreg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
      errori = 1;
    } else if (!emailreg.test(values.email)) {
      errors.email = "Email is not valid";
      errori = 1;
    } else {
      errori = 0;
    }
    return errors;
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card variant="outlined" style={card}>
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#33A5FF" }}></Avatar>
          <Typography fontSize={25}>Halifax Foodie</Typography>
          <br />

          <Box>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                name="email"
                onChange={handleChange}
                value={formValue.email}
                required
              />
              <br></br>
              <br></br>
              <TextField
                fullWidth
                name="password"
                id="password"
                label="Password"
                type="password"
                onChange={handleChange}
                onSubmit={handleSubmit}
                value={formValue.password}
                error={formError.password}
                required
              />
              <FormHelperText>{formError.password}</FormHelperText>
              {/*<br></br>*/}
              <br></br>

              <Button type="submit" fullWidth variant="contained">
                Sign In
              </Button>
            </form>
          </Box>
          <Box>
            <br></br>
            <Button variant="contained" color="success" href={"/signup"}>
              Sign Up{" "}
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
