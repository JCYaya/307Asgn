// src/MyApp.js
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {

   function updateList(person) { 
		postUser(person)
		.then((res) => res.json())
      .then((json) => setCharacters([...characters, json]))
      .catch((error) => {
        console.log(error);
      })
	}
   const [characters, setCharacters] = useState([]);
	
   function removeOneCharacter(index) {
		let user = characters[index];
		deleteUser(user);
		const updated = characters.filter((character, i) => {
      return i !== index;
   });
    setCharacters(updated);
   }
  
	function fetchUsers() {
		const promise = fetch("http://localhost:8000/users");
		return promise;
	}
	
	useEffect(() => {
   fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
   }, [] );
	
	function postUser(person) {
		const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
   });

    return promise;
  }
  
  	function deleteUser(person) {
		const promise = fetch("http://localhost:8000/users" + "/" + person["_id"], {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
   });
	   return promise;
  }

  return (
  <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
    <Form handleSubmit={updateList} />
  </div>
  );
}

export default MyApp;