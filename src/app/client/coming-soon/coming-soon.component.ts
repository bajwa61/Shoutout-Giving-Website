import {Component, OnInit} from '@angular/core';
import {PageService} from 'src/_services/page.service';

@Component({
  selector: 'app-category',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css']
})

// tslint:disable:variable-name
export class ComingSoonPageComponent implements OnInit {

  constructor(
    private _pageService: PageService
  ) {}

  ngOnInit(): void {}

}
