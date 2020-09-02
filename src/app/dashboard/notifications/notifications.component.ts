import {Component, OnInit} from '@angular/core';
import {PushNotificationsService} from '../../../_services/push-notifications.service';
import {NotificationsService} from 'angular2-notifications';
import {LoadingService} from '../../../_services/loading.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['notifications.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class NotificationsComponent implements OnInit {

    titlemau = '';
    textmau = '';
    titlepcr = '';
    textpcr = '';

    constructor(
        private _notificationsService: NotificationsService,
        private _loadingService: LoadingService,
        private _pushnotificationService: PushNotificationsService,
    ) {}

    sendMiscNotifications(title, text) {
        const payload = {
            title,
            text
        };

        this._loadingService.loadingChanges.emit(true);

        this._pushnotificationService.sendMiscNotification(payload, 'publicMessage').then(value => {

            this._notificationsService.success('Announcements notification sent to all celebrities/talents!', '', {
                timeOut: 3000,
                showProgressBar: true,
                pauseOnHover: true,
                clickToClose: true,
                clickIconToClose: true
            });

            this.titlemau = '';
            this.textmau = '';
            this._loadingService.loadingChanges.emit(false);
        });
    }

    sendPriceChangeNotifications(title, text) {
        const payload = {
            title,
            text
        };

        this._loadingService.loadingChanges.emit(true);

        this._pushnotificationService.sendMiscNotification(payload, 'priceChangeMessage').then(value => {

            this._notificationsService.success('Price change notification sent to all celebrities/talents!', '', {
                timeOut: 3000,
                showProgressBar: true,
                pauseOnHover: true,
                clickToClose: true,
                clickIconToClose: true
            });

            this.titlepcr = '';
            this.textpcr = '';
            this._loadingService.loadingChanges.emit(false);
        });
    }

    ngOnInit() {}

}
