import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-parents-table',
  templateUrl: './parents-table.component.html',
  styleUrls: ['./parents-table.component.css']
})
export class ParentsTableComponent implements OnInit {
  parents: any = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllParents().subscribe((response) => {
      console.log("her students :",response.parents);
      this.parents = response.parents;
    });
  }

}
