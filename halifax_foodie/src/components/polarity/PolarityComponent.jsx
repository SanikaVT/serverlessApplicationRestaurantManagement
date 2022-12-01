import React, { useEffect, useState } from "react";
import "./PolarityComponent.scss";

import axios from "axios";
import { Card } from "react-bootstrap";
import Plot from "react-plotly.js";

export default function PolarityComponent() {
    const [positive, setPositive] = useState(0);
    const [negative, setNegative] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [polarity, setPolarity] = useState("");


    useEffect(() => {
        getPolarity().then(() => {
            console.log("Polarity fetched");
        })
    }, [])


    //function to get Polarity
    async function getPolarity() {
        var posCount = 0;
        var negCount = 0;
        var neutCount = 0;
        //Reference: https://axios-http.com/docs/post_example
        await axios
            .post(
                "https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/polarity",

                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
                    },
                }
            )
            .then((response) => {
                response = response.data.data;
                for (var i = 0; i < response.length; i++) {
                    if (response[i].Polarity === "POSITIVE") {
                        posCount++;
                    } else if (response[i].Polarity === "NEGATIVE") {
                        negCount++;
                    } else {
                        neutCount++;
                    }
                }
                setPositive(posCount);
                setNegative(negCount);
                setNeutral(neutCount);
                setPolarity(
                    "Polarity: Positive: " +
                    posCount +
                    " Negative: " +
                    negCount +
                    " Neutral: " +
                    neutCount
                );
            });
    }

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6">
                <Card>
                    <Card.Header>Reviews Polarity</Card.Header>
                    <Card.Body>
                        <Plot
                            data={[
                                {
                                    x: ["Positive", "Neutral", "Negative"],
                                    y: [positive, neutral, negative],
                                    type: "scatter",
                                    mode: "lines",
                                },
                                {
                                    type: "bar",
                                    x: ["Positive", "Neutral", "Negative"],
                                    y: [positive, neutral, negative],
                                },
                            ]}
                            layout={{
                                width: '100%',
                                height: '100%',
                                title: "Reveiws Polarity Plot",
                            }}
                        />
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}
