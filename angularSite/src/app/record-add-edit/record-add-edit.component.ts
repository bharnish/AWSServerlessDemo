import { Component, OnInit } from '@angular/core';
import { DbRecord } from '../api/models';
import { ValuesService } from '../api/services';

@Component({
  selector: 'app-record-add-edit',
  templateUrl: './record-add-edit.component.html',
  styleUrls: ['./record-add-edit.component.css']
})
export class RecordAddEditComponent implements OnInit {

  constructor(private svc: ValuesService) { }

  model: DbRecord = {};
  isSaving = false;

  ngOnInit(): void {
  }


  save() {
    this.isSaving = true;
    this.svc.postApiValues({value: this.model.value}).subscribe(x => {
      this.isSaving = false;
    });
  }

}
