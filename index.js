const express = require('express');
const axios = require('axios');

const app = express();
const port = 4000;

const numbers = [];
const windowSize = 10;
const baseUrl = 'http://20.244.56.144/test';

const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MDgwMTE4LCJpYXQiOjE3MTcwNzk4MTgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImVjMDIwZmU1LWE4N2QtNDI4YS1hMTUyLWNjZDFhODVhNmNhMCIsInN1YiI6ImdhZGVzdXZhcmNoYWxhOTZAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiJlYzAyMGZlNS1hODdkLTQyOGEtYTE1Mi1jY2QxYTg1YTZjYTAiLCJjbGllbnRTZWNyZXQiOiJWZHV2aW52dElxSVJ1bkRUIiwib3duZXJOYW1lIjoiU3V2YXJjaGFsYSIsIm93bmVyRW1haWwiOiJnYWRlc3V2YXJjaGFsYTk2QGdtYWlsLmNvbSIsInJvbGxObyI6IjIxQkQxQTA1QUcifQ.ucXgCkau79tCD7cdpJ3ZRAX5WAGPzQSB2ewfaqeNEU4';

async function getData(newUrl) {
    try {
        const response = await axios.get(newUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
        });
        console.log(response);
        return response.data.numbers;
    } catch (err) {
        console.error(`Error fetching data: ${err.message}`);
        return null;
    }
}

let nums = [];
app.get('/numbers/:id', async (req, res) => {
    let { id } = req.params;
    if (id === 'e') {
        let newUrl = `${baseUrl}/even`;
        nums = await getData(newUrl);
    } else if (id === 'p') {
        let newUrl = `${baseUrl}/prime`;
        nums = await getData(newUrl);
    } else if (id === 'f') {
        let newUrl = `${baseUrl}/fibo`;
        nums = await getData(newUrl);
    } else if (id === 'r') {
        let newUrl = `${baseUrl}/rand`;
        nums = await getData(newUrl);
    }

    for (let num of nums) {
        if (!numbers.includes(num)) {
            numbers.push(num);
            if (numbers.length > windowSize) {
                numbers.shift();
            }
        }
    }

    const average = numbers.reduce((sum, curr) => sum + curr, 0) / numbers.length;

    const responseObject = {
        average: average,
        oldData: numbers.slice(0, numbers.length - nums.length),
        newData: nums
    };

    res.json(responseObject);
});

app.listen(port, () => {
    console.log("App is listening on port", port);
});
