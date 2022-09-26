import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
declare var UIkit: any;
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({});

  constructor(private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
  }

  errorToast(message: any) {
    this.toastr.error('Hello world!', 'Toastr fun!');
  }

  onSubmit() {
    if (this.loginForm.value.votersId === 'voter') {
      this.toastr.success('Hello Voter!', 'Toastr fun!');
      this.router.navigate(['voting-system']);
    } else if (this.loginForm.value.votersId === 'admin') {
      this.toastr.success('Hello Admin!', 'Toastr fun!');
      this.router.navigate(['admin-dashboard']);
    }

    // UIkit.notification({
    //   message:
    //     "<span uk-icon='icon: check'></span> <span style='color:teal;'>Message with an icon</span> ",
    // });
  }

  buildForm() {
    this.loginForm = new FormGroup({
      password: new FormControl(''),
      votersId: new FormControl(''),
    });
  }

  showPassword(password: any) {
    password.type = password.type === 'password' ? 'text' : 'password';
  }
}
