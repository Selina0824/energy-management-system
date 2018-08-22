import { Component, OnInit } from '@angular/core';
import { DataGetService } from '../service/data-get.service';
import { DataTransferService } from '../service/data-transfer.service';
import { TimesliceService } from '../service/timeslice.service';
import { CardData } from '../model/card-data.model';
import { PieOptions } from '../model/option.model';
import * as addDays from 'date-fns/add_days';
import * as getISOWeek from 'date-fns/get_iso_week';
declare let $: any;
declare let Highcharts: any;

@Component({
  selector: 'app-system-monitor',
  templateUrl: './system-monitor.component.html',
  styleUrls: ['./system-monitor.component.scss']
})
export class SystemMonitorComponent implements OnInit {
  config: any;
  regions = [];
  /** query part*/
    // nzOptions = options;
  time = 'date';
  date = null; // new Date();
  dateRange = []; // [ new Date(), addDays(new Date(), 3) ];

  /** ngModel value */
  public values: any[] = null;

  cardData: Array<CardData> = [
    new CardData('照明系统今日能耗', 888.8, 'kWh', '环比昨日', '增加 2.32', 'kWh'),
    new CardData('空调系统今日能耗', 888.8, 'kWh', '环比昨日', '增加 56.5', 'kWh'),
    new CardData('电梯系统今日能耗', 888.8, 'kWh', '环比昨日', '增加 69.2', 'kWh'),
  ];
  cardStyle: Array<string> = ['silver', '#229999', '#858ee8'];
  lightTitle = '照明系统今日用电总量区域分布';
  airTitle = '空调系统今日用电总量区域分布';
  liftTitle = '电梯系统今日用电总量区域分布';
  Name = '区域耗电分布';
  Inner = '40%';
  lightData = [
    ['A', 450],
    ['B', 268],
    ['C', 1085],
    ['D', 620],
  ];
  airData = [
    ['A', 1250],
    ['B', 268],
    ['C', 185],
    ['D', 620],
  ];
  liftData = [
    ['A', 50],
    ['B', 68],
    ['C', 385],
    ['D', 20],
  ];
  lightPieOption = new PieOptions(this.lightTitle, this.Name, this.Inner, this.lightData);
  airPieOption = new PieOptions(this.airTitle, this.Name, this.Inner, this.airData);
  liftPieOption = new PieOptions(this.liftTitle, this.Name, this.Inner, this.liftData);
  // title = '照明系统今日用电总量区域分布';
  // legend = ['A','B','C','D'];
  // name = '区域耗电分布';
  // radius = ['35%','60%'];
  // data = [
  //   {value:325, name:'A'},
  //   {value:410, name:'B'},
  //   {value:534, name:'C'},
  //   {value:492, name:'D'},
  // ];

  constructor(private dataGetService: DataGetService,
              private dataTransferService: DataTransferService,
              private timesliceService: TimesliceService) { }

  ngOnInit() {
    this.config = this.dataGetService.getConfig();
    this.regions = this.config.regions;

    Highcharts.chart('lighting', this.lightPieOption);
    Highcharts.chart('air', this.airPieOption);
    Highcharts.chart('lift', this.liftPieOption);
  }

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
