import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SymphonyFlyweight } from "../../models/SymphonyFlyweight"

@Component({
  selector: 'app-symphony-view',
  templateUrl: './symphony-view.component.html',
  styleUrls: ['./symphony-view.component.less']
})
export class SymphonyViewComponent implements OnInit {

  head?: SymphonyFlyweight;
  firestoreService : FirestoreService;

  constructor(private _firestoreService : FirestoreService) {
    this.firestoreService = _firestoreService;
  }


  async ngOnInit(): Promise<void> {
    this.head = await this.firestoreService.getSymphony('IedK6qi6hTO8ltCMhwH0')
  }

  async getParent(){
    if(this?.head?.ParentId){
      var res = await this.firestoreService.getSymphony(this.head.ParentId);
      if(res){
        if(this.head){
          this.head.Parent = res;
          res.Children = res.Children || [];
          res.Children.push(this.head);
        }
        this.head = res;
      }
    }
  }

}
