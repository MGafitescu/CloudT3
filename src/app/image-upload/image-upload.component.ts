import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  imagePath: string;
  imageUrl: any;
  message: string;
  image: string;
  loading = false;
  result: any;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
  }

  preview(file) {
    if (file.files.length === 0) {
      return;
    }

    let mimeType = file.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported";
      return;
    }

    let fileReader = new FileReader();
    this.imagePath = <string>file.files[0].name;
    console.log(this.imagePath);
    fileReader.readAsDataURL(file.files[0]);
    fileReader.onload = () => {
      this.imageUrl = fileReader.result;
    }
    fileReader.onloadend = () => {
      this.image = <string>fileReader.result;
      let reg = new RegExp("^data:image\/[a-zA-Z]+;base64,");
      this.image = this.image.replace(reg,"");
      //console.log(this.image);
    }
  }

  async upload() {
    this.loading = true;
    const info = await this.imageService.postImage({filename: this.imagePath, file: this.image});
    this.result = info;
    console.log(info);
  }

}
