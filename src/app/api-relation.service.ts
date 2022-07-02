import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import * as ApiClasses from './api-classes';

@Injectable({
  providedIn: 'root'
})
export class ApiRelationService {

  constructor(private http:HttpClient) { }

  getSearch(searchData:any)
  {
    


    let url="https://www.flickr.com/services/rest/" +
    "?method=flickr.photos.search" +
    "&text=" + searchData.main_search + 
    "&sort=" + searchData.sort_type;
    
    if (searchData.tags != "")
    {
      let tags = searchData.tags.split(/[;, ]+/).join(",");
      url += ("&tags=" + tags);

      if (searchData.tags_require_all)
      {
        url += "&tag_mode=all";
      }
    }

    if (searchData.after_date != "")
    {
      url += "&min_upload_date=" + String(new Date(searchData.after_date).getTime() / 1000);
    }
    if (searchData.before_date != "")
    {
      url += "&max_upload_date=" + String(new Date(searchData.before_date).getTime() / 1000);
    }

    console.warn(searchData);

    url += "&api_key=0308979bd90a1fab733dc79b9b447aa1" +
    "&format=json&nojsoncallback=?";

    return this.http.get<ApiClasses.PhotoResponseRoot>(url, {responseType: 'json'})
  }

  getImageInfo(photo_id:any, photo_secret:any)
  {
    let url="https://www.flickr.com/services/rest/" +
    "?method=flickr.photos.getInfo" +
    "&photo_id=" + photo_id +
    "&secret=" + photo_secret +
    "&api_key=0308979bd90a1fab733dc79b9b447aa1" +
    "&format=json&nojsoncallback=?";

    return this.http.get<ApiClasses.InfoResponseRoot>(url, {responseType: 'json'})
  }

  getComments(photo_id:any)
  {
    let url="https://www.flickr.com/services/rest/" +
    "?method=flickr.photos.comments.getList" +
    "&photo_id=" + photo_id +
    "&api_key=0308979bd90a1fab733dc79b9b447aa1" +
    "&format=json&nojsoncallback=?";

    return this.http.get<ApiClasses.CommentResponseRoot>(url, {responseType: 'json'})
  }
}
