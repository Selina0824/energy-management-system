import { Injectable } from '@angular/core';
import { TimeseriesData, TimeReportData, DrilldownData, DrilldownSeries } from '../model/data.model';
import { ChildRegionCard } from '../model/card-data.model';
import * as moment from 'moment';

@Injectable()
export class DataTransferService {

  constructor() {}

  onTimeSeriesTransfered(resp): any {
    const timeseriesData = new TimeseriesData();
    /**
     * TODO 多条response待处理
     */
    resp[0].values.forEach(function (ele) {
      const energy = [];
      let UTCArray, UTC;
      UTCArray = moment(ele.recordtime).toArray();
      UTC = Date.UTC(UTCArray[0], UTCArray[1], UTCArray[2], UTCArray[3], UTCArray[4]);
      energy.push(UTC);
      energy.push(ele.energy);
      timeseriesData.energy.push(energy);
    });
    return timeseriesData;
  }

  onHierarchyTransfered(resp): any {
    let hierarchyData, rootData, drilldownSeries;
    rootData = [];
    drilldownSeries = [];
    const values = resp[0].values;

    values.map(L1Region => {
      rootData.push({
        name: L1Region.label,
        y: L1Region.energy,
        drilldown: L1Region.value
      });
      console.log('root data');
      console.log(rootData);
    });
    values.map( region => {

      if (region.areas) {
        const L2Data = [];
        region.areas.map(L2Region => {
          if (L2Region.subareas) {
            const L3Data = [];
            L2Region.subareas.map( L3Region => {
              if (L3Region.isLeaf) {
                L3Data.push([L3Region.label, L3Region.energy]);
              } else {
                // L3Data.push({
                //   name: L3Region.label,
                //   y: L3Region.energy,
                //   drilldown: L3Region.value
                // });
              }
            });
            L2Data.push({
              name: L2Region.label,
              y: L2Region.energy,
              drilldown: L2Region.value
            });
            drilldownSeries.push({
              name: '层耗电',
              id: L2Region.value,
              data: L3Data
            });
          } else {
            L2Data.push({
              name: L2Region.label,
              y: L2Region.energy
            });
          }
        });
        drilldownSeries.push({
          name: '楼耗电',
          id: region.value,
          data: L2Data
        });
      }
    });

    hierarchyData = {
      rootData: rootData,
      drilldownSeries: drilldownSeries
    };
    return hierarchyData;
  }

  onRegionCardDataTransfered(resp): any {
    let cardData;
    cardData = [];
    const values = resp[0].values;
    values.map( region => {
      if (region.areas) {
        region.areas.map(L2Region => {
          if (L2Region.subareas) {
            L2Region.subareas.map( L3Region => {
              if (L3Region.isLeaf) {
                cardData.push(new ChildRegionCard(L3Region.label, L3Region.energy, 0, 0));
              } else {
              }
            });
          } else {
            cardData.push(new ChildRegionCard(L2Region.label, L2Region.energy, 0, 0));
          }
        });
      } else {
        cardData.push(new ChildRegionCard(region.label, region.energy,  0, 0));
      }
    });
    return cardData;
  }

  onTimeReportDataTransfered(resp): any {
    const timeReportData = new TimeReportData('耗电时段报表');
    /**
     * TODO 多条response待处理
     */
    timeReportData.headers = ['时间', '电压', '电流', '功率', '电量'];
    resp[0].values.forEach(function (ele) {
      const data = [];
      const time = moment(ele.recordtime).format('YYYY-MM-DD, h:mm');
      data.push(time);
      data.push(ele.a_voltage);
      data.push(ele.a_current);
      data.push(ele.total_active_power);
      data.push(ele.energy);
      timeReportData.datas.push(data);
    });
    return timeReportData;
  }
}
