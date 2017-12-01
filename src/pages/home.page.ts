import { Component, ViewEncapsulation } from '@angular/core';
import { Lineup, Panel, Table, Menu } from '../components';
import { DevToolsExtension, NgRedux, select } from 'ng2-redux';

import {
  IAppState,
  IParty, ITables, IMenu,
  rootReducer,
  middleware,
  enhancers,
} from '../store';
import { Observable } from 'rxjs';
import { LineupActions, TableActions } from '../actions';
import { Orders } from '../components';
import { placedOrders } from '../selectors/selectors';
import { reimmutify } from '../store';
import {Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';


const TEMPLATE = require('./home.template.html');
@Component({
  selector: 'tb-home',
  template: TEMPLATE,
  directives: [Lineup, Panel, Table, Menu, Orders, Dragula ],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [DragulaService],
  styles: [ require('../styles/index.css'), require('dragula/dist/dragula.css') ],
})
export class HomePage {
  @select() lineup$: Observable<IParty>;
  @select() tables$: Observable<ITables>;
  @select() menu$: Observable<IMenu>;
  @select(placedOrders) placedOrders$: Observable<any>;

  constructor(private _ngRedux: NgRedux<IAppState>,
    private _tableActions: TableActions,
    private _lineupActions: LineupActions,
    private _devTools: DevToolsExtension,
    private dragulaService: DragulaService) {
     
    const tools = _devTools.enhancer({
      deserializeState: reimmutify,
    });
    _ngRedux.configureStore(
      rootReducer,
      {},
      middleware,
      tools ? [ ...enhancers, tools ] : enhancers);
  }
};
