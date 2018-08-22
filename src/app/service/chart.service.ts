import { Injectable } from '@angular/core';
import { CardData } from '../model/card-data.model';
import { CardLabel } from '../model/card-data.model';

declare let $: any;
declare let Highcharts: any;

@Injectable()
export class ChartService {

  generateCard(data, time, system: boolean): Array<CardData> {
    let cards, currentTime, lastTime, area, energyTarget, energy, cost;
    switch (time) {
      case 'date':
        currentTime = '本日';
        lastTime = '昨日';
        break;
      case 'week':
        currentTime = '本周';
        lastTime = '上周';
        break;
      case 'month':
        currentTime = '本月';
        lastTime = '上月';
        break;
      default:
        currentTime = '本阶段';
        lastTime = '上阶段';
        break;
    }
    area = data[0].values.area;
    // tslint:disable-next-line:max-line-length
    energyTarget = data[0].values.peakPeriod.target + data[0].values.flatPeriod.target + data[0].values.valleyPeriod.target + data[0].values.commercial.target;
    energy = new CardLabel('totalEnergy', data);
    cost = new CardLabel('totalCost', data);
    cards = [
      new CardData('能耗面积', area, '平方米', '能耗指标', energyTarget, 'kWh'),
      new CardData(`能耗总量`, energy.value, 'kWh', `环比${lastTime}`, `${energy.status} ${energy.diff}`, 'kWh'),
      new CardData(`能耗成本`, cost.value, 'RMB', `环比${lastTime}`, `${cost.status} ${cost.diff}`, '元'),
    ];
    if (system) {
      let light, airCondition, lift;
      light = new CardLabel('lightEnergy', data);
      airCondition = new CardLabel('airConditionEnergy', data);
      lift = new CardLabel('liftEnergy', data);
      cards.push(
        new CardData(`照明系统`, light.value, 'kWh', `环比${lastTime}`, `${light.status} ${light.diff}`, 'kWh'),
        new CardData(`空调系统`, airCondition.value, 'kWh', `环比${lastTime}`, `${airCondition.status} ${airCondition.diff}`, 'kWh'),
        new CardData(`电梯系统`, lift.value, 'kWh', `环比${lastTime}`, `${lift.status} ${lift.diff}`, 'kWh')
      );
    }

    return cards;
  }
}
