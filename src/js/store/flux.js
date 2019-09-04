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
			addContact(contact, history) {
				console.log("vacio", contact);
				fetch("https://3000-a6d88582-8de8-4e79-b616-6c63deea28f7.ws-us1.gitpod.io/contact", {
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
							agenda: store.agenda.concat(data)
						});
						history.push("/contacts");
					})
					.catch(error => {
						//error handling
						console.log("hubo un error en fetch save", error);
						alert("Error!!!!!!!!!!!!!!!!!!!!!");
					});
			},
			editContact(contact, history) {
				console.log("holaaaa", contact);
				fetch("https://3000-a6d88582-8de8-4e79-b616-6c63deea28f7.ws-us1.gitpod.io/contact" + id, {
					method: "PUT",
					headers: { "Content-Type": "Application/json" },
					body: JSON.stringify({
						full_name: contact.full_name,
						email: contact.email,
						agenda_slug: "marcosAgenda",
						address: contact.address,
						phone: contact.phone
					})
				}).then(res => {
					fetch("https://3000-a6d88582-8de8-4e79-b616-6c63deea28f7.ws-us1.gitpod.io/contact")
						.then(resp => resp.json())
						.then(data => {
							//console.log(data);<int:id>
							const store = getStore();
							setStore({ agenda: data });
							history.push("/contacts");
						})

						.catch(error => {
							//console.log(error);
						});
				});
			}
		}
	};
};

export default getState;
