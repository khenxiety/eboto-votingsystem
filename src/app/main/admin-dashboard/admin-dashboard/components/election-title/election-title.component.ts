import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-election-title',
  templateUrl: './election-title.component.html',
  styleUrls: ['./election-title.component.scss'],
})
export class ElectionTitleComponent implements OnInit {
  openEditPanel: boolean = false;
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}

  openEditModal() {
    this.openEditPanel = true;
  }
  closeEditModal() {
    this.openEditPanel = false;
  }

  onSave() {
    this.toastr.success('Success', 'title updated');
  }
}
