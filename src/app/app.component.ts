import { Component } from '@angular/core';
import {ApiRelationService} from './api-relation.service'
import {NgForm} from '@angular/forms';

import * as ApiClasses from './api-classes';
import {Modal } from 'bootstrap'

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


    const element = document.getElementById('imageModal') as HTMLElement;
    const myModal = new Modal(element);
    myModal.show();
  }

  onSubmit(f: NgForm)
  {
    console.log(f.value);

    this.user.getData(f.value).subscribe((data: ApiClasses.PhotoResponseRoot) => {
      console.warn(data);
      this.photos = data.photos.photo;
    });

    /*this.user.getData().subscribe(data=>{
      console.warn(data)
    });*/
  }
}
