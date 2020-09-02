import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../../_services/dashboard.service';
import {LoadingService} from '../../../_services/loading.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class DashBoardComponent implements OnInit {

  salesCountToday = 0;
  salesCountWeek = 0;
  salesCountMonth = 0;

  moneyGeneratedToday = 0;
  moneyGeneratedWeek = 0;
  moneyGeneratedMonth = 0;

  startEnrolledToday = 0;
  startEnrolledWeek = 0;
  startEnrolledMonth = 0;

  recentOrders: any;

  constructor(
    private _dashboardService: DashboardService,
    private _loadingService: LoadingService,
    private _notificationsService: NotificationsService
  ) {
    const startDay = new Date();
    startDay.setHours(0);
    startDay.setMinutes(0);
    startDay.setSeconds(0);

    const startWeek = new Date();
    startWeek.setDate(startWeek.getDate() - 7);
    startWeek.setHours(0);
    startWeek.setMinutes(0);
    startWeek.setSeconds(0);

    const startMonth = new Date();
    startMonth.setDate(startMonth.getDate() - 30);
    startMonth.setHours(0);
    startMonth.setMinutes(0);
    startMonth.setSeconds(0);

    const end = new Date();
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);

    // Sales Status
    this.getSalesStatusToday(startDay, end);
    this.getSalesStatusWeek(startWeek, end);
    this.getSalesStatusMonth(startMonth, end);

    // Money Generated
    this.getMoneyGeneratedToday(startDay, end);
    this.getMoneyGeneratedWeek(startWeek, end);
    this.getMoneyGeneratedMonth(startMonth, end);

    // Stars Enrolled
    this.getStarsEnrolledToday(startDay, end);
    this.getStarsEnrolledWeek(startWeek, end);
    this.getStarsEnrolledMonth(startMonth, end);

    // Recent Orders
    this.getRecentOrder();
  }

  getSalesStatusToday(start, end) {

    this._dashboardService.getSalesStatus(start, end)
      .subscribe((resp) => {
        this.salesCountToday = resp.length;
    });
  }

  getSalesStatusWeek(start, end) {

    this._dashboardService.getSalesStatus(start, end)
      .subscribe((resp) => {
        this.salesCountWeek = resp.length;
    });
  }

  getSalesStatusMonth(start, end) {

    this._dashboardService.getSalesStatus(start, end)
      .subscribe((resp) => {
        this.salesCountMonth = resp.length;
    });
  }

  getMoneyGeneratedToday(start, end) {
    this.moneyGeneratedToday = 0;
    this._dashboardService.getMoneyGenerated(start, end)
      .subscribe((resp) => {
        resp.forEach(data => {
          // tslint:disable-next-line:prefer-const
          const moneyGeneratedToday = data.payload.doc.data();
          this.moneyGeneratedToday += moneyGeneratedToday['amount'];
        });
    });
  }

  getMoneyGeneratedWeek(start, end) {
    this.moneyGeneratedWeek = 0;
    this._dashboardService.getMoneyGenerated(start, end)
      .subscribe((resp) => {
        resp.forEach(data => {
          // tslint:disable-next-line:prefer-const
          const moneyGeneratedWeek = data.payload.doc.data();
          this.moneyGeneratedWeek += moneyGeneratedWeek['amount'];
        });
    });
  }

  getMoneyGeneratedMonth(start, end) {
    this.moneyGeneratedMonth = 0;
    this._dashboardService.getMoneyGenerated(start, end)
      .subscribe((resp) => {
        resp.forEach(data => {
          // tslint:disable-next-line:prefer-const
          const moneyGeneratedMonth = data.payload.doc.data();
          this.moneyGeneratedMonth += moneyGeneratedMonth['amount'];
        });
    });
  }

  getStarsEnrolledToday(start, end) {

    this._dashboardService.getStarsEnrolled(start, end)
      .subscribe((resp) => {
        this.startEnrolledToday = resp.length;
    });
  }

  getStarsEnrolledWeek(start, end) {

    this._dashboardService.getStarsEnrolled(start, end)
      .subscribe((resp) => {
        this.startEnrolledWeek = resp.length;
    });
  }

  getStarsEnrolledMonth(start, end) {

    this._dashboardService.getStarsEnrolled(start, end)
      .subscribe((resp) => {
        this.startEnrolledMonth = resp.length;
    });
  }

  getRecentOrder() {

    this._dashboardService.getRecentOrders()
      .subscribe(resp => {
        this.recentOrders = [];
        resp.forEach(data => {
          const recentOrders = data.payload.doc.data();
          recentOrders['id'] = data.payload.doc.id;
          this.recentOrders.push(recentOrders);
        });
    });
  }

  ngOnInit() {}

}
