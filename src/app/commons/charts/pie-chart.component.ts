import { Component, OnInit, Input} from '@angular/core';
import { pieOptions } from '../../model/option.model';

@Component({
  selector: 'pie-chart',
  template: `<div echarts [options]="option"  class="echartsStyle" ></div>`,
  preserveWhitespaces: false,
})
export class PieChartComponent implements OnInit {
  option: any;
  @Input() title: string;
  @Input() legend: any;
  @Input() name: any;
  @Input() radius: any;
  @Input() data: any;

  constructor() { }

  ngOnInit() {
    this.option = new pieOptions(this.title, this.legend, this.name, this.radius, this.data);
  }
}
