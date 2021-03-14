import {State, Event, FSM} from './fsm';

export const events = {
	start: 'start',
	stop: 'stop'
};

export const states = {
	green: 'green',
	orange: 'orange',
	red: 'red'
};

export class EventStart extends Event {
	constructor() {
		super(events.start);
	}
}

export class EventStop extends Event {
	constructor() {
		super(events.stop);
	}
}

class GreenLight extends State {
	constructor() {
		super(states.green);
	}
}

class OrangeLight extends State {
	constructor() {
		super(states.orange);
	}
}

class RedLight extends State {
	constructor() {
		super(states.red);
	}
}

export class TrafficLightMachine extends FSM {

	constructor() {
		super(states.red);

		const eventStart = new EventStart();
		const eventStop = new EventStop();
		const greenLight = new GreenLight();
		const orangeLight = new OrangeLight();
		const redLight = new RedLight();
		try {
			this.addState(greenLight);
			this.addState(orangeLight);
			this.addState(redLight);
			redLight.addTransition(eventStart, orangeLight);
			orangeLight.addTransition(eventStart, greenLight);
			greenLight.addTransition(eventStop, orangeLight);
			orangeLight.addTransition(eventStop, redLight);
		}
		catch (err) {
			return err;
		}
	}
}
