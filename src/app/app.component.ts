import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  NavigationEnd
} from '@angular/router';
import {
  LoadingService
} from '../_services/loading.service';
// tslint:disable:ban-types
declare let fbq: Function;
// declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// tslint:disable:variable-name
export class AppComponent implements OnInit {

  loading = false;

  constructor(
    private _loadingService: LoadingService,
    private router: Router
  ) {
    router.events.subscribe((y: NavigationEnd) => {
      if (y instanceof NavigationEnd) {
        // tslint:disable-next-line:object-literal-key-quotes
        // gtag('dataLayer', 'GTM-K385BLV');
        // fbq('track', 'PageView');
      }
    });
  }

  ngOnInit(): void {
    this._loadingService.loadingChanges.subscribe((value) => {
      setTimeout(() => {
        this.loading = value;
      });
    });
  }

}
