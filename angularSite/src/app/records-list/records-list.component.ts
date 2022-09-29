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

  load() { 
    this.isLoading = true;
    this.svc.getApiValues().subscribe(x => {
      this.records = x;
      this.isLoading = false;
    });
  }

  delete(rec: DbRecord) {
    this.svc.deleteApiValuesId(rec.id??'').subscribe(_ => this.load());
  }
}
