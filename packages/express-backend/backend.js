//backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
	users_list: [
	   {
         id: "xyz789",
	      name: "Charlie",
	      job: "Janitor"
	   },
	   {
       	id: "abc123",
	      name: "Mac",
	      job: "Bouncer"
	   },
	   {
	      id: "ppp222",
	      name: "Mac",
	      job: "Professor"
	   },
	   {
	      id: "yat999",
	      name: "Dee",
	      job: "Aspring actress"
	   },
	   {
	      id: "zap555",
	      name: "Dennis",
	      job: "Bartender"
	   }
   ]
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserByJob = (list, job) => {
	return list.filter(
	   (user) => user["job"] === job
	);
};
   
const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const getIndexById = (userToRemove) => {
	for (let i = 0; i < users["users_list"].length; i++) {
		if (users["users_list"][i]["id"] === userToRemove["id"]) {
			return i;
		}
	}
	
	return -1;
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
   res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  
  if (name != undefined || job != undefined) {
	let result;
	
	if (name != undefined) { //name is present
		result = findUserByName(name);
		
		if (job != undefined) { //name & job are present
			result = findUserByJob(result, job);
		}
	}
	
	else if (name == undefined && job != undefined) { //only job is present
		result = findUserByJob(users["users_list"], job);
	}

    result = { users_list: result };
    res.send(result);
  } 

  
  else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.delete("/users", (req, res) => {
	const userToRemove = req.body;
	let userIdx = getIndexById(userToRemove);
	if (userIdx === -1) {
	   res.status(404).send("User doesn't exist.");
	}
	else {
	   users["users_list"].splice(userIdx, 1);
	   res.send();
	}
});

app.listen(port, () => {
   console.log(
      'Example app listening at http://localhost:${port}'
   );
});
