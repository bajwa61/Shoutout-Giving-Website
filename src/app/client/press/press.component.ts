import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CelebrityService} from '../../../_services/celebrity.service';
import {PageService} from '../../../_services/page.service';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.css']
})
export class PressComponent implements OnInit {



  constructor(private _pageService:PageService) {
  }

  pressData = {};
  ngOnInit(): void {
    this._pageService.getPageByType('terms').subscribe(value => {
      this.pressData = value[0].payload.doc.data();
    })

  }



}
