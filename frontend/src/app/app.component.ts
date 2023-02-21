import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';

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
  editItem: any;

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit() {
    this.http.get<Brand[]>('http://localhost:8080/brand').subscribe(
      (data) => {
        this.data = data;
        this.data.sort(function (a: Brand, b: Brand) { return a.brand_id - b.brand_id });
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

  delete(id: number) {
    this.http
      .delete('http://localhost:8080/brand', {
        body: {
          brand_id: id,
        },
      })
      .subscribe((data: any) => {
        data.message === true
          ? (this.data = this.data.filter((d: any) => d.brand_id !== id))
          : (this.data = this.data);
      });
  }

  changeEditState(item: Brand) {
    this.editItem = item;

    const modalRef = this.modalService.open(ModalComponent, {
      scrollable: false,
      size: 'lg',
      windowClass: 'modal-fullscreen-lg',
      centered: false,
      backdrop: 'static',
    });

    modalRef.componentInstance.title = this.editItem.brand_name;

    console.log(this.editItem);

    modalRef.componentInstance.response.subscribe((data: any) => {
      const brand_id = this.editItem.brand_id;
      const brand_name = data.toString();

      console.log(brand_id + ' ' + brand_name);

      this.http
        .put<Brand>('http://localhost:8080/brand', {
          brand_id: brand_id,
          brand_name: brand_name,
        })
        .subscribe(
          (data: any) => {
            this.data = this.data.filter(
              (d: Brand) => d.brand_id !== this.editItem.brand_id
            );
            this.data.push(data);
            this.data.sort(function (a: Brand, b: Brand) { return a.brand_id - b.brand_id });
            this.modalService.dismissAll();
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }
}
