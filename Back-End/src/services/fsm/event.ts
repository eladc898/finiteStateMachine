'use strict';

import {IEvent} from "./fsm.interfaces";

export default abstract class Event implements IEvent {

	private readonly _identify:string;

	constructor(identify:string) {
		this._identify = identify;
	}

	get identify(): string {
		return this._identify;
	}
}
