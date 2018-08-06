import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public base64Image: string;

  constructor(public navCtrl: NavController,
  	private camera: Camera,
  	private toastCtrl: ToastController) {

  }

  takePicture(){
    console.log("coming here");

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 450,
      targetHeight: 450,
      correctOrientation: true,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
      },
      err => {
        console.log(err);
        let toast = this.toastCtrl.create({
		    message: err,
		    duration: 3000,
		    position: 'top'
		  });
        toast.present();
      }
    );
  }

  openGallery() {
  	const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      // Handle error
    });
  }

}
