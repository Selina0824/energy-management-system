import { Component, OnInit, Input } from '@angular/core';
import { CardData } from '../../model/card-data.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() inputData: CardData;
  @Input() bgColor: string;

  constructor() { }

  ngOnInit() {
  }

}
