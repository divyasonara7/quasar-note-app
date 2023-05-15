const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

server.use(middlewares);
server.use(cors()); // Add the cors middleware
server.use(router);

const port =  3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
