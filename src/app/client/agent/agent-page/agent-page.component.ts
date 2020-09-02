import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../../_services/page.service';
import {
  LanguageChangeService
} from 'src/_services/language-change.service';

@Component({
  selector: 'app-talent',
  templateUrl: './agent-page.component.html',
  styleUrls: ['./agent-page.component.css']
})

export class AgentPageComponent implements OnInit {

  title = 'halahi';
  langEng = true;
  enrollData = {};

  constructor(
    // tslint:disable:variable-name
    private _pageService: PageService,
    private _languageService: LanguageChangeService
  ) {}

  ngOnInit(): void {
    if (this._languageService.get('lang') === 'arabic') {
      this.langEng = false;
    } else {
      this.langEng = true;
    }
    // this._pageService.getPageByType('agent-signup').subscribe(value => {
    //   this.enrollData = value[0].payload.doc.data();
    // });
    this.loadScript('../../../assets/client/assets/js/agent-calculation.js');
  }

  loadScript(url: string) {
    const body =  document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

}
