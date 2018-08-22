declare let Highcharts: any;

export class PieOptions {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false
  };
  title: {
    text: ''
  };
  tooltip: {
    headerFormat: '{series.name}<br>',
    pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
  };
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false
      },
      showInLegend: true
    }
  };
  series: [{
    type: 'pie',
    innerSize: '',
    name: '',
    data: null
  }];
  credits: {};

  constructor(title, name, radius, data) {
    this.chart = {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    };
    this.title = {
      text: title
    };
    this.tooltip = {
      headerFormat: '{series.name}<br>',
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    };
    this.plotOptions = {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    };
    this.series =  [{
      type: 'pie',
      innerSize: radius,
      name: name,
      data: data
    }];
    this.credits = {
      enabled: false
    };
  }
}

export class LineOptions {
  title: {
    text: ''
  };
  xAxis: {
    categories: '',
    crosshair: true
  };
  yAxis: {
    min: 0,
    title: {
      text: ''
    }
  };
  tooltip: {};
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
    }
  };
  series: null;
  credits: {};

  constructor(title, categories, name,  series) {
    this.title = {
      text: title
    };
    this.xAxis = {
      categories: categories,
      crosshair: true
    };
    this.yAxis = {
      min: 0,
      title: {
        text: name
      }
    };
    this.tooltip = {
      formatter: function () {
        return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + this.y;
      }
    };
    this.plotOptions = {
      series: {
        label: {
          connectorAllowed: false
        },
      }
    };
    this.series = series;
    this.credits = {
      enabled: false
    };
  }
}

export class StackColumnOption {
  chart: {
    type: 'column'
  };
  title: {
    text: '分系统能耗对比分析'
  };
  xAxis: {
    categories: ['1号楼', '2号楼', '3号楼', '4号楼', '5号楼']
  };
  yAxis: {
    min: 0,
    title: {
      text: '耗电量/kWh'
    }
  };
  tooltip: {
    formatter: any;
  };
  plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          color: any,
          style: {
            textShadow: '0 0 3px black'
          }
        }
      }
    };
  series: [
    {
      name: '照明系统',
      data: [500, 300, 445, 776, 245]
    }, {
      name: '空调系统',
      data: [278, 225, 342, 257, 156]
    }, {
      name: '电梯系统',
      data: [364, 475, 454, 213, 546]
    }
    ];
  credits: {};

  constructor(title, categories, series){
    this.chart = {
      type: 'column'
    };
    this.title = {
      text: title
    };
    this.xAxis = {
      categories: categories
    };
    this.yAxis = {
      min: 0,
      title: {
        text: '耗电量/kWh'
      }
    };
    this.tooltip = {
      formatter: function () {
        return '<b>' + this.x + '</b><br/>' +
          this.series.name + ': ' + this.y + '<br/>' +
          '总量: ' + this.point.stackTotal;
      }
    };
    this.plotOptions = {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
          style: {
            textShadow: '0 0 3px black'
          }
        }
      }
    };
    this.series = series;
    this.credits = {
      enabled: false
    };
  }
}

export class ColumnOption {
  chart: {
    type: 'column'
  };
  title: {
    text: ''
  };
  xAxis: {
    categories: null,
    crosshair: true
  };
  yAxis: {
    min: 0,
    title: {
      text: ''
    }
  };
  tooltip: {};
  plotOptions: {
    column: {
      borderWidth: 0
    }
  };
  series: [{
    name: '',
    data: null
  }];
  credits: {};

  constructor(title, categories, name, series) {
    this.chart = {
      type: 'column'
    };
    this.title = {
      text: title
    };
    this.xAxis = {
      categories: categories,
      crosshair: true
    };
    this.yAxis = {
      min: 0,
      title: {
        text: name
      }
    };
    this.tooltip = {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    };
    this.plotOptions = {
      column: {
        borderWidth: 0
      }
    };
    this.series = series;
    this.credits = {
      enabled: false
    };
  }
}

export class pieOptions{
  title: {
    text: null
  };
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  };
  legend: {
    orient: 'horizontal',
    left: '60%',
    data: null
  };
  series: [
    {
      name: null,
      type: 'pie',
      radius: null,
      innerRadius: '30%',
      center: ['50%', '60%'],
      data: null,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ];

  constructor(title, legend, name, radius, data) {
    this.title = {
      text: title
    };
    this.tooltip = {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    };
    this.legend = {
      orient: 'horizontal',
      left: '60%',
      data: legend
    };
    this.series =  [{
      name: name,
      type: 'pie',
      radius : radius,
      innerRadius: '30%',
      center: ['50%', '60%'],
      data: data,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }];
  }
}

/**
 * for system pie chart ---echarts
 */

export class SystemsPieChartOption {
  title: any;
  tooltip: any;
  legend: any;
  series: any;
  constructor (systemData) {
    this.title = {
      // text: '用电量各系统分布',
      x: 'center'
    };
    this.tooltip = {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    };
    this.legend = {
      orient: 'vertical',
      left: 'left',
      data: ['照明系统','电梯系统','空调系统']
    };
    this.series = [
      {
        name: '用电量',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          {value: systemData.light, name: '照明系统'},
          {value: systemData.airCondition, name: '空调系统'},
          {value: systemData.lift, name: '电梯系统'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ];
  }
}

/**
 * timeSeries line chart ---Hcharts
 */
export class TimeseriesLineChartOption {
  chart: any;
  title: any;
  xAxis: any;
  tooltip: any;
  yAxis: any;
  legend: any;
  plotOptions: any;
  series: any;
  credits: any;

  constructor (data) {
    this.chart = {
      zoomType: 'x'
    };
    this.title = {
      text: ''
    };
    this.tooltip = {
      dateTimeLabelFormats: {
        millisecond: '%H:%M:%S.%L',
        second: '%H:%M:%S',
        minute: '%Y-%m-%d %H:%M',
        hour: '%Y-%m-%d %H:%M',
        day: '%Y-%m-%d',
        week: '%Y-%m-%d',
        month: '%Y-%m',
        year: '%Y'
      }
    };
    this.xAxis = {
      type: 'datetime',
      dateTimeLabelFormats: {
        millisecond: '%H:%M:%S.%L',
        second: '%H:%M:%S',
        minute: '%H:%M',
        hour: '%H:%M',
        day: '%m-%d',
        week: '%m-%d',
        month: '%Y-%m',
        year: '%Y'
      }
    };
    this.yAxis = {
      title: {
        text: '能耗 /kWh'
      }
    };
    this.legend = {
      enabled: false
    };
    this.plotOptions = {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    };
    this.series = [{
      type: 'area',
      name: '能耗',
      data: data
    }];
    this.credits = { enabled: false };
  }
}

/**
 * solidGauge chart ---Hcharts
 */
export class SolidGaugeChartOption {
  chart: any;
  pane: any;
  tooltip: any;
  yAxis: any;
  plotOptions: any;
  title: any;
  credits: any;
  series: any;
  constructor(value, max, title) {
      this.chart = {
        type: 'solidgauge'
      };
      this.pane = {
        center: ['50%', '85%'],
          size: '140%',
          startAngle: -90,
          endAngle: 90,
          background: {
          backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
      };
      this.tooltip = {
        enabled: false
      };
      this.yAxis = {
        min: 0,
        max: max,
        stops: [
          [0.1, '#55BF3B'],
          [0.5, '#DDDF0D'],
          [0.9, '#DF5353']
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickPixelInterval: 400,
        tickWidth: 0,
        title: {
          y: -70
        },
        labels: {
          y: 16
        }
      };
      this.plotOptions = {
        solidgauge: {
          dataLabels: {
            y: 5,
              borderWidth: 0,
              useHTML: true
          }
        }
      };
      this.title = {
        text: title,
          margin: 10,
          style: {
          fontSize: '14px'
        }
      };
      this.credits = {
        enabled: false
      };
      this.series = [{
        name: '',
        data: [value],
        dataLabels: {
          format: '<div style="text-align:center"><span style="font-size:20px;color:' +
          ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
          '<span style="font-size:12px;color:silver">kWh</span></div>'
        },
        tooltip: {
          valueSuffix: ' kWh'
        }
      }];
  }
}

/**
 * drilldown chart --- Hcharts
 */
export class DrilldownChartOption {
  chart: any;
  title: any;
  tooltip: any;
  xAxis: any;
  yAxis: any;
  legend: any;
  credits: any;
  plotOptions: any;
  series: Array<any>;
  drilldown: any;

  constructor(rootData: any, drilldownSeries: any, chartType) {
   this.chart = {
      type: chartType
    };
    this.title = {
      text: '区域耗电概览'
    };
    this.tooltip = {
      valueSuffix: ' kWh'
    };
    this.xAxis = {
      type: 'category'
    };
    this.yAxis = {
      title: {
        text: '耗电量 (kWh)'
      },
    };
    this.legend = {
      enabled: false
    };
    this.credits = {
      enabled: false
    };
    this.plotOptions = {
      series: {
        borderWidth: 0,
          dataLabels: {
          enabled: true
        }
      }
    };
    this.series = [{
      name: '区耗电',
      colorByPoint: true,
      data: rootData
    }];
    this.drilldown = {
      series: drilldownSeries
    };
  }
}
