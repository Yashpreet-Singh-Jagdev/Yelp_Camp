# Yelp Camp

This was a major project developed as part of my [Udemy course](https://www.udemy.com/course/the-web-developer-bootcamp/) through which I learned the core concepts 
of web development. It has **Authentication**, **Authorization**, **Maps Integration** along with **Cluster Maps**, **Password Hashing** & **Salting**, Image upload to 
a cloud platform like **Cloudinary**, and a dummy database in `./seeds` folder along with basic cybersecurity measures against **NoSQL Injection** and **Cross-Site Scripting**.

It was built using **EJS & Bootstrap** for the frontend, **Node.js** and **Express.js** for the backend, and **MongoDB** for data storage.

### Prerequisites to run this project:

- Node.js

- MongoDB

### Steps to run the project:
  
1. Clone the codebase using the following command: `git clone https://github.com/Yashpreet-Singh-Jagdev/Yelp_Camp.git` 

2. Open the folder in your terminal and install the required packages using: npm install.

3. Create a `.env` file in the root directory of the codebase and add the following keys: 


MAPTILER_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=


- Get your Maptiler API key from: [Maptiler API](https://www.maptiler.com/)

- Get your Cloudinary details from: [Cloudinary](https://cloudinary.com/)

4. Start the server by running: `node app.js`
  
5. Open your browser and go to: `localhost:3000/`

That’s it — the project should now be running! 😃
