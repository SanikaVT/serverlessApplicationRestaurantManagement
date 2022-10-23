import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import * as React from 'react';
import Button from "@mui/material/Button";

export default function LogOut() {
    const card_1 = {
        backgroundColor: "white",
        borderRadius: "10px",
        borderWidth: 1,
        margin: "10px",
        padding: "10px"
    };
    return (

        <Container component="main" maxWidth="xs">

            <Card variant="outlined" style={card_1}>
                <center>
                <Button  variant="contained" color="success" href={"/"}>
                  Log out
                </Button>
                </center>
            </Card>
        </Container>
    );
}