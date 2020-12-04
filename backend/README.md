# Teamder API

# Development
The API uses NodeJs; The technologies used are Express and Mongo.
The workflow used is route-controller-service; All requests are handled via this flow.

## Setting up your development environment:

1. Clone the repository after forking.
2. Ensure you have nodeJS, npm and mongod installed.
3. Run `npm install` to fetch and install all the necessary packages
4. Run `npm run dev` to run the API server. The default port used is 4000, i.e `http://localhost:4000/`
5. On another terminal, run `mongod` to set up the database server or you can use mongo atlas. If you use mongo atlas, you can skip running `mongod`.

## Contributing

Please make sure that your commit messages are clean and descriptive. An example of such a commit would be:
```
Collaborators: add APIs for adding, confirming and rejecting collaborations.
```
Try to include a commit description that explains your changes in more detail. While it isn't a must, it does smoothen the development process for other contributors.