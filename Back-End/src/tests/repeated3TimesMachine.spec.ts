"use strict";

import {expect} from 'chai';
import {Repeated3TimesMachine, states, EventOn, EventOff} from "../services/repeated3TimesMachine";

describe('Repeated3TimesMachine Spec', () => {
    let machine;
    const eventOn = new EventOn();
    const eventOff = new EventOff();

    it('Create machine', () => {
        machine = new Repeated3TimesMachine();
        machine.create();
        expect(machine.curState.identify).equal(states.switchOff);
        expect(machine.counter).equal(0);
        expect(machine.allStates.has(states.switchOn)).equal(true);
    });

    it('Make transition - on', () => {
        machine.processEvent(eventOn);
        expect(machine.curState.identify).equal(states.switchOn);
        expect(machine.counter).equal(1);
    });

    it('Make transition - on again', () => {
        let res = machine.processEvent(eventOn);
        expect(machine.curState.identify).equal(states.switchOn);
        expect(machine.counter).equal(2);

        res = machine.processEvent(eventOn);
        expect(machine.curState.identify).equal(states.switchOn);
        expect(machine.counter).equal(3);
    });

    it('Make transition - off', () => {
        machine.processEvent(eventOff);
        expect(machine.curState.identify).equal(states.switchOff);
        expect(machine.counter).equal(1);
    });

    it('Kill machine', () => {
        machine.terminate();
        expect(machine.curState).equal(null);
    });
});
