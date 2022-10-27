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
  timedOut : boolean = false;

  private sleepRand = async () => new Promise((r) => setTimeout(r, 
    ((Math.random() * 5) + 5) * 1000   //between 5 and 10 seconds
    ));

  constructor(private _firestoreService : FirestoreService) {
    this.firestoreService = _firestoreService;
  }

  async setHead(url : string){
    if(this.timedOut) return;
    this.timedOut = true;
    this.head = undefined;
    let id = /\/symphony\/([^\/]+)/.exec(url)?.[1] || '';
    try {
      this.head = await this.firestoreService.getSymphony(id, true);
     
    }catch(err){
      if(!err){
        alert("Make sure you've pasted a valid url!")
      }
      
    } finally {
      await this.sleepRand();
      this.timedOut = false;
    }
  }

  async ngOnInit(): Promise<void> {
    this.newSymphonyUrl = 'https://app.composer.trade/symphony/IedK6qi6hTO8ltCMhwH0/details'
  }

  async getParent(){
    if(this?.head?.ParentId && !this?.head?.Parent){
      this.timedOut = true;
      try{
        let res = await this.firestoreService.getSymphony(this.head.ParentId, true); //automatically lookup assets here.
        if(res){
          if(this.head){
            this.head.Parent = res;
            res.Children = res.Children || [];
            res.Children.push(this.head);
          }
          this.head = res;
          //console.log(this.head);
        }
      }
      finally{
        await this.sleepRand();
        this.timedOut = false;
      }
    }
  }

}
