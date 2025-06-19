import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { User } from 'firebase/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-dashboard',
  standalone : true,
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  private firestore: Firestore = inject(Firestore);
  user: User | null = null;
  lastLogin: Date | null = null;
  
  postStats = {
    total: 0,
    published: 0,
    drafts: 0
  };

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.authService.user$.subscribe(async (user) => {
      this.user = user;
      if (user) {
        this.lastLogin = await this.getLastLogin(user.uid);
        await this.loadPostStats();
      }
    });
  }

  private async getLastLogin(uid: string): Promise<Date | null> {
    const docSnap = await getDoc(doc(this.firestore, 'users', uid));
    return docSnap.exists() ? docSnap.data()['lastLogin']?.toDate() : null;
  }

  private async loadPostStats() {}

  logout() {
    this.authService.logout();
  }
}
