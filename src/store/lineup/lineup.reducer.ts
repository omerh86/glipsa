import { List, Record, fromJS } from 'immutable';
import { ILineup, IParty, PartyRecord } from './lineup.types';
import { INITIAL_STATE } from './lineup.initial-state';

import {
    PARTY_JOINED,
    PARTY_LEFT,
    PARTY_REORDERD,
    PARTY_SEATED
} from '../../constants';

export function lineupReducer(state: ILineup = INITIAL_STATE, action): ILineup {
    switch (action.type) {
        case PARTY_JOINED: return state.push(action.payload);
        case PARTY_LEFT: return state
            .filter(n => n.partyId !== action.payload.partyId) as ILineup;
        case PARTY_SEATED: return state
            .filter(n => n.partyId !== action.payload.partyId) as ILineup;
        case PARTY_REORDERD:
            let partyToReorder = state.find(n => n.partyId === action.payload.partyId);
            if (partyToReorder) {
                let partyToReOrderCurrentIndex = state.findIndex(n => n.partyId === action.payload.partyId);
                let tempState = state.splice(partyToReOrderCurrentIndex, 1);
                return tempState.splice(action.payload.desiredIndex, 0, partyToReorder) as ILineup;
            } else {
                console.error("FATAL ERR: Cant find the dragged party!")
            }
        default: return state;
    }
};
