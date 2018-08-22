import { Component, OnInit, Input } from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() bgColor: string;
  @Input() inputData: any;

  constructor() { }

  ngOnInit() {
    const _this = this;
    $("#btn").click(function(){
      $(".table2excel").table2excel({
          exclude: ".noExl",
          name: "Excel Document Name",
          filename: _this.inputData.title,
          exclude_img: true,
          exclude_links: true,
          exclude_inputs: true
      });
  });
  }
}
