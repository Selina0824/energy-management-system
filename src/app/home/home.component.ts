import { Component, OnInit } from '@angular/core';
import * as addDays from 'date-fns/add_days';
import * as getISOWeek from 'date-fns/get_iso_week';
import { CardData } from '../model/card-data.model';
import { ChartService } from '../service/chart.service';
import { DataGetService } from '../service/data-get.service';
import { DataTransferService } from '../service/data-transfer.service';
import { TimesliceService } from '../service/timeslice.service';
import { Configuration, SystemData } from '../model/data.model';
import { SystemsPieChartOption, TimeseriesLineChartOption, SolidGaugeChartOption } from '../model/option.model';

declare let $: any;
declare let Highcharts: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /**
   * Set:  use mock data or not
   * @type {boolean}
   */
  hasServer = false;
  hasSystem = true;

  config: any;
  regions = [];
  time = 'date';
  date =  new Date();
  dateRange =  [ addDays(new Date(), -3) , new Date()];
  public values: any[] = null;
  cardData: Array<CardData>;
  cardStyle: Array<string> = ['silver', '#229999', '#858ee8', 'silver', '#229999', '#858ee8'];
  callInterval: any = null;
  systemData: any;
  systemPieOption: any;
  noSolidGaugeData = true;
  noTimeseriesData = true;
  noSystemData = true;

  constructor(
    private chartService: ChartService,
    private dataGetService: DataGetService,
    private dataTransferService: DataTransferService,
    private timesliceService: TimesliceService
    ) { }

  ngOnInit() {
    if (this.hasServer) {
      this.dataGetService.getConfig()
        .then(resp => {
            if (resp) {
              const configTransfered = new Configuration(resp);
              console.log(configTransfered);
              this.config = configTransfered;
              this.regions = this.config.regions;
            } else {
              console.log('Get config error!');
            }
          }
        );
      this.dataGetService.setParams(this.config, this.time, this.date, this.dateRange, this.values);
      this.onSearch();
    }

    this.initView();
  }

  initView(): void {
    /**
     * init card
    */
    this.cardData = [
      new CardData('能耗面积', null, '平方米', '能耗指标', null, 'kWh'),
      new CardData(`能耗总量`, null, 'kWh', `环比`, ` `, 'kWh'),
      new CardData(`能耗成本`, null, 'RMB', `环比`, ``, '元'),
    ];
    if(this.hasSystem){
      this.cardData.push(
        new CardData(`照明系统`, null, 'kWh', `环比`, ``, 'kWh'),
        new CardData(`空调系统`, null, 'kWh', `环比`, ``, 'kWh'),
        new CardData(`电梯系统`, null, 'kWh', `环比`, ``, 'kWh')
      );
    }
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

  onSearch(): void {
    if (this.callInterval) {
      clearInterval(this.callInterval);
    }
    let regionSelect, timeCategory, dateSelect, timeslice;
    regionSelect = this.values;
    timeCategory = this.time;
    dateSelect = this.time === 'range' ? this.dateRange : this.date;
    timeslice = this.timesliceService.getTimeslice(dateSelect, timeCategory);
    console.table(timeslice);
    this.dataGetService.setQuery(regionSelect, timeslice);
    this.dataGetService.setParams(this.config, this.time, this.date, this.dateRange, this.values);
    if (this.hasServer) {
      this.draw();
      this.callInterval = setInterval(() => {
        this.draw();
      }, 1000*60*5);
    }
  }

  draw(): void {
    let overviewData, timeseriesData;
    this.dataGetService.getOverviewData()
        .then(resp => {
          if (resp) {
            overviewData = resp;
            console.log('overview data');
            console.log(resp);
            this.drawCard(overviewData);
            this.drawSolidGauge(overviewData);
            this.drawSystemPieChart(overviewData);
          }else {
            console.log('Get overview response error!');
          }
        });
    this.dataGetService.getTimeSeriesData()
        .then(resp => {
          if (resp) {
            console.log('timeseries response');
            console.log(resp);
            timeseriesData = this.dataTransferService.onTimeSeriesTransfered(resp);
            console.log('Timeseries data');
            console.log(timeseriesData);
            this.drawTimeriesChart(timeseriesData);
          } else {
            console.log('Get timeseries response error!');
          }
        });
  }

  onMockData(): void {
    const Excthis = this;
    $.getJSON('assets/mockdata/mockdata.json', '', function (data) {
      const configTransfered = new Configuration(data.configuration);
      const overviewData = data.overviewData;
      const timeseriesData = Excthis.dataTransferService.onTimeSeriesTransfered(data.timeseriesData);
      Excthis.regions = configTransfered.regions;
      Excthis.drawCard(overviewData);
      Excthis.drawSolidGauge(overviewData);
      Excthis.drawSystemPieChart(overviewData);
      Excthis.drawTimeriesChart(timeseriesData);
    });
  }

  drawCard(overviewData): void {
    this.cardData = this.chartService.generateCard(overviewData, this.time, this.hasSystem);
  }

  drawSolidGauge(overviewData): void {
    this.noSolidGaugeData = false;
    let values, peakOption, flatOption, valleyOption, commonOption;
    values = overviewData[0].values;
    peakOption = new SolidGaugeChartOption( values.peakPeriod.energy, values.peakPeriod.target * 1.2, '峰时段用电');
    flatOption = new SolidGaugeChartOption( values.flatPeriod.energy, values.flatPeriod.target * 1.2, '平时段用电');
    valleyOption = new SolidGaugeChartOption(values.valleyPeriod.energy, values.valleyPeriod.target * 1.2, '谷时段用电');
    commonOption = new SolidGaugeChartOption(values.commercial.energy, values.commercial.target * 1.2, '普通用电');
    Highcharts.chart('solidgaugePeak_index', peakOption);
    Highcharts.chart('solidgaugeFlat_index', flatOption);
    Highcharts.chart('solidgaugeValley_index', valleyOption);
    Highcharts.chart('solidgaugeCommon_index', commonOption);
  }

  drawSystemPieChart(overviewData): void {
    this.systemData = new SystemData(overviewData);
    this.noSystemData = false;
    this.systemPieOption = new SystemsPieChartOption(this.systemData);
  }

  drawTimeriesChart(timeseriesData): void {
    const timeseriesLineOption = new TimeseriesLineChartOption(timeseriesData.energy);
    this.noTimeseriesData = false;
    Highcharts.chart('timeseriesView_index', timeseriesLineOption);
  }

  public clearTimer(): void {
    if(this.callInterval){
      clearInterval(this.callInterval);
      this.callInterval = null;
    }
  }
}
