export class Configuration {
  factory: string;
  regions: any[];
  constructor(configResp) {
    this.factory = configResp.factory;
    configResp.regions.forEach(region => {
      this.transfer(region);
    });
    this.regions = configResp.regions;
  }

  transfer(region): void {
    if (region.isLeaf) {
    } else {
      region['children'] = region.areas ? region.areas : region.subareas;
      region['children'].map(subregion => this.transfer(subregion));
    }
  }

}

export class Timeslice {
  startTime: Date;
  endTime: Date;
  lastStartTime: Date;
  lastEndTime: Date;
  interval: string;
  constructor(startTime: Date, endTime: Date, lastStartTime: Date, lastEndTime: Date, interval: string
  ) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.lastStartTime = lastStartTime;
    this.lastEndTime = lastEndTime;
    this.interval = interval;
  }
}

export class Params {
  config: any;
  time: string;
  date: Date;
  dateRange: Date[];
  selectedRegion: string;
  constructor(config: any, time: string, date: Date, dateRange: Date[], selectedRegion: string) {
    this.config = config;
    this.time = time;
    this.date = date;
    this.dateRange = dateRange;
    this.selectedRegion = selectedRegion;
  }
}

export class CommonQuery {
  'queryId': string;
  'option': {
    'factory': string,
    'region': string,
    'system': string,
    'startTime': Date,
    'endTime': Date,
  };
  constructor(uuid: string, region: string, system: string, startTime: Date, endTime: Date, factory?: string) {
    this.queryId = uuid;
    this.option = {
      'factory': factory || '',
      'region': region,
      'system': system,
      'startTime': startTime,
      'endTime': endTime
    };
  }
}

export class TimeseriesQuery {
  'queryId': string;
  'option': {
    'factory': string,
    'region': any,
    'system': string,
    'startTime': Date,
    'endTime': Date,
    'interval': string,
  };
  constructor(uuid: string, region: string, system: string, startTime: Date, endTime: Date, interval: string, factory?: string) {
    this.queryId = uuid;
    this.option = {
      'factory': factory || '',
      'region': region,
      'system': system,
      'startTime': startTime,
      'endTime': endTime,
      'interval': interval
    };
  }
}

export class SystemData {
  light: number;
  airCondition: number;
  lift: number;
  constructor(data) {
    this.light = data[0].values.lightEnergy;
    this.airCondition = data[0].values.airConditionEnergy;
    this.lift = data[0].values.liftEnergy;
  }
}

export class TimeseriesData {
  energy: any;
  constructor () {
    this.energy = [];
  }
}

export class TimeReportData {
  title: string;
  headers: Array<any>;
  datas: Array<any>;
  constructor (title: string) {
    this.title = title;
    this.headers = [];
    this.datas = [];
  }
}

export class SolidgaugeData {
  title: string;
  value: number;
  max: number;

  constructor(title: string, value: number, max: number) {
    this.title = title;
    this.value = value;
    this.max = max;
  }
}

export class DrilldownSeries {
  name: string;   // 自定义
  id: string;     // 可使用hierarchy中的value实现
  data: any;
  constructor(levelName: string, drilldownId: string, data: Array<any>) {
    this.name = levelName;
    this.id = drilldownId;
    this.data = data;
  }
}

export class DrilldownData {
  name: string;
  y: number;
  drilldown: string;

  constructor (name, value, drilldownId) {
    this.name = name;        // name 使用label值，drilldownId使用value值
    this.y = value;
    this.drilldown = drilldownId;
  }
}

