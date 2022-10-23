import { Component, Input, OnInit } from '@angular/core';
import { SymphonyFlyweight } from 'src/app/models/SymphonyFlyweight';

@Component({
  selector: 'app-symphony-view-node',
  templateUrl: './symphony-view-node.component.html',
  styleUrls: ['./symphony-view-node.component.less']
})
export class SymphonyViewNodeComponent implements OnInit {

  @Input() node! : SymphonyFlyweight;
  displayedColumns: string[] = ['ticker', 'name'];

  constructor() { }

  

  ngOnInit(): void {
  }

}
