import { Component, OnInit } from '@angular/core';
import { CardData } from '../model/card-data.model';
import { ChartService } from '../service/chart.service';
import { DataGetService } from '../service/data-get.service';
import { DataTransferService } from '../service/data-transfer.service';
import { TimesliceService } from '../service/timeslice.service';
import * as addDays from 'date-fns/add_days';
import * as getISOWeek from 'date-fns/get_iso_week';
import { Configuration } from '../model/data.model';
import { TimeseriesLineChartOption, SolidGaugeChartOption, DrilldownChartOption } from '../model/option.model';

declare let $: any;
declare let Highcharts: any;

@Component({
  selector: 'app-region-monitor',
  templateUrl: './region-monitor.component.html',
  styleUrls: ['./region-monitor.component.scss']
})
export class RegionMonitorComponent implements OnInit {
  /**
   * Set:  use mock data or not
   * @type {boolean}
   */
  hasServer = false;

  config: any;
  regions = [];
  time = 'date';
  date =  new Date();
  dateRange =  [ addDays(new Date(), -3) , new Date()];
  public values: any[] = null;
  cardData: Array<CardData>;
  cardStyle: Array<string> = ['silver', '#229999', '#858ee8'];
  callInterval: any = null;
  timeseriesLineOption: any;
  noSolidGaugeData = true;
  noTimeseriesData = true;
  noDrilldownData = true;

  drilldownChart:any = null;


  tabs = [
    {
      active: true,
      icon  : 'anticon anticon-dashboard'
    },
    {
      active: false,
      icon  : 'anticon anticon-switcher'
    }
  ];

  regionCards = [];

  constructor(
    private chartService: ChartService,
    private dataGetService: DataGetService,
    private dataTransferService: DataTransferService,
    private timesliceService: TimesliceService
    ) {}

  ngOnInit() {

    if (this.hasServer) {
      this.dataGetService.getConfig()
        .then(resp => {
            if (resp) {
              // console.log(resp);
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
    } else{
      this.onMockData();
    }

    this.initView();
  }

  initView(): void {

    /**
     * TODO init all charts without  data;
    */
    /**
     * init card
    */
    this.cardData = [
      new CardData('能耗面积', null, '平方米', '能耗指标', null, 'kWh'),
      new CardData(`能耗总量`, null, 'kWh', `环比`, ` `, 'kWh'),
      new CardData(`能耗成本`, null, 'RMB', `环比`, ``, '元'),
    ];
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

  drawCard(overviewData): void {
    this.cardData = this.chartService.generateCard(overviewData, this.time, false);
  }

  drawRegionCard (regionCards): void {
    this.regionCards = regionCards;
  }

  drawSolidGauge(overviewData): void {
    this.noSolidGaugeData = false;
    let values, peakOption, flatOption, valleyOption, commonOption;
    values = overviewData[0].values;
    peakOption = new SolidGaugeChartOption( values.peakPeriod.energy, values.peakPeriod.target * 1.2, '峰时段用电');
    flatOption = new SolidGaugeChartOption( values.flatPeriod.energy, values.flatPeriod.target * 1.2, '平时段用电');
    valleyOption = new SolidGaugeChartOption(values.valleyPeriod.energy, values.valleyPeriod.target * 1.2, '谷时段用电');
    commonOption = new SolidGaugeChartOption(values.commercial.energy, values.commercial.target * 1.2, '普通用电');
    Highcharts.chart('solidgaugePeak_regionsMonitor', peakOption);
    Highcharts.chart('solidgaugeFlat_regionsMonitor', flatOption);
    Highcharts.chart('solidgaugeValley_regionsMonitor', valleyOption);
    Highcharts.chart('solidgaugeCommon_regionsMonitor', commonOption);
  }

  drawTimeriesChart(timeseriesData): void {
    const timeseriesLineOption = new TimeseriesLineChartOption(timeseriesData.energy);
    this.noTimeseriesData = false;
    Highcharts.chart('timeseriesView_regionsMonitor', timeseriesLineOption);
  }

  drawDrilldownLineChart(data): void {
    const option = new DrilldownChartOption(data.rootData, data.drilldownSeries, 'column');
    this.noDrilldownData = false;
    Highcharts.chart('childRegionView', option);
  }

  draw(): void {
    let overviewData, timeseriesData, drilldownData, regionCardsData;
    this.dataGetService.getOverviewData()
      .then(resp => {
        if (resp) {
          overviewData = resp;
          console.log('overview data');
          console.log(resp);
          this.drawCard(overviewData);
          this.drawSolidGauge(overviewData);
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

    this.dataGetService.getHierarchyData()
      .then(resp => {
        if (resp) {
          drilldownData = this.dataTransferService.onHierarchyTransfered(resp);
          regionCardsData = this.dataTransferService.onRegionCardDataTransfered(resp);
          console.log('Drilldown Data!!!!!!');
          console.log(drilldownData);
          this.drawDrilldownLineChart(drilldownData);
          this.drawRegionCard(regionCardsData);
        } else {
          console.log('Get hierarchy response error!');
        }
      });
  }

  onMockData(): void {
    const Excthis = this;
    $.getJSON('assets/mockdata/mockdata.json', function (data) {
      const configTransfered = new Configuration(data.configuration);
      const overviewData = data.overviewData;
      const timeseriesData = Excthis.dataTransferService.onTimeSeriesTransfered(data.timeseriesData);
      const drilldownData = Excthis.dataTransferService.onHierarchyTransfered(data.hierarchyData);
      const regionCardData = Excthis.dataTransferService.onRegionCardDataTransfered(data.hierarchyData);

      Excthis.regions = configTransfered.regions;
      Excthis.drawCard(overviewData);
      Excthis.drawTimeriesChart(timeseriesData);
      Excthis.drawSolidGauge(overviewData);
      Excthis.drawDrilldownLineChart(drilldownData);
      Excthis.drawRegionCard(regionCardData);
    });
  }
}
