'use strict';

import {IEvent, IFSM, IState} from "./fsm.interfaces";

export default class FSM implements IFSM {
	private _allStates: Map<string, IState>;
	private _curState: IState;
	private _processingTransition: boolean;
	private _initEventIdentify: string;

	constructor(initStateIdentify: string) {
		this._allStates = new Map();
		this._curState = null;
		this._processingTransition = false;
		this._initEventIdentify = initStateIdentify;
	}

	get allStates() {
		return this._allStates;
	}

	get curState() {
		return this._curState;
	}

	get willTransition() {
		return this._processingTransition;
	}

	get initEventIdentify() {
		return this._initEventIdentify;
	}

	get isTerminated() {
		return this._curState === null;
	}

	addState(state: IState): void {
		let identify = state.identify;
		if (this.isTerminated) {
			if (this._allStates.has(identify)) {
				throw new Error(`state is already in: ${identify}`);
			}

			state.machine = this;
			this._allStates.set(identify, state);
		}
		else {
			throw new Error(`state machine is already in running: ${identify}`);
		}
	}

	create() {
		if (this.isTerminated) {
			let initState = this._allStates.get(this._initEventIdentify);
			if (!initState) {
				throw new Error(`cannot find initial state: ${this._initEventIdentify}`);
			}

			this._curState = initState;
		}
	}

	terminate() {
		if (!this.isTerminated) {
			this._curState = null;
		}
	}

	processEvent(event: IEvent): any {
		//make sure machine is ready fro event
		if (!this._processingTransition && this._curState) {
			let nextStateName = this._curState.getTransition(event.identify);
			let nextState = this._allStates.get(nextStateName);

			if (nextState) {
				this._processingTransition = true;
				this._curState.machine = null;
			}

			let transitionAllowed = this._curState.canGoto(event, nextState);
			if (transitionAllowed) {
				if (nextState) {
					//Call states exit and enter events and save the new machine
					let preState = this._curState;
					this._curState.onExit(event, nextState);
					this._curState.machine = this;
					this._curState = nextState;
					this._processingTransition = false;
					return this._curState.onEnter(event, preState);
				}
			}
			else {
				this._curState.machine = this;
				console.log('Transition is not allowed');
				throw new Error(`Transition is not allowed\n`);
			}
		}
	}
}
