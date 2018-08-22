import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'echarts-system-brief',
  template: `<div echarts [options]="option"  class="echartsStyle" ></div>`,
  preserveWhitespaces: false,
})
export class EchartsSystemBriefComponent implements OnInit {
  @Input() inputData: any;
  option: any;

  constructor() { }

  ngOnInit() {

    this.option = {
      title : {
        text: '近日用电量各系统分布',
        x: 'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['照明系统', '空调系统', '电梯系统']
      },
      series : [
        {
          name: '用电量',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data: [
            {value: 335, name: '照明系统'},
            {value: 310, name: '空调系统'},
            {value: 234, name: '电梯系统'},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
}
