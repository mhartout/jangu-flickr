import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import * as ApiClasses from './api-classes';

@Injectable({
  providedIn: 'root'
})
export class ApiRelationService {

  constructor(private http:HttpClient) { }
  getData(searchData:any)
  {
    let url="https://www.flickr.com/services/rest/" +
    "?method=flickr.photos.search" +
    "&text=" + searchData.main_search +
    "&api_key=0308979bd90a1fab733dc79b9b447aa1" +
    "&format=json&nojsoncallback=?";

    return this.http.get<ApiClasses.PhotoResponseRoot>(url, {responseType: 'json'})
  }
}
