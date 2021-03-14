import {State, Event, FSM} from './fsm';
import {IEvent} from "./fsm/fsm.interfaces";

export const events = {
	on: 'On',
	off: 'Off'
};

export const states = {
	switchOn: 'switchOn',
	switchOff: 'switchOff'
};

export class EventOn extends Event {
	constructor() {
		super(events.on);
	}
}

export class EventOff extends Event {
	constructor() {
		super(events.off);
	}
}

class SwitchOn extends State {
	constructor() {
		super(states.switchOn);
	}
}

class SwitchOff extends State {
	constructor() {
		super(states.switchOff);
	}
}

export class Repeated3TimesMachine extends FSM {
	private _counter: number;
	private _lastEvent: IEvent;

	constructor() {
		super(states.switchOff);
		this._counter = 0;

		const eventOff = new EventOff();
		const eventOn = new EventOn();
		const offState = new SwitchOff();
		const onState = new SwitchOn();
		try {
			this.addState(onState);
			this.addState(offState);
			offState.addTransition(eventOn, onState);
			onState.addTransition(eventOff, offState);
		}
		catch (err) {
			return err;
		}
	}

	processEvent(event: IEvent): any {
		if (this._lastEvent && event && this._lastEvent.identify !== event.identify) {
			this._counter = 0;
		}

		this._lastEvent = event;
		this._counter++;
		let countMessage;
		if (this._counter === 3) {
			countMessage = 'same type of event has been fired 3 times in a row\n';
			console.log(countMessage);
		}
		try {
			let eventResponse = super.processEvent(event);
			if (countMessage && eventResponse) {
				eventResponse += countMessage;
			}
			return eventResponse;
		}
		catch (err) {
			if (countMessage && err && err.message) {
				err.message += countMessage;
			}
			return err;
		}
	}

	get counter() {
		return this._counter;
	}
}
