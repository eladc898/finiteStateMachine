'use strict';

import {IEvent, IState, IFSM} from "./fsm.interfaces";

export default abstract class State implements IState {

	private _identify: string;
	//map events name to their next state
	private _transitions: Map<string, string>;
	private _machine: IFSM;

	constructor(identify: string) {
		this._identify = identify;
		this._transitions = new Map();
	}

	get identify(): string {
		return this._identify;
	}

	get transitions() {
		return this._transitions;
	}

	get machine() {
		return this._machine;
	}

	set machine(machine: IFSM) {
		this._machine = machine;
	}

	addTransition(event: IEvent, state: IState): void {
		let eventIdentify = event.identify;
		let stateIdentify = state.identify;

		if (this._transitions.has(eventIdentify)) {
			throw new Error(`Event ${eventIdentify} already existed`);
		}

		this._transitions.set(eventIdentify, stateIdentify);
	}

	getTransition(eventIdentify: string): string {
		return this._transitions.get(eventIdentify);
	}

	onEnter(event: IEvent, preState: IState) {
		if (!event || !preState) return;
		const message = `Entering state ${this._identify} from state ${preState.identify} by event ${event.identify}\n`;
		console.log(message);
		return message;
	}

	onExit(event: IEvent, nextState: IState) {
		if (!event || !nextState) return;
		const message = `Leaving from state ${this._identify} to state ${nextState.identify} by event ${event.identify}\n`;
		console.log(message);
		return message;
	}

	canGoto(event: IEvent, nextState: IState): boolean {
		// check that the pair of (event,state) exist in Map for current state
		return event && nextState && this._transitions.has(event.identify) &&
			this._transitions.get(event.identify) === nextState.identify;
	}
}
