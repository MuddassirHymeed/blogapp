import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup,signOut,User} from '@angular/fire/auth';
import { Firestore, doc, setDoc, serverTimestamp} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthService {

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private router = inject(Router);

  user$ = new ReplaySubject<User | null>(1);

  constructor() {
    this.auth.onAuthStateChanged(async (user) => {
      this.user$.next(user);
      if (user) {
        await this.updateUserData(user);
        if (this.router.url === '/login') {
          this.router.navigate(['/dashboard']);
        }
      }
    });
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(this.auth, provider);
      console.log('user Login ID =>', result.user.uid);
    } catch (err: any) {
      console.error('Login error:', err);
      throw err;
    }
  }

  private async updateUserData(user: User) {
    const userRef = doc(this.firestore, `users/${user.uid}`);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastLogin: serverTimestamp()
    }, { merge: true });
  }

  async logout() {
    await signOut(this.auth);
    this.user$.next(null);
    this.router.navigate(['/login']);
  }
}
