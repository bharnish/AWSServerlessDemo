import { Component, OnInit } from '@angular/core';
import { DbRecord } from '../api/models';
import { ValuesService } from '../api/services';

@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.css']
})
export class RecordsListComponent implements OnInit {

  constructor(private svc: ValuesService) { }

  ngOnInit(): void {
    this.load();
  }

  records: DbRecord[] = [];
  isLoading = false;
  quickAddText = '';
  isError = false;
  isAdding = false;
  isEdit: boolean[] = [];

  load() { 
    this.quickAddText = '';
    this.isLoading = true;
    this.isError = false;
    this.svc.getApiValues().subscribe(x => {
      this.records = x;
      this.isEdit = x.map(_ => false);
      this.isLoading = false;
    }, err => {
      this.isError = true;
      this.isLoading = false;
    });
  }

  delete(rec: DbRecord) {
    this.svc.deleteApiValuesId(rec.id??'').subscribe(_ => this.load());
  }

  quickAdd() { 
    this.isAdding = true;
    this.svc.postApiValues({value: this.quickAddText}).subscribe(_ => {
      this.load();
      this.isAdding = false;
    });
  }

  update(rec: DbRecord) {
    this.svc.putApiValuesId({id: rec.id??'', body: rec}).subscribe(_ => this.load());
  }
}
