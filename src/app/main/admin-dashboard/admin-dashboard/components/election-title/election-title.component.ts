import { Component, OnInit } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
@Component({
  selector: 'app-election-title',
  templateUrl: './election-title.component.html',
  styleUrls: ['./election-title.component.scss'],
})
export class ElectionTitleComponent implements OnInit {
  openEditPanel: boolean = false;

  title: any = [];

  titleChange: any;
  isLoading: boolean = false;

  constructor(private toastr: ToastrService, private fireStore: Firestore) {}

  ngOnInit(): void {
    this.getTitle();
  }

  openEditModal() {
    this.openEditPanel = true;
  }
  closeEditModal() {
    this.openEditPanel = false;
  }

  getTitle() {
    this.isLoading = true;
    const dbInstance = collection(this.fireStore, 'election_title');
    getDocs(dbInstance)
      .then((res: any) => {
        this.title = [
          ...res.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          }),
        ];
        this.isLoading = false;

        console.log(this.title);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  updateTitle() {
    this.isLoading = true;

    let data = {
      title: this.titleChange,
    };
    const updatedoc = doc(this.fireStore, 'election_title', this.title[0]?.id);

    updateDoc(updatedoc, data)
      .then((res: any) => {
        console.log(res);
        this.toastr.success('Success', 'title updated');

        this.ngOnInit();
        this.isLoading = false;

        this.closeEditModal();
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  onSave() {
    this.updateTitle();
  }
}
