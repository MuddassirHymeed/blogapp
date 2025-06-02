import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule} from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive,CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  public menuIconUrl : string = 'assets/icons/menu.png'
}
