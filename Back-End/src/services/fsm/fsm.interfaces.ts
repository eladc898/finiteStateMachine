export interface IFSM {
	allStates: Map<string, IState>;
	curState: IState;
	willTransition: boolean;
	initEventIdentify: string;

	addState(state: IState): void;
	create();
	processEvent(event: IEvent): any;
}

export interface IState {
	identify: string;
	transitions: Map<string, string>;
	machine: IFSM;

	addTransition(event: IEvent, state: IState): void;
	getTransition(eventIdentify: string): string;
	onEnter(event: IEvent, preState: IState): any;
	onExit(event: IEvent, nextState: IState): any;
	canGoto(event: IEvent, nextState: IState): boolean;
}

export interface IEvent {
	identify: string;
}
