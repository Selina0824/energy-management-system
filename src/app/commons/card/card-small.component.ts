import { Component, OnInit, Input } from '@angular/core';
import { CardData } from '../../model/card-data.model';

@Component({
  selector: 'app-card-small',
  templateUrl: './card-small.component.html',
  styleUrls: ['./card-small.component.scss']
})
export class CardSmallComponent implements OnInit {
  @Input() inputData: CardData;
  @Input() bgColor: string;

  constructor() { }

  ngOnInit() {
  }

}
