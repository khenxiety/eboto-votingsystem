import { Component, OnInit } from '@angular/core';
import {
  arrayUnion,
  collection,
  doc,
  Firestore,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { from, Observable } from 'rxjs';
@Component({
  selector: 'app-voters-side-page',
  templateUrl: './voters-side-page.component.html',
  styleUrls: ['./voters-side-page.component.scss'],
})
export class VotersSidePageComponent implements OnInit {
  sampleVotes: any = [];

  title: Array<any> = [];

  positions: Array<any> = [];
  candidates: Array<any> = [];

  isLoading: boolean = false;
  userData: Array<any> = [];
  uid: any;
  selectedPosition: any;
  public updatePasswordForm: FormGroup = new FormGroup({});

  arrayOfCandidatesId: Array<any> = [];
  selectedCandidateId: any;

  selectedPositionArray: Array<any> = [];

  constructor(
    private firestore: Firestore,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.uid = localStorage.getItem('uid');
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getUser();
    this.getTitle();
    this.getPositions();
    this.getCandidates();
    this.buildForm();

    window.scroll({
      top: 0,
    });
  }

  getUser() {
    const userInstance = collection(this.firestore, 'users');
    const q = query(userInstance, where('uid', '==', this.uid));
    getDocs(q).then((res: any) => {
      this.userData = [
        ...res.docs.map((doc: any) => {
          return { ...doc.data(), id: doc.id };
        }),
      ];

      if (this.userData[0].type === 'voted') {
        this.toastr.error('You are already voted!');

        this.isLoading = false;
        this.router.navigate(['vote-complete']);
      } else {
        return;
      }
    });
  }

  buildForm() {
    this.updatePasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      votersId: new FormControl('', [Validators.required]),
    });
  }
  onChange(event: any) {
    console.log(event);
    // this.sampleVotes.push(event);

    // const arr: any = [];

    // this.sampleVotes.forEach((element: any) => {
    //   // if (!arr.includes(element)) {
    //   //   arr.push(element);
    //   // }
    //   if (event.position != element.position) {
    //     arr.push(element.name);
    //   }
    // });

    // console.log(arr);
  }

  getTitle() {
    const dbInstance = collection(this.firestore, 'election_title');

    getDocs(dbInstance)
      .then((res: any) => {
        this.title = [
          ...res.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          }),
        ];
        this.isLoading = false;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  getPositions() {
    const dbInstance = collection(this.firestore, 'positions');
    const q = query(dbInstance, orderBy('maximumVote', 'asc'));

    getDocs(q)
      .then((res: any) => {
        this.positions = [
          ...res.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          }),
        ];
        this.isLoading = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.isLoading = false;
      });
  }
  getCandidates() {
    const dbInstance = collection(this.firestore, 'candidates');

    getDocs(dbInstance)
      .then((res: any) => {
        this.candidates = [
          ...res.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          }),
        ];

        this.isLoading = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.isLoading = false;
      });
  }

  updateVote(id: any, position: any) {
    this.selectedPositionArray.push(position);

    this.arrayOfCandidatesId.push(id);
  }

  async submitVote(id: any) {
    this.isLoading = true;
    const uid = localStorage.getItem('uid');
    if (!uid) {
      this.toastr.error('Error', 'Please Login');
      return;
    }
    const getVotes = collection(this.firestore, 'votes');

    const promise = await new Promise((resolve, reject) => {
      this.arrayOfCandidatesId.forEach((res: any) => {
        const voterQuery = query(getVotes, where('candidateId', '==', res));
        getDocs(voterQuery).then((res: any) => {
          const candidates = [
            ...res.docs.map((doc: any) => {
              return { ...doc.data(), id: doc.id };
            }),
          ];
          let data = {
            votes: arrayUnion(uid),
          };
          const dbInstance = doc(this.firestore, 'votes', candidates[0].id);
          updateDoc(dbInstance, data)
            .then((res: any) => {
              const votedInstance = doc(this.firestore, 'users', id);
              let data = {
                type: 'voted',
              };
              updateDoc(votedInstance, data)
                .then((res: any) => {
                  this.isLoading = false;
                  resolve('Succeded');
                })
                .catch((err: any) => {
                  console.log(err);
                  reject(err);
                });
            })
            .catch((err: any) => {
              console.log(err);
              reject(err);
            });
        });
      });
    });

    // promise.then((res: any) => {
    this.toastr.success('Vote Submitted');
    this.isLoading = false;
    this.router.navigate(['vote-complete']);
    // });
  }

  resetSpecific(event: any, id: any, position: any) {
    if (this.arrayOfCandidatesId.includes(id)) {
      event.checked = false;

      this.selectedPosition = null;
      const pIndex = this.selectedPositionArray.indexOf(position);

      const index = this.arrayOfCandidatesId.indexOf(id);

      this.arrayOfCandidatesId.splice(index, 1);
      this.selectedPositionArray.splice(pIndex, 1);

      console.log(this.selectedPositionArray);
      console.log(this.arrayOfCandidatesId);
    } else {
      console.log('no');
    }
  }

  resetAll(event: any) {
    event.checked = false;

    this.arrayOfCandidatesId = [];
  }
}
