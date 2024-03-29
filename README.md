# Chess Online

Have you ever wanted to play chess but don't have all the pieces? I plan to make a web application so you can play chess online without having to own a board and pieces. You will be able to play with your friends online so that even if you aren't together, you can still enjoy this great game.


![Chess-Online](https://user-images.githubusercontent.com/90023992/215937403-38ea8148-8b58-4ced-8b89-2d66b23f0c6e.png)
![Chess-Online-Board](https://user-images.githubusercontent.com/90023992/215937408-8f10de19-5f9d-4717-8351-8413b3895b40.png)

Key Features:
- Secure login over HTTPS
- Ability to play with another user
- Ability to play with a computer
- Your number of wins is displayed persistently on the scoreboard


IP address of server - http://3.13.33.59/

Domain name - http://chessonline.click

*Make sure to release Elastic IP when finished with this project

Startup HTML:
- The point of HTML is structure.
- HTML by itself isn't very attractive, needs CSS to look readable and nice, needs JavaScript to be interactive, needs Services to be actually useful.
- Use HTML as a skeleton for the website/application, make sure it's divided into appropriate sections.

Startup CSS:
- ID's vs Classes: ID's are for small scale styling, while classes are for many elements that use the same styling.
- It is possible to override Bootstrap CSS classes, but not recommended.
- Main goal is making elements readable (using proper coloring and whitespace).
- Design has a lot to do with using CSS, you can figure out fairly simply how to get things to look a certain way, but you first have to know what you want it to look like.

Startup JavaScript:
- There's a big difference between bare JavaScript and using something like node.js.
- Node.js is used as a backend so that the frontend can call services from it
- Node is different from a .js file included in the frontend (like in the public folder)
- Need an entry point for using node.js
- HTML elements can call JavaScript functions, and can use event listeners to trigger them based on a user's actions.

Startup Services:
- Using node.js, we can set up api endpoints that our front end can call
- By having this backend, we can use others' node packages within our application simply by installing them and creating an endpoint to use them
- Mongodb uses username, password, and a unique cluster id to access a cluster. We shouldn't keep this information within the application itself, as the data will be public information at that point. Instead, store it in a more secret environment variable.
- Mongodb doesn't use the same structure as SQL, instead the collections it stores are kept basically as JSON objects, which translates really well when working a lot with JavaScript as they are similar to JavaScript objects as well.
- Web Sockets are upgraded http connections that allows a more constant flow of data. Useful when clients need to communicate frequently and with more precision.
- When an application starts with node, it will look for an entry point, usually called index.js or main.js. This file is important for setting up api endpoints and providing a path to the rest of the application.
- We are using Express through our node.js index.js file to statically serve our front-end pages.

Simon HTML Assignment:
- Organize file with Head and Body tags, organize Body section into a Header, Main, and Footer.
- Leave comments where I'm going to need to add features later.

Simon CSS Assignment:
- Need to look more into the main, basic bootstrap classes becuase it seems to be way easier to use them than creating my own from scratch.
- Using bootstrap css classes as a foundation and then overriding them to customize further seems to be effective.

Simon JS Assignment:
- Need to figure out way to model functionality using JavaScript for chess, seems like it'll be a lot more complicated than using css and javascript like in the Simon example.
- Use id's and classes to specify exactly what to select for different functions.

Simon Service Assignment:
- Need to use .gitignore file when working with node to make sure the large node_modules directory doesn't get uploaded by git.
- npm init -y
- npm install express
- using an index.js file will be an entry point that node.js will call when we use our web service.

Simon DB Assignment:
- Not good practice to store full connection urls within the actual code, better to make as environment variables or some other way to hide the actual credentials.
- MongoDB is really good at working with JavaScript because of the way its document-based database structure is set up (same as JS objects).
- npm install mongodb
- const {MongoClient} = require('mongodb');

Simon Login Assignment:
- Use a mix of node and mongodb to create api service endpoints.
- These service endpoints utilize http syntax.
- User authentication uses the api calls to validate login information against the database, then stores a token in a cookie so the user has more ease of access.

Simon WebSocket Assignment:
- WebSocket is a way to connect two clients together to consistently share data instead of waiting on server replies
- const { WebSocketServer } = require('ws');
- const wss = new WebSocketServer({ noServer: true });

Simon React Assignment:
- React uses components
- React components use state, props, and render, to update components when data changes
- npx create-react-app "project_name" to initialize a simple base react foundation
- "npm start" while in the project directory to run the program
- npm run build
  - Builds a deployable version of your react project (saves it to a "build" directory)
- React Router
  - Contains routes/links to other "pages"
  - These pages aren't separate html files, rather they are react components modifying the root DOM


Other Notes:
- JSON uses double quotes
- JS objects use colons (Ex: {n:1})
- "chmod +x deploy.sh" makes a script executable
- Use CNAME to point to another DNS record
- Importing fonts:
  - @font-face {
    font-family: 'Quicksand';
    src: url('https://cs260.click/fonts/quicksand.woff2');
  }
  - @import url('https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap');
- DOM:
  -   function insertChild(parentSelector, text) {
        const newChild = document.createElement('div');
        newChild.textContent = text;

        const parentElement = document.querySelector(parentSelector);
        parentElement.appendChild(newChild);
      }

      insertChild('#courses', 'new course');
    - const el = document.querySelector('div');
      el.innerHTML = '<div class="injected"><b>Hello</b>!</div>';
    - const submitDataEl = document.querySelector('#submitData');
      submitDataEl.addEventListener('click', function (event) {
        console.log(event.type);
      });
  - Promises:
    - const coinToss = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve(Math.random() > 0.5 ? 'heads' : 'tails');
        } else {
          reject('fell off table');
        }
      }, 10000);
    });
    We then chain the then, catch and finally functions to the coinToss object in order to handle each of the possible results.

    coinToss
      .then((result) => console.log(`Coin toss result: ${result}`))
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => console.log('Toss completed'));

    // OUTPUT:
    //    Coin toss result: tails
    //    Toss completed
    
  - Fetch:
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: 'test title',
          body: 'test body',
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          console.log(jsonResponse);
        });

![image](https://user-images.githubusercontent.com/90023992/224163440-894bb48a-eba5-4e87-ab97-c55f6724fe8d.png)
![image](https://user-images.githubusercontent.com/90023992/224166416-c980162b-5873-4ff6-9e78-a8efabf06023.png)
![image](https://user-images.githubusercontent.com/90023992/225480008-78f26ed3-c42e-44a6-91f9-40651a2e99ab.png)
![image](https://user-images.githubusercontent.com/90023992/227111087-d8c9177c-9584-4344-9b7a-9394796f3efb.png)


