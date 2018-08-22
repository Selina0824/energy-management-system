import { Component } from '@angular/core';
import * as addDays from 'date-fns/add_days';
import * as getISOWeek from 'date-fns/get_iso_week';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
        isLeaf: true
      }]
    }, {
      value: 'ningbo',
      label: 'Ningbo',
      isLeaf: true
    }]
  }
  , {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
        isLeaf: true
      }]
    }]
  }];

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls  : ['./query.component.scss']
})
export class QueryComponent {
  /** init data */
  nzOptions = options;
  time = 'date';
  date = null; // new Date();
  dateRange = []; // [ new Date(), addDays(new Date(), 3) ];

  /** ngModel value */
  public values: any[] = null;

  public onChanges(values: any): void {
    console.log(values, this.values);
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }
}

