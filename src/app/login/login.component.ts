import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isBlackList: boolean;
  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.http.post('http://localhost:8080/login', this.loginForm.value).subscribe((data: any) => {
      data.result ? this.isBlackList = true : this.router.navigateByUrl('/list');
    });
  }

}
