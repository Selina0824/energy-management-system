import { Component, OnInit } from '@angular/core';
import { DataGetService } from '../service/data-get.service';
import { DataTransferService } from '../service/data-transfer.service';
import { TimesliceService } from '../service/timeslice.service';
import * as addDays from 'date-fns/add_days';
import * as getISOWeek from 'date-fns/get_iso_week';
import { Configuration } from '../model/data.model';
import { TimeseriesLineChartOption, SolidGaugeChartOption, DrilldownChartOption } from '../model/option.model';

declare let $: any;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  /**
   * Set:  use mock data or not
   * @type {boolean}
   */
  hasServer = false;
  showTable = false;
  complicatedReport = false;
  config: any;
  regions = [];
  /** query part*/
  time = 'date';
  system = 'all';
  report = 'regions-report';
  date = null; // new Date();
  dateRange = []; // [ new Date(), addDays(new Date(), 3) ];

  /** ngModel value */
  public values: any[] = null;

  reportData = {};

  constructor(
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
    } else{
      this.onMockData();
    }
  }

  onSearch() {
    let regionSelect, timeCategory, dateSelect, timeslice;
    regionSelect = this.values;
    timeCategory = this.time;
    dateSelect = this.time === 'range' ? this.dateRange : this.date;
    timeslice = this.timesliceService.getTimeslice(dateSelect, timeCategory);
    this.dataGetService.setQuery(regionSelect, timeslice);
    this.dataGetService.setParams(this.config, this.time, this.date, this.dateRange, this.values);
    this.drawTable();
  }

  drawTable(): void {
    let timeReportData;
    this.dataGetService.getTimeSeriesData()
      .then(resp => {
        if (resp) {
          timeReportData = this.dataTransferService.onTimeReportDataTransfered(resp);
          this.reportData = timeReportData;
          this.showTable = true;
        } else {
          console.log('Get timeseries response error!');
        }
      });
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

  onMockData(): void {
    const Excthis = this;
    $.getJSON('assets/mockdata/mockdata.json', function (data) {
      const configTransfered = new Configuration(data.configuration);
      const overviewData = data.overviewData;
      const timeReportData = Excthis.dataTransferService.onTimeReportDataTransfered(data.timeseriesData);

      Excthis.regions = configTransfered.regions;
      Excthis.reportData = timeReportData;
      Excthis.showTable = true;
    });
  }
}
