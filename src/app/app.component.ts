import { Component } from '@angular/core';
import {ApiRelationService} from './api-relation.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'electif-project';
  constructor(private user:ApiRelationService) {
    this.user.getData().subscribe(data=>{
      console.warn(data)
    })
  }
  search()
  {
  }
}
