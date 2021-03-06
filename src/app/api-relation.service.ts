import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import * as ApiClasses from './api-classes';

@Injectable({
  providedIn: 'root'
})
export class ApiRelationService {

  // Enter a Flickr api key here.
  private apiKey : string = "85125060cbbe43e4560ad0925a509854";




  constructor(private http:HttpClient) { }

  getSearch(searchData:any)
  {
    let url="https://www.flickr.com/services/rest/" +
    "?method=flickr.photos.search&safe_search=1" +
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
//path_alias
    console.warn(searchData);

    url += "&api_key=" + this.apiKey +
    "&format=json&nojsoncallback=?";

    return this.http.get<ApiClasses.PhotoResponseRoot>(url, {responseType: 'json'})
  }

  getImageInfo(photo_id:any, photo_secret:any)
  {
    let url="https://www.flickr.com/services/rest/" +
    "?method=flickr.photos.getInfo" +
    "&photo_id=" + photo_id +
    "&secret=" + photo_secret +
    "&api_key=" + this.apiKey +
    "&format=json&nojsoncallback=?";

    return this.http.get<ApiClasses.InfoResponseRoot>(url, {responseType: 'json'})
  }

  getComments(photo_id:any)
  {
    let url="https://www.flickr.com/services/rest/" +
    "?method=flickr.photos.comments.getList" +
    "&photo_id=" + photo_id +
    "&api_key=" + this.apiKey +
    "&format=json&nojsoncallback=?";

    return this.http.get<ApiClasses.CommentResponseRoot>(url, {responseType: 'json'})
  }
}
