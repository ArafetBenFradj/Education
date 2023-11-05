import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
 @Input() descriptionBanner : string;
 @Input() descriptionBannerSecondary : string;
 @Input() descriptionText : string;
  constructor() { }

  ngOnInit() {
  }

}
