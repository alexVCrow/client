import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  findForm: FormGroup;

  constructor(private http: HttpClient,private fb: FormBuilder) { }

  ngOnInit() {
    this.findForm = this.fb.group({
      client: [null, Validators.required]
    });
  }

  onSubmit(){}

}
