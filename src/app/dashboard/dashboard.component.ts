import {
    OnInit,
    Component,
    ViewEncapsulation
} from '@angular/core';
import {
    EventEmitterService
} from 'src/_services/emitter.service';
// tslint:disable:component-selector
@Component({
    selector: '.not-found-wrapper',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    encapsulation: ViewEncapsulation.None,
})

export class DashboardComponent implements OnInit {

    // tslint:disable-next-line:variable-name
    constructor(private _emmiterservice: EventEmitterService) {
       
    }

    ngOnInit() {

   
    }

}