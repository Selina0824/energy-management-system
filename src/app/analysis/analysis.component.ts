import { Component, OnInit } from '@angular/core';
import { LineOptions } from '../model/option.model';
import { ColumnOption } from '../model/option.model';
import { DataGetService } from '../service/data-get.service';
import { DataTransferService } from '../service/data-transfer.service';
import { TimesliceService } from '../service/timeslice.service';
declare let $: any;
declare let Highcharts: any;
import * as addDays from 'date-fns/add_days';
import * as getISOWeek from 'date-fns/get_iso_week';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {
  config: any;
  regions = [];
  /** query part*/
  time = 'date';
  date = null; // new Date();
  dateRange = []; // [ new Date(), addDays(new Date(), 3) ];

  /** ngModel value */
  public values: any[] = null;

  title1 = '2018-02-07区域能耗同比分析';
  title2 = '2018-02区域能耗环比分析';
  title3 = '2018-02不同区域能耗对比分析';
  lightTitle1 = '2018-02-07照明能耗同比分析';
  airTitle1 = '2018-02-07空调能耗同比分析';
  liftTitle1 = '2018-02-07电梯能耗同比分析';
  categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  categoriesChainCompare = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  categoriesCompare = ['1号楼', '2号楼', '3号楼', '4号楼', '5号楼', '6号楼', '7号楼', '8号楼', '9号楼', '10号楼', '11号楼', '12号楼'];
  name = '耗电量/kWh';
  series = [{
    name: '2017-02-07',
    data: [43934, 52503, 57177, 49658, 57031, 49931, 47133, 54175, 43934, 52503, 57177, 49658, 57031, 49931, 47133, 54175, 43934, 52503, 57177, 49658, 57031, 49931, 47133, 54175]
  }, {
    name: '2018-02-07',
    data: [44916, 54064, 59742, 49851, 62490, 51282, 48121, 55434, 44916, 54064, 59742, 49851, 62490, 49282, 48121, 55434, 44916, 54064, 59742, 49851, 59490, 50282, 48121, 55434]
  }];
  seriesChainCompare = [{
    name: '2018-01',
    data: [43934, 52503, 57177, 49658, 57031, 49931, 47133, 54175, 43934, 52503, 57177, 49658, 57031, 49931, 47133, 54175, 43934, 52503, 57177, 49658, 57031, 49931, 47133, 54175, 57177, 49658, 57031, 49931, 47133, 54175, 55045]
  }, {
    name: '2018-02',
    data: [44916, 54064, 59742, 49851, 62490, 51282, 48121, 55434, 44916, 54064, 59742, 49851, 62490, 49282, 48121, 55434, 44916, 54064, 59742, 49851, 59490, 50282, 48121, 55434, 59742, 49851, 59490, 50282]
  }];
  seriesCompare = [{
    name: '耗电量',
    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6]
  }];

  mainOptions = new LineOptions(this.title1, this.categories, this.name, this.series);
  lightOptions = new LineOptions(this.lightTitle1, this.categories, this.name, this.series);
  airOptions = new LineOptions(this.airTitle1, this.categories, this.name, this.series);
  liftOptions = new LineOptions(this.liftTitle1, this.categories, this.name, this.series);
  mainOptionsChainCompare = new LineOptions(this.title2, this.categoriesChainCompare, this.name, this.seriesChainCompare);
  mainOptionsCompare = new ColumnOption(this.title3, this.categoriesCompare, this.name, this.seriesCompare);

  constructor(
    private dataGetService: DataGetService,
    private dataTransferService: DataTransferService,
    private timesliceService: TimesliceService
  ) { }

  onDatetimepicker(datetimepicker){
    datetimepicker.datetimepicker({
      endDate: new Date(),
      format: 'yyyy-mm-dd',
      weekStart: 1,
      autoclose: true,
      startView: 2,
      minView: 2,
      forceParse: false,
      language: 'zh-CN'
    });
  }

  ngOnInit() {
    this.config = this.dataGetService.getConfig();
    this.regions = this.config.regions;

    this.onDatetimepicker($('#datetimepicker'));
    this.onDatetimepicker($('#datetimepicker2'));
    this.onDatetimepicker($('#datetimepicker3'));
    Highcharts.chart('main', this.mainOptions);
    Highcharts.chart('lighting', this.lightOptions);
    Highcharts.chart('air', this.airOptions);
    Highcharts.chart('lift', this.liftOptions);
    Highcharts.chart('huanbicontainer', this.mainOptionsChainCompare);
    Highcharts.chart('duibicontainer', this.mainOptionsCompare);
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
