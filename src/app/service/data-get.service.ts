import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Params } from '../model/data.model';
import { CommonQuery, TimeseriesQuery } from '../model/data.model';
import 'rxjs/add/operator/toPromise';

declare let $: any;

@Injectable()
export class DataGetService {
  params: any;
  queries: any;
  apiPath: any = 'http://139.224.115.99:57773/';
  // apiPath: any = 'http://139.24.217.84:8080/';
  //apiPath: any = 'http://localhost:57773/';
  constructor(private http: Http) {}

  getToken(): string {
    const xCsrfToken = '64ac2b81-0e82-4d7b-98fb-1c497367debe ';
    return xCsrfToken;
  }

  createHeaders(): Headers {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Csrf-Token', this.getToken());
    return headers;
  }

  getConfig(): Promise<any> {
    return this.http.get(this.apiPath + 'api/configuration')
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  setParams(config, time, date, dateRange, selectedRegion): void {
    this.params = new Params(config, time, date, dateRange, selectedRegion);
  }

  getParams(): Params {
    return this.params;
  }

  guuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  setQuery(regionSelect: string, timeslice: any): any {
    let overviewQuery, timeseriesQuery, hierarchyQuery;
    overviewQuery = [];
    timeseriesQuery = [];
    hierarchyQuery = [];
    let factory, system;
    /**
     * TODO DEBUG
     * @type {[string , string , string]}
     */
    // factory = this.params.config.factory;
    system = [ 'air-condition', 'lift', 'light'];
    /**
     * 关于系统的问题，待处理
     */
    overviewQuery.push(new CommonQuery(this.guuid(), regionSelect, 'All', timeslice.startTime, timeslice.endTime));
    overviewQuery.push(new CommonQuery(this.guuid(), regionSelect, 'All', timeslice.lastStartTime, timeslice.lastEndTime));
    hierarchyQuery.push(new CommonQuery(this.guuid(), regionSelect, 'All', timeslice.startTime, timeslice.endTime));
    // tslint:disable-next-line:max-line-length
    timeseriesQuery.push(new TimeseriesQuery(this.guuid(), regionSelect, 'All', timeslice.startTime, timeslice.endTime, timeslice.interval));
    this.queries = {
      'overviewQuery': overviewQuery,
      'timeseriesQuery': timeseriesQuery,
      'hierarchyQuery': hierarchyQuery
    };
  }

  getOverviewData(): Promise <any> {
      return this.http.post(this.apiPath + 'api/overview', this.queries.overviewQuery, {
        headers: this.createHeaders()
      })
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }

  getTimeSeriesData(): Promise <any> {
    return this.http.post(`${this.apiPath}api/timeseries`, this.queries.timeseriesQuery, {
      headers: this.createHeaders()
    })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getHierarchyData(): Promise <any> {
    return this.http.post(`${this.apiPath}api/hierarchy`, this.queries.timeseriesQuery, {
      headers: this.createHeaders()
    })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
}
