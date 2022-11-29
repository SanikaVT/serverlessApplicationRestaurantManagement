const axios = require('axios');

exports.handler = async (event) => {
    var request = event

    await axios.post('https://us-central1-group01-9791a.cloudfunctions.net/userSignUp',request);
    const response = {
        statusCode: 200,
        body: JSON.stringify('Invoked Cloud Function'),
    };
    return response;
};