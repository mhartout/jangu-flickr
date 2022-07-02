import { Component } from '@angular/core';
import {ApiRelationService} from './api-relation.service'
import {NgForm} from '@angular/forms';

import * as ApiClasses from './api-classes';
import {Modal } from 'bootstrap'
import {escape, unescape} from 'html-escaper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'electif-project';

  search_terms: string = "";
  photos: ApiClasses.Photo[] = [];

  modal_image_url: string = "";

  selected_photo?: ApiClasses.Photo = undefined;
  selected_photo_details? : ApiClasses.PhotoDetailed = undefined;

  constructor(private user:ApiRelationService)
  {

  }

  getImageLink(imgData: ApiClasses.Photo)
  {
    return "https://live.staticflickr.com/"
    + imgData.server + "/" + imgData.id + "_" + imgData.secret + "_w.jpg";
  }

  getFullImageLink(imgData?: ApiClasses.Photo)
  {
    if (imgData == undefined) {
      return "";
    }
    else
    {
      return "https://live.staticflickr.com/"
      + imgData.server + "/" + imgData.id + "_" + imgData.secret + "_b.jpg";
    }
  }

  openImageModal(imgData: ApiClasses.Photo)
  {
    this.modal_image_url = "";
    this.selected_photo = imgData;
    this.modal_image_url = this.getFullImageLink(this.selected_photo);

    this.user.getImageInfo(this.selected_photo.id, this.selected_photo.secret)
      .subscribe((data: ApiClasses.InfoResponseRoot) =>
    {
      if (data.photo.id == this.selected_photo?.id)
      {
        console.log(data.photo);
        this.selected_photo_details = data.photo;
        this.selected_photo_details.dates.posted_str = new Date(parseInt(this.selected_photo_details.dates.posted) * 1000).toLocaleDateString("fr-FR");
        this.selected_photo_details.description._content = unescape(this.selected_photo_details.description._content);
      }
    });

    const element = document.getElementById('imageModal') as HTMLElement;
    const myModal = new Modal(element);
    myModal.show();
  }

  onSubmit(f: NgForm)
  {
    console.log(f.value);

    this.user.getSearch(f.value).subscribe((data: ApiClasses.PhotoResponseRoot) =>
    {
      this.photos = data.photos.photo;
    });

  }
}
