import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  LanguageChangeService
} from 'src/_services/language-change.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

// tslint:disable:variable-name
export class HeaderComponent implements OnInit {

  currentRoute: any = '';
  langEng = true;
  constructor(
    private _router: Router,
    private _languageService: LanguageChangeService
  ) {
    this.currentRoute = this._router.url;
  }
  ngOnInit(): void {

    if (this._languageService.get('lang') === 'arabic') {
      this.langEng = false;
    } else {
      this.langEng = true;
    }
  }
}
