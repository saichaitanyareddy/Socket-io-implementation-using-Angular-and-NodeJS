import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  res;
  constructor(private _data:DataService) { }

  ngOnInit() {
    this._data.getData().subscribe((result)=>{
      this.res=result;
      console.log(this.res);
    },
    (err)=>{console.log(err)})
  }

}
