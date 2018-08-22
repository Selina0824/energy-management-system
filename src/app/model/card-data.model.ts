export class CardData {
  header: string;
  value = {
    num: 0,
    unit: 'unit'
  };
  description = {
    des: 'description',
    value: '0',
    unit: 'unit'
  };

  constructor(header: string, valueNum: number, valueUnit: string, des: string, desVal: string, desUnit: string) {
    this.header = header;
    this.value.num = valueNum;
    this.value.unit = valueUnit;
    this.description.des = des;
    this.description.value = desVal;
    this.description.unit = desUnit;
  }
}

export class CardLabel {
  value: number;
  status: string;
  diff: number;
  constructor (property, data) {
      this.value = Math.round(data[0].values[property] *100) / 100;
      this.status = data[0].values[property] > data[1].values[property] ? '增加' : '降低';
      this.diff = Math.round(Math.abs(data[0].values[property] - data[1].values[property]) * 100)/100;
  }
}

export class ChildRegionCard {
  name: string;
  energy: number;
  area: number;
  cost: number;

  constructor(name: string, energy: number, area?: number, cost?: number) {
    this.name = name;
    this.energy = energy;
    this.area = area;
    this.cost = cost;
  }
}
