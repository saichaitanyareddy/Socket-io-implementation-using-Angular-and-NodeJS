import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  display:string;
  msg : string;

  constructor(private _dataService : DataService) {}

  ngOnInit() {
    this._dataService
        .getMessage()
        .subscribe(msg => {
         //this.msg = "Notification:"+msg;
          alert("Notification: "+msg);
        });
  }

  sendMsg(msg){
     this._dataService.sendMessage(msg);
  }
  postData(msg){
    console.log(msg);
    this._dataService.sendData().subscribe((res:any)=>{
      console.log(res);
    });
    this._dataService.sendMessage(msg);
  }
}
