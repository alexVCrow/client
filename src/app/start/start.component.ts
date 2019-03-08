import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GameStartResponseDto} from '../interface/GameStartResponseDto';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  formPlayerNumber: FormGroup;
  start: GameStartResponseDto;
  gameStart: boolean;
  formResultNumber: FormGroup;
  massVar: object[];
  constructor(private http: HttpClient,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.formPlayerNumber = this.fb.group({
      number: [null, Validators.required]
    });
    this.formResultNumber = this.fb.group({
      col: [null, Validators.required],
      state: [null, Validators.required]
    });
    this.gameStart = false;
    this.massVar = [];
    // this.http.post('http://localhost:8080/steps', {refGame: 'ssdfsdfsdf', numberGamer: '1234', countMatches: '3', countNumber: '2'})
    //   .subscribe((data: any) => { console.log(data); });
  }

  onSubmit() {
    this.http.get('http://localhost:8080/start')
    .subscribe((data: GameStartResponseDto) => {
      console.log(data);
      this.start = data;
      this.massVar.push( {id: this.start.number} );
      this.gameStart = true;
    });
  }
  onCheckNumber() {
    const { col, state } = this.formResultNumber.value;
    const request = {useNumber: this.start.useNum, gamesSteps: {refGame: this.start.uuid, numberGamer: this.start.number, qty: col, matCol: state}};
    this.http.post('http://localhost:8080/games/steps1', request)
      .subscribe((data: GameStartResponseDto) => {
        this.start = data;
        this.massVar.unshift( {id: this.start.number} );
        this.formResultNumber.reset();
      });
  }

}
