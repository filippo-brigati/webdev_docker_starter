import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

interface Brand {
  brand_id: number;
  brand_name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CMS';
  data: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Brand[]>('http://localhost:8080/brand').subscribe(
      (data) => {
        this.data = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit(f: NgForm) {
    if (f.valid === true) {
      this.http
        .post<Brand>('http://localhost:8080/brand', {
          brand_name: f.value.brand_name,
        })
        .subscribe(
          (data) => {
            this.data.push(data);
          },
          (err) => {
            console.log(err);
          }
        );
    }
    f.reset();
  }
}
