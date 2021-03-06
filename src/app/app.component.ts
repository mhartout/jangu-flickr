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

  selected_photo_url?: string = undefined;

  selected_photo?: ApiClasses.Photo = undefined;
  selected_photo_details? : ApiClasses.PhotoDetailed = undefined;
  selected_photo_comments? : ApiClasses.Comment[] = undefined;

  errorMessage: string = "";
  errorMessageFooter: string = "";

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
        
        this.selected_photo_details = data.photo;
        if(this.selected_photo_details.owner.path_alias == null)
        {
          this.selected_photo_details.owner.path_alias = this.selected_photo_details.owner.nsid;
        }

        this.selected_photo_details.dates.posted_str = new Date(parseInt(this.selected_photo_details.dates.posted) * 1000).toLocaleDateString("fr-FR");
        this.selected_photo_details.description._content = unescape(this.selected_photo_details.description._content);
        this.selected_photo_url = "https://www.flickr.com/photos/" + this.selected_photo_details.owner.path_alias +
    "/" + data.photo.id + "/";
      }
    });

    this.user.getComments(this.selected_photo.id).subscribe((data: ApiClasses.CommentResponseRoot) =>
    {
      if (data.comments.photo_id == this.selected_photo?.id)
      {
        this.selected_photo_comments = data.comments.comment;

      }
    });

    const element = document.getElementById('imageModal') as HTMLElement;
    const myModal = new Modal(element);
    myModal.show();
  }

  parseDate(f: string)
  {
    return (new Date(parseInt(f) * 1000).toLocaleDateString("fr-FR"));
  }

  openErrorMessage(msg?: string)
  {
    this.errorMessageFooter = "";
    if (msg == undefined)
    {
      this.errorMessage = "Erreur cot?? API.";
    }
    else
    {
      this.errorMessage = msg;

      if (msg.startsWith("Invalid API Key"))
      {
        this.errorMessageFooter = "Il semblerait que cette erreur soit li??e ?? une mauvaise cl?? d'API."+
        " Les cl??s Flickr personnelles expirent malheureusement rapidement, merci d'en entrer une nouvelle dans src/app/api-relation.service.ts";
      }

    }

    const element = document.getElementById('errorModal') as HTMLElement;
    const myModal = new Modal(element);
    myModal.show();
  }

  onSubmit(f: NgForm)
  {
    this.user.getSearch(f.value).subscribe((data: ApiClasses.PhotoResponseRoot) =>
    {
      if (data.stat == "fail")
      {
        this.openErrorMessage(data.message);
      }
      else
      {
        this.photos = data.photos.photo;
      }
      
    });

  }
}
