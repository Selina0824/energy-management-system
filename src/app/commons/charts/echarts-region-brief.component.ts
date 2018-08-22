import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'echarts-region-brief',
  template: `<div echarts [options]="option"  class="echartsStyle" ></div>`,
  preserveWhitespaces: false,
})
export class EchartsRegionBriefComponent implements OnInit {
  option = {
    color: ['#3398DB'],
    tooltip : {
      trigger: 'axis',
      axisPointer : {
        type : 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        data : ['1号楼', '2号楼', '3号楼', '4号楼', '5号楼', '6号楼', '7号楼', '8号楼', '9号楼', '10号楼'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name: '耗电量',
        type: 'bar',
        barWidth: '60%',
        data: [210, 52, 200, 334, 390, 330, 220 , 320, 254, 145]
      }
    ]
  };
  ngOnInit() {}
}
