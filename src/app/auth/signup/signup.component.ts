import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;


  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password);
    
  }
  constructor(public authService: AuthService) {}

  ngOnInit() {
   this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
    AuthStatus => {
      this.isLoading = false;
    }
  );
    
    
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
