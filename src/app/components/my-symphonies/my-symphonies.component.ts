import { Component, OnInit } from '@angular/core';
import { from, timer, zip } from 'rxjs';
import { SymphonyFlyweight } from 'src/app/models/SymphonyFlyweight';
import { FirestoreService } from 'src/app/services/firestore.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-my-symphonies',
  templateUrl: './my-symphonies.component.html',
  styleUrls: ['./my-symphonies.component.less']
})
export class MySymphoniesComponent implements OnInit {

  constructor(private storageService : StorageService, private firestoreService : FirestoreService) { }

  nodes : SymphonyFlyweight[] = [];
  timedOut : boolean = false;
  newSymphonyUrl : string = '';
  assetFilter : string = '';

  private sleepRand = async () => new Promise((r) => setTimeout(r, 
    ((Math.random() * 5) + 5) * 1000   //between 5 and 10 seconds
    ));


  async ngOnInit(): Promise<void> {
    this.nodes = await this.storageService.getSymphonies();
  }

  earliestSyncDate() : Date {
    if(!this.nodes.length) return new Date();
    return this.nodes.map(x => x.CacheOn).filter(x => !!x).sort((a, b) => {
        if(!(a && b)) return 0;
        return a.getTime() - b.getTime();
    })[0] || new Date();
  }

  private sortNodes(){
    this.nodes.sort((a, b) => a.Name.localeCompare(b.Name));
  }

  async addSymphony() {
    if(this.timedOut) return;
    this.timedOut = true;
    let id = /\/symphony\/([^\/]+)/.exec(this.newSymphonyUrl)?.[1] || '';
    try {
      await this.loadSymphony(id);
    } catch(e) {
      alert("Make sure you've pasted a valid url!")
    } finally {
      await this.sleepRand();
      this.timedOut = false;
    }
  }

  private async loadSymphony(id : string){
    let newNode = await this.firestoreService.getSymphony(id, true);
    if(newNode.Id){
      this.nodes = this.nodes.filter(x => x.Id != newNode.Id);  //remove node if it exists
      this.nodes.push(newNode);
      this.sortNodes();
      this.newSymphonyUrl = '';
      newNode.CacheOn = new Date();
      await this.saveSymphonies();
    }
  }

  refreshAll(){
    let that = this;
    this.timedOut = true;
    zip(
      from(this.nodes),
      timer(0, 5 * 1000),  //throttle these to every 5s to be nice
      (x, i) => x
    ).subscribe({
      next: function(node){
        that.loadSymphony(node.Id);
      },
      complete : async function(){
        that.saveSymphonies();
        await that.sleepRand();
        that.timedOut = false;
      },
      error : function(){
        alert('An error occured while refreshing data.');
        that.timedOut = false;
      }
    })
  }

  async saveSymphonies(){
    await this.storageService.saveSymphonies(this.nodes);
  }

  async onSymphonyDelete(id : string){
    this.nodes = this.nodes.filter(x => x.Id != id);
    await this.saveSymphonies();
  }

}
