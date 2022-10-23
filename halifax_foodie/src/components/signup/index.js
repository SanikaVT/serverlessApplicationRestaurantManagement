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

export default function SignUp() {
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
      console.log("form values = " + formValue.email);
      const form_data = {
        email: formValue.email,
        password: formValue.password,
        name: formValue.name,
        location: formValue.location,
      };
      console.log(form_data);
      axios
        .post("API CALL", form_data)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            console.log(response.data.status);
            window.location.href = "/";
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
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                required
                value={formValue.name}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                name="email"
                label="Email Address"
                required
                type="email"
                value={formValue.email}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={"password"}
                required
                sx={{ marginBottom: 1 }}
                onChange={handleChange}
                onSubmit={handleSubmit}
                value={formValue.password}
                error={formError.password}
              />
              <FormHelperText>{formError.password}</FormHelperText>

              <TextField
                fullWidth
                required
                name="location"
                label="Location"
                value={formValue.location}
                onChange={handleChange}
                sx={{ marginTop: 1, marginBottom: 2 }}
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
}
