import {Component, OnInit, EventEmitter} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {EventEmitterService} from 'src/_services/emitter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  title = '';

  constructor(
    private router: Router,
    private eventEmitterService: EventEmitterService
  ) {

    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.title = '';
        (event.url.split('/dashboard/')[1]).split('-').forEach(
          value => {
            this.title = this.title + value.toUpperCase() + ' ';
          }
        );
      }
    });

  }

  ngOnInit(): void {
    this.loadScript('../../../assets/dashboard/assets/js/custom.js');
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.title = '';
    (window.location.href.split('/dashboard/')[1]).split('-').forEach(
      value => {

        this.title = this.title + value.toUpperCase() + ' ';
      }
    );
  }

  loadScript(url: string) {
    const body = document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  logout() {
    this.eventEmitterService.agentLogout();
  }

}
