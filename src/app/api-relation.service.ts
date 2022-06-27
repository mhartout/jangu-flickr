import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiRelationService {

  constructor(private http:HttpClient) { }
  getData()
  {
    let url="https://www.flickr.com/services/api/"
    return this.http.get(url)
  }
}
