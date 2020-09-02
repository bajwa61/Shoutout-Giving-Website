import {
    Component,
    OnInit
} from '@angular/core';
import {
    NotificationsService
} from 'angular2-notifications';
import {
    LoadingService
} from 'src/_services/loading.service';
import {
    PushNotificationsService
} from 'src/_services/push-notifications.service';
import {
    CelebrityService
} from 'src/_services/celebrity.service';
import {
    ActivatedRoute
} from '@angular/router';

@Component({
    selector: 'app-star-notification',
    templateUrl: './star-notification.component.html',
    styleUrls: ['./star-notification.component.css']
})
export class StarNotificationComponent implements OnInit {

    title = null;
    text = null;
    email: string;

    constructor(
        private _notificationsService: NotificationsService,
        private _loadingService: LoadingService,
        private _pushnotificationService: PushNotificationsService,
        private _celebrityService: CelebrityService,
        private _route: ActivatedRoute,
    ) {
        this._route.params.subscribe(params => {
            this.getCelebrity(params['id']);
        });
    }

    sendNotification(title: any, text: any) {
        const data = {
            email: this.email,
            title,
            text
        };
        this._loadingService.loadingChanges.emit(true);
        this._pushnotificationService.sendUserNotification(data).subscribe(value => {
            this._notificationsService.success('Notification sent', '', {
                timeOut: 3000,
                showProgressBar: true,
                pauseOnHover: true,
                clickToClose: true,
                clickIconToClose: true
            });
            this.title = null;
            this.text = null;
            this._loadingService.loadingChanges.emit(false);
        }, error => {
            if (error.status === 200) {
                this._notificationsService.success('Notification sent', '', {
                    timeOut: 3000,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true,
                    clickIconToClose: true
                });
                this.title = null;
                this.text = null;
            }
            this._loadingService.loadingChanges.emit(false);
        });
    }

    getCelebrity(celebrityId: string) {
        this._celebrityService.getCelebrity(celebrityId).subscribe(
            (fetchedCelebrity: any) => {
                this.email = fetchedCelebrity.emailAddress;
                this._loadingService.loadingChanges.emit(false);
            }, error => {
                this._loadingService.loadingChanges.emit(false);
            });
    }

    ngOnInit() {}

}