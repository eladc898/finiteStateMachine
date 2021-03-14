import React, {Component} from 'react';
import {WrapperDiv, TrafficLight, TrafficLightState, EventButton} from "./styles";

class TrafficLightComponent extends Component<any, any> {
	constructor(props:any) {
		super(props)
		this.state = {
			currentState: '',
			events: [],
			message: '',
			colors: {
				green: "green",
				orange: "orange",
				red: "red"
			},
			apiUrl: 'http://localhost:8000/trafficLight'
		}

		fetch(this.state.apiUrl)
		.then((res) =>
			res.text())
		.then((data: string) => {
			const machineData = JSON.parse(data);

			this.setState({
				currentState: machineData.initialState,
				events: machineData.possibleEvents,
				selectedEvent: machineData.possibleEvents[0]
			})
		})
		.catch((err) => {
			console.log(`Server unavailable: ${err}`)
		});
	}

	changeState() {
		if (this.state.eventInProcess) return;
		this.setState({
			eventInProcess: true
		})
		fetch(this.state.apiUrl, {
			method: 'PUT',
			body: JSON.stringify({
				event: this.state.selectedEvent
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		.then((res) =>
			res.text())
		.then((data: string) => {
			const eventData = JSON.parse(data);

			this.setState({
				message: eventData.message,
				currentState: eventData.currentState,
				events: eventData.possibleEvents,
			})
			if (eventData.currentState === this.state.colors.orange) {
				setTimeout(() => {
					this.setState({
						eventInProcess: false
					})
					this.changeState()
				}, 3000)
			}
			else {
				this.setState({
					selectedEvent: eventData.possibleEvents[0],
					eventInProcess: false
				})
			}

		})
		.catch((err) => {
			console.log(`Process event failed: ${err}`)
			this.setState({
				eventInProcess: false
			})
		});
	}

	selectEvent = (event: any) => {
		this.setState({
			selectedEvent: event.target.value
		})
	}

	render() {
		return (
			<WrapperDiv>
				<h2>Traffic Light State Machine</h2>
				<div className={'wrapper'}>
					<div>
						<div className={'current-state'}><b>Current State:</b> {this.state.currentState}</div>
						<div><b className={'events-label'}>Events:</b>
							<select onChange={this.selectEvent} value={this.state.selectedEvent}>
								{this.state.events.map((item: string) => (
									<option key={item} value={item}>
										{item}
									</option>
								))}
							</select>
						</div>
						<div><b>Message:</b> {this.state.message}</div>
						<EventButton inProcess={this.state.eventInProcess} onClick={() => this.changeState()}>Send Event</EventButton>
					</div>
				</div>
				<TrafficLight>
					<TrafficLightState active={this.state.currentState === this.state.colors.green} theme={this.state.colors.green}></TrafficLightState>
					<TrafficLightState active={this.state.currentState === this.state.colors.orange} theme={this.state.colors.orange}></TrafficLightState>
					<TrafficLightState active={this.state.currentState === this.state.colors.red} theme={this.state.colors.red}></TrafficLightState>
				</TrafficLight>
			</WrapperDiv>
		);
	}
}

export default TrafficLightComponent
