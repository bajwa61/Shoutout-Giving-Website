import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EnrollService} from 'src/_services/enroll.service';

@Component({
  selector: 'app-enroll-talent-single',
  templateUrl: './enroll-talent-single.component.html',
  styleUrls: ['./enroll-talent-single.component.css']
})

// tslint:disable:no-string-literal
// tslint:disable:variable-name
export class EnrollTalentSingleComponent implements OnInit {

  enrollRequest = {};

  constructor(
    private _route: ActivatedRoute,
    private _enrollService: EnrollService
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.getRequest(params['id']);
    });
  }

  getRequest(requestId) {
    this._enrollService.getRequest(requestId).subscribe((request) => {
      this.enrollRequest = request;

    });
  }

}
