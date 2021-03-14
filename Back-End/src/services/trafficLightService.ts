'use strict';

import { events, EventStart, EventStop, TrafficLightMachine} from './trafficLightMachine';

let trafficLightMachine;

export const getMachine = async () => {
	trafficLightMachine = new TrafficLightMachine();
	trafficLightMachine.create();

	return {
		initialState: trafficLightMachine.initEventIdentify,
		possibleEvents: Array.from(trafficLightMachine.curState.transitions.keys())
	};
};

export const makeTransition = async (options) => {
	if (!options || !options.event) {
		throw new Error(`Missing event identify parameter`);
		return;
	}
	let event;
	switch (options.event) {
		case events.start:
			event = new EventStart();
			break;

		case events.stop:
			event = new EventStop();
			break;

		default:
			throw new Error(`Event ${options.event} is invalid`);
	}

	try {
		const message = trafficLightMachine.processEvent(event);
		return {
			message,
			currentState: trafficLightMachine.curState.identify,
			possibleEvents: Array.from(trafficLightMachine.curState.transitions.keys())
		};
	}
	catch (err) {
		throw new Error(`Unable to process event ${options.event}. err: ${(err && err.message || '')}`);
	}
};
