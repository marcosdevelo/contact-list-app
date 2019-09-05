import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import ContactCard from "../component/ContactCard";

export default class EditView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			full_name: null,
			agenda_slug: "marcosAgenda",
			email: null,
			phone: null,
			address: null
		};
	}

	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					if (this.state.full_name == null) {
						const pupu = store.agenda.find(c => c.id === parseInt(this.props.match.params.id, 10));
						this.setState(pupu);
						console.log(
							"Estamos reemplazando el state por este valor que tiene el id " +
								this.props.match.params.id,
							pupu
						);
					}

					console.log("Este es el state: ", this.state);
					console.log("Esta es la agenda: ", store.agenda);
					return (
						<div className="container">
							<div>
								<h1 className="text-center mt-5">Edit contact</h1>
								<form>
									<div className="form-group">
										<label>Full Name</label>
										<input
											onChange={e => this.setState({ full_name: e.target.value })}
											type="text"
											className="form-control"
											placeholder="Full Name"
											value={this.state.full_name}
										/>
									</div>
									<div className="form-group">
										<label>Email</label>
										<input
											onChange={e => this.setState({ email: e.target.value })}
											type="email"
											className="form-control"
											placeholder="Enter email"
											value={this.state.email}
										/>
									</div>
									<div className="form-group">
										<label>Phone</label>
										<input
											onChange={e => this.setState({ phone: e.target.value })}
											type="phone"
											className="form-control"
											placeholder="Enter phone"
											value={this.state.phone}
										/>
									</div>
									<div className="form-group">
										<label>Address</label>
										<input
											onChange={e => this.setState({ address: e.target.value })}
											type="text"
											className="form-control"
											placeholder="Enter address"
											value={this.state.address}
										/>
									</div>
									<button
										onClick={() => {
											const pupu = store.agenda.find(
												c => c.id === parseInt(this.props.match.params.id, 10)
											);
											console.log("pupu", pupu);
											actions.editContact(this.state, this.props.history, pupu.id);
										}}
										type="button"
										className="btn btn-primary form-control">
										save
									</button>
									<Link className="mt-3 w-100 text-center" to="/">
										or get back to contacts
									</Link>
								</form>
							</div>
						</div>
					);
				}}
			</Context.Consumer>
		);
	}
}

EditView.propTypes = {
	match: PropTypes.object,
	history: PropTypes.object
};
