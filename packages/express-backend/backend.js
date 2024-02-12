//backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js"
import mongoose from "mongoose"

const app = express();
const port = 8000;

//old users constant
/* const users = {
	users_list: [
	   {
         _id: "xyz789",
	      name: "Charlie",
	      job: "Janitor"
	   },
	   {
       	_id: "abc123",
	      name: "Mac",
	      job: "Bouncer"
	   },
	   {
	      _id: "ppp222",
	      name: "Mac",
	      job: "Professor"
	   },
	   {
	      _id: "yat999",
	      name: "Dee",
	      job: "Aspring actress"
	   },
	   {
	      _id: "zap555",
	      name: "Dennis",
	      job: "Bartender"
	   }
   ]
}; */

//old helper functions
/* const findUserByid = (id) =>
  users["users_list"].find((user) => user["_id"] === id); 

 const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};  const findUserByJob = (list, job) => {
	return list.filter(
	   (user) => user["job"] === job
	);
};

const generateid = () => {
	let num = Math.ceil(Math.random()*1000000);
	return num.toString();
};

const addUser = (user) => {
  user._id = generateid();
  users["users_list"].push(user);
  return user;
};

const getIndexByid = (userToRemove) => {
	for (let i = 0; i < users["users_list"].length; i++) {
		if (users["users_list"][i]["_id"] === userToRemove["_id"]) {
			return i;
		}
	}
	
	return -1;
}; 

*/

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
   res.send("Hello World!");
});

//GET all users, or search by name or by job
app.get("/users", (req, res) => {
	const name = req.query.name;
	const job = req.query.job;
	
	try {
		const q = userServices.getUsers(name, job);
		q.then((result) => res.send({users_list: result}));
	}
	catch (e) {
		console.log(e);
	}

	/* old code
	if (name != undefined || job != undefined) {
	let result; 
	if (name != undefined) { //name is present
		result = findUserByName(name);
		
		if (job != undefined) { //name & job are present
			result = findUserByJob(job);
		}
	}
	
	else if (name == undefined && job != undefined) { //only job is present
		result = findUserByJob(job);
	}

	result = { users_list: result };
	res.send(result); 
  
	}
  
		else {
		res.send(users); 
	} */
	
});

//GET by _id
app.get("/users/:_id", (req, res) => {
	
  const id = req.params["_id"]; //or req.params.id
  
  try {
		const q = userServices.findUserById(id);
		q.then((result) => {
			if (result === undefined) {
				res.status(404).send("Resource not found.");
			} 
			
			else {
				res.send(result);
		}});
  }
  catch (e) {
	  console.log(e);
  }
  
  //old code
  /*if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  } */
});

//POST new user
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  
  try {
		const userAdded = userServices.addUser(userToAdd);
		userAdded.then((val) => res.status(201).send(val));
  }
  catch (e) {
		console.log(e);
  }
});

//DELETE user
app.delete("/users/:_id", (req, res) => {
	const id = req.params["_id"];
	
	//old code
/* 	const userToRemove = req.body;
	let useridx = getIndexByid(userToRemove);
	if (useridx === -1) {
	   res.status(404).send("User doesn't exist.");
	}
	else {
	   users["users_list"].splice(useridx, 1);
	   res.send();
	} */
	
	try {
		const q = userServices.deleteUser(id);
		q.then(() => { res.send(); });
	}
	catch (e) {
		console.log(e);
	}
});

app.listen(port, () => {
   console.log(
      'Example app listening at http://localhost:${port}'
   );
});
