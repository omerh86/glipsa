import {
    Component,
    Input,
    Output,
    ChangeDetectionStrategy,
    EventEmitter
} from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ILineup } from '../../store';
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';

const TEMPLATE = require('./lineup.component.html');
@Component({
    selector: 'tb-lineup',
    template: TEMPLATE,
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [REACTIVE_FORM_DIRECTIVES, Dragula],
    viewProviders: [DragulaService],
    styles: [require('dragula/dist/dragula.css')]
})
export class Lineup implements OnInit {
    @Input() lineup: ILineup;
    @Output() partyJoined: EventEmitter<any> = new EventEmitter();
    @Output() partyLeft: EventEmitter<any> = new EventEmitter();
    @Output() partyReOrder: EventEmitter<any> = new EventEmitter();

    constructor(private dragulaService: DragulaService) {
    }

    ngOnInit() {
        this.dragulaService.dropModel.subscribe((value) => {
            this.onDrop(value.slice(1));
        });

    }
    private onDrop(args) {
        let [el, parent] = args;
        this.onPartyReOrder(this.getElementPartyId(el), this.getElementIndex(el))
    }

    private getElementIndex(el: any): number {
        return [].slice.call(el.parentElement.children).indexOf(el);
    }

    private getElementPartyId(el: any): number {
        return +el.id;
    }

    private onPartyReOrder(partyId: number, desiredIndex: number) {
        this.partyReOrder.emit({ partyId: partyId, desiredIndex: desiredIndex })
    }

};
