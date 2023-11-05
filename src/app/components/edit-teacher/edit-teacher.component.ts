import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {
@Input() titleTeacher : string;
@Input() teacher : any;
@Input() cvImagePreview : string;
@Input() photoImagePreview: any;
signupForm : FormGroup;

  constructor(private formBuilder : FormBuilder , private userService : UserService,private router : Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      speciality: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      img: [null],
      cv: [null],
      
    });
  }
  onFileSelected(event: Event, fileType: string) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      // Vérifiez si le contrôle existe avant de mettre à jour sa valeur
      const control = this.signupForm.get(fileType);
      if (control) {
        control.setValue(file);
        control.updateValueAndValidity();
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (fileType === 'cv') {
          this.cvImagePreview = reader.result as string;
        } else if (fileType === 'img') {
          this.photoImagePreview = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  editTeacher(id : any){
    console.log("here id Teacher",id);
    this.userService.editTeacher(id,this.signupForm.value,this.signupForm.value.cv,this.signupForm.value.img).subscribe((response) => {
      console.log("here reponse Edit Teacher from BE", response.teacherIsUpdated);
      if ( response.teacherIsUpdated) {
        this.closeModal();
        this.router.navigate(["teachersInfoAdmin"]);
      }
    });
  }
   closeModal() {
    const modal = document.getElementById('editTeacherModal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('show');
      document.body.classList.remove('modal-open');
  
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  }
  
  
}
