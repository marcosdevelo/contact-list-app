import AddContact from "../views/AddContact";

const getState = ({ getStore, setStore }) => {
	return {
		store: {
			agenda: []

			//Your data structures, A.K.A Entities
		},
		actions: {
			deleteContact(id) {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						console.log("La respues del GET /user/marcostodo fue: ", resp.ok); // will be true if the response is successfull
						return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
					})
					.then(data => {
						const store = getStore();
						//here is were your code should start after the fetch finishes
						console.log("DATA delete contact", data); //this will print on the console the exact object received from the server
						setStore({
							agenda: store.agenda.filter(item => item.id !== id)
						});
					})
					.catch(error => {
						//error handling
						console.log("ERROR ", error);
						/**
						 * EDIT THIS!
						 * This function is the equivalent to "window.onLoad", it only run once on the entire application lifetime
						 * you should do your ajax requests or fetch api requests here
						 **/
					});
			},
			addContact(contact) {
				console.log(vacio);
				fetch("https://assets.breatheco.de/apis/fake/contact", {
					method: "POST",
					body: JSON.stringify(contact),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						console.log(resp.ok); // will be true if the response is successfull
						console.log(resp.status); // the status code = 200 or code = 400 etc.
						return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
					})
					.then(data => {
						const store = getStore();
						//here is were your code should start after the fetch finishes
						console.log(data); //this will print on the console the exact object received from the server
						setStore({
							agenda: store.agenda.concat(contact)
						});
					})
					.catch(error => {
						//error handling
						console.log(error);
						alert("Error!!!!!!!!!!!!!!!!!!!!!");
					});
			}
		}
	};
};

export default getState;
