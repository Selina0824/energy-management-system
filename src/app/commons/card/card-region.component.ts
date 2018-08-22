import { Component, OnInit, Input } from '@angular/core';
import { ChildRegionCard } from '../../model/card-data.model';

@Component({
  selector: 'app-card-region',
  templateUrl: './card-region.component.html',
  styleUrls: ['./card-region.component.scss']
})
export class CardRegionComponent implements OnInit {
  @Input() inputData: ChildRegionCard;

  constructor() { }

  ngOnInit() {
  }
}
