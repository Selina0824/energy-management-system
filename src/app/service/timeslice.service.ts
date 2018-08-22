import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Timeslice } from '../model/data.model';

@Injectable()
export class TimesliceService {
  timeslice = [];
  constructor() {}

  getTimeslice(date: any, timeCategory: string ): any {
    switch (timeCategory) {
      case 'week' :
        this.timeslice = this.getWeekTimeslice(date);
        break;
      case 'month' :
        this.timeslice = this.getMonthTimeslice(date);
        break;
      case 'range' :
        this.timeslice = this.getRangeTimeslice(date);
        break;
      default:
        this.timeslice = this.getDateTimeslice(date);
        break;
    }

    return this.timeslice;
  }

   getDateTimeslice(date: Date): any {
    let startTime, endTime, lastStartTime, lastEndTime, dateTimeslice;
    const interval = '5min';
    startTime = moment(date).startOf('day').toISOString();
    endTime = moment(date).endOf('day').toISOString();
    lastStartTime = moment(date).startOf('day').subtract(1, 'days').toISOString();
    lastEndTime = moment(date).endOf('day').subtract(1, 'days').toISOString();
    dateTimeslice = [];
    dateTimeslice = new Timeslice(startTime, endTime, lastStartTime, lastEndTime, interval);
    return dateTimeslice;
  }

  getWeekTimeslice(date: Date): any {
    let startTime, endTime, lastStartTime, lastEndTime, weekTimeslice;
    const interval = '30min';
    startTime = moment(date).startOf('isoWeek').toISOString();
    endTime = moment(date).endOf('isoWeek').toISOString();
    lastStartTime = moment(date).startOf('isoWeek').subtract(1, 'weeks').toISOString();
    lastEndTime = moment(date).endOf('isoWeek').subtract(1, 'weeks').toISOString();
    weekTimeslice = new Timeslice(startTime, endTime, lastStartTime, lastEndTime, interval);
    return weekTimeslice;
  }

  getMonthTimeslice(date: Date): any {
    let startTime, endTime, lastStartTime, lastEndTime, monthTimeslice;
    const interval = '30min';
    startTime = moment(date).startOf('month').toISOString();
    endTime = moment(date).endOf('month').toISOString();
    lastStartTime = moment(date).startOf('month').subtract(1, 'months').toISOString();
    lastEndTime = moment(date).endOf('month').subtract(1, 'months').toISOString();
    monthTimeslice = new Timeslice(startTime, endTime, lastStartTime, lastEndTime, interval);
    return monthTimeslice;
  }

  getRangeTimeslice(date: any): any {
    let startTime, endTime, rangeTimeslice, lastStartTime, lastEndTime, interval;
    startTime = moment(date[0]).startOf('day').toISOString();
    endTime = moment(date[1]).endOf('day').toISOString();
    const a = moment(startTime);
    const b = moment(endTime);
    const diff = b.diff(a, 'days');
    /**
     * 待修改
     */
    interval = '';
    console.log(typeof (diff));
    switch (diff) {

    }
    lastStartTime = moment(date).startOf('month').subtract(`${diff}`, 'days').toISOString();
    lastEndTime = moment(date).endOf('month').subtract(`${diff}`, 'days').toISOString();
    rangeTimeslice = new Timeslice(startTime, endTime, lastStartTime, lastEndTime, interval);
    return rangeTimeslice;
  }
}
