import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.css']
})
export class SingleNewsComponent implements OnInit {
@Input() newsInfo : any ;
  constructor() { }

  ngOnInit() {
  }

}
