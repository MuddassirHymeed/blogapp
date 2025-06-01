import { Component } from '@angular/core';

interface SocialMedia {
  facebook : string,
  instagram : string,
  x : string,
  linkedin : string
}

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  public SocialmediaUrl : SocialMedia = { 
    facebook : "assets/media-icons/facebook.png",
    instagram : "assets/media-icons/insta.png",
    x : "assets/media-icons/x.png",
    linkedin : "assets/media-icons/linkedin.png"
  }
}
