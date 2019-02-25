import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listRows: [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:8080/list').subscribe((data: any) => {
      console.log(data);
      this.listRows = data;
    });
  }

  trackByFn(index) {
    return index;
  }

  delete(row: any, index: number): void {
    this.http.post('http://localhost:8080/delete', row).subscribe((data: any) => {
      this.listRows.splice(index, 1);
    });
  }

}
