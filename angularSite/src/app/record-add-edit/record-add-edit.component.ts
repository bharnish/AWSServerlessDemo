import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbRecord } from '../api/models';
import { ValuesService } from '../api/services';

@Component({
  selector: 'app-record-add-edit',
  templateUrl: './record-add-edit.component.html',
  styleUrls: ['./record-add-edit.component.css']
})
export class RecordAddEditComponent implements OnInit {

  constructor(private svc: ValuesService, private routed: ActivatedRoute) { }

  model: DbRecord = {};
  isSaving = false;
  isAdd = false;
  id = '';
  added = '';

  ngOnInit(): void {
    this.routed.paramMap.subscribe(p => {
      this.id = p.get('id')??'';

      this.isAdd = this.id == '';

      this.load();

    })
  }

  load() {
    if (this.isAdd) return;
    this.svc.getApiValuesId(this.id).subscribe(x => {
      this.model = x;
    });
  }

  save() {
    this.isSaving = true;
    this.added = '';
    if (this.isAdd) {

      this.svc.postApiValues(this.model).subscribe(x => {
        this.isSaving = false;
        this.added = x;
        this.model = { };
      });
    } else {
      this.svc.putApiValuesId({id: this.id, body: this.model}).subscribe(_ => {
        this.isSaving = false;
      });
    }
  }

}
