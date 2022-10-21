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
  newSymphonyUrl? :string;

  constructor(private _firestoreService : FirestoreService) {
    this.firestoreService = _firestoreService;
  }

  async setHead(url : string){
    let id = /\/symphony\/([^\/]+)/.exec(url)?.[1] || '';
    try {
      this.head = await this.firestoreService.getSymphony(id);

    }catch(err){
      if(!err){
        alert("Make sure you've pasted a valid url!")
      }
    }
  }

  async ngOnInit(): Promise<void> {
    this.newSymphonyUrl = 'https://app.composer.trade/symphony/IedK6qi6hTO8ltCMhwH0/details'
  }

  async getParent(){
    if(this?.head?.ParentId && !this?.head?.Parent){
      let res = await this.firestoreService.getSymphony(this.head.ParentId);
      if(res){
        if(this.head){
          this.head.Parent = res;
          res.Children = res.Children || [];
          res.Children.push(this.head);
        }
        this.head = res;
        console.log(this.head);
      }
    }
  }

}
