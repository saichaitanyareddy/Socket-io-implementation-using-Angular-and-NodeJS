import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'; 
import { Socket } from 'ng-socket-io';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http:HttpClient,private socket:Socket) { }
  getMessage() {
    return this.socket
        .fromEvent<any>("msg")
        .map(data => data.msg);
}

sendMessage(msg: string) {
    this.socket
        .emit("msg", msg);
}
  getData(){
    return this._http.get('http://localhost:3000/movies');
  }
  sendData(){
    return this._http.get('http://localhost:3000/movies');
  }
}
