import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notes-teacher-table',
  templateUrl: './notes-teacher-table.component.html',
  styleUrls: ['./notes-teacher-table.component.css']
})
export class NotesTeacherTableComponent implements OnInit {
  user: any;
  idTeacher: any;
  notesTab: any;
  idNote: any;
  formNote: FormGroup;
  noteForm: any = {};
  showNoteInput: boolean = false;
  successMessage: string | null = null;
  constructor(private userService: UserService) { }

  ngOnInit() {
    let sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      this.user = this.decodeToken(sessionToken);
      this.idTeacher = this.user.id;
    }
    this.userService.getAllNotesByTeacher(this.idTeacher).subscribe((response) => {
      console.log("her response from BE", response.notesByTeacher);

      this.notesTab = response.notesByTeacher;
    });
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  getNoteById(id: any) {
    this.idNote = id;
  }
  editEvaluation() {
    console.log("this id Note", this.idNote);
    console.log("this form value", this.noteForm);


    this.userService.editNote(this.noteForm, this.idNote, this.idTeacher).subscribe((response) => {
      console.log("here response from BE", response.message);

      if (response.message == "1") {
        this.successMessage = 'Note edit successfully.';
        setTimeout(() => {
          this.successMessage = null;
          this.showNoteInput = false;

        }, 2000);
        this.userService.getAllNotesByTeacher(this.idTeacher).subscribe((responseGetAllNotes) => {
          this.notesTab = responseGetAllNotes.notesByTeacher;
        });
      }


    });

  }
  onValidateClickNote() {
    this.showNoteInput = true;
  }
  noteColor(note : any) {
    if (Number(note)<10) {
      return ["red"]

    } else if (Number(note)>=10 && Number(note)<15) {
      return ["blue"]
    }
    else {
      return ["green"]
    }
  }
}
