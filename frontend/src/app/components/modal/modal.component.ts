import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import {
  ModalDismissReasons,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';

interface Brand {
  brand_id: number;
  brand_name: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() title!: string;

  @Output() response: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal, public http: HttpClient) {}

  onSubmit(f: NgForm) {
    if (f.valid === true) {
      this.response.emit(f.value.brand_name.toString());
    } else {
      //f.invalid = true;
    }
    f.reset();
  }
}
