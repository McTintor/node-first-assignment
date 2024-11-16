const users = []; // Array to store usernames

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/' && method === 'GET') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My Node JS Page</title></head>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1];
            users.push(user); // Add the user to the array
            console.log(`Received username: ${user}`);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    if (url === '/users' && method === 'GET') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Users</title></head>');
        res.write('<body><h1>Users List</h1>');
        res.write('<ul>');
        users.forEach((user) => {
            res.write(`<li>${user}</li>`); // Display each username in a list item
        });
        res.write('</ul>');
        res.write('<a href="/">Go back to homepage</a>');
        res.write('</body></html>');
        return res.end();
    }

    // Default response for unmatched routes
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><body><h1>404 - Page Not Found</h1></body></html>');
    res.end();
};

module.exports = requestHandler;
