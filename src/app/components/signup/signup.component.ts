import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/validators/mustMatch';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  cvImagePreview: string | ArrayBuffer | null = null;
  photoImagePreview: string | ArrayBuffer | null = null;
  status : string;
  errorEmail: string;
  errorImgStudent: string;
  errorParentChilds: string;
  errorTel: string;
  errorCv: string;
  errorImg: string;
  allError: string;
  allErrorPhoneEmail: string;
  path: string;
  title : string ="Signup"
  text : string = "Welcome to our school management website! Signing up is your first step towards accessing a wide range of features and information."
 newSpeciality : any
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.path = this.router.url;
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      address: ['', [Validators.required, Validators.minLength(5),]],
      email: ['', [Validators.required, Validators.email]],
      //Teacher
      speciality: ['', [Validators.required, Validators.minLength(3), ]],
      pwd: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/.*[0-9].*/), Validators.pattern(/.*[A-Z].*/), Validators.pattern(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/)]],
      confirmPwd: [''],
      img: [null],
      //Teacher
      cv: [null],
      //parent
      childrenArray: this.formBuilder.array([]),
      numberOfChildren: [0, [Validators.required, Validators.min(1)]],
    },
      {
        validator: MustMatch('pwd', 'confirmPwd')
      }
    );
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

  // Fonction pour ajouter dynamiquement des champs pour les enfants
  addChildrenFields() {
    const numberOfChildren = this.signupForm.get('numberOfChildren').value;
    const childrenArray = this.signupForm.get('childrenArray') as FormArray;
    // Effacez les champs précédents (s'il y en a)
    childrenArray.clear();
    // Ajoutez les champs pour les enfants en fonction du nombre spécifié
    for (let i = 0; i < numberOfChildren; i++) {
      const childFormGroup = this.formBuilder.group({
        childFirstName: ['', Validators.required],
        childLastName: ['', Validators.required],
        childPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]]
      });
      childrenArray.push(childFormGroup);
    }
  }
  signup() {
    this.newSpeciality=this.signupForm.value.speciality.toLowerCase();
    this.signupForm.value.speciality=this.newSpeciality;
  this.signupForm.value.role = (this.path == "/signupTeacher") ? "teacher" : (this.path == "/signupStudent") ? "student" : (this.path == "/signupParent") ? "parent" : "admin";
  if (this.signupForm.value.role==="teacher") {
    this.signupForm.value.status="NotOK";
  }
  console.log("here signupForm Value",this.signupForm.value);
  
    this.userService.signup(this.signupForm.value,  this.signupForm.value.cv,this.signupForm.value.img, this.signupForm.value.role).subscribe((response) => {
      if (response.message) {
        if (response.message == "01") {
          this.errorTel = "Phone Number Already Exist ";
          this.errorCv = "";
          this.errorImg = "";
          this.allError = "";
          this.errorEmail = "";
          this.errorImgStudent = "";
          this.errorParentChilds = "";
          this.allErrorPhoneEmail = "";
        }
        else if (response.message == "00") {
          this.errorTel = "";
          this.errorCv = "";
          this.errorImg = "";
          this.allError = "";
          this.errorEmail = "Email Already Exist ";
          this.errorImgStudent = "";
          this.errorParentChilds = "";
          this.allErrorPhoneEmail = "";
        }
        else if (response.message == "02") {
          this.errorTel = "";
          this.errorCv = "";
          this.errorImg = "";
          this.allError = "";
          this.errorEmail = "";
          this.errorImgStudent = "";
          this.errorParentChilds = "";
          this.allErrorPhoneEmail = "Email And Phone Number Already Exist";
        } else if (response.message == "2") {
          this.errorTel = "";
          this.errorCv = "Upload CV in pdf extention";
          this.errorImg = "";
          this.allError = "";
          this.errorEmail = "";
          this.errorImgStudent = "";
          this.errorParentChilds = "";
          this.allErrorPhoneEmail = "";
        } else if (response.message == "3") {
          this.errorTel = "";
          this.errorCv = "";
          this.errorImg = " Select Valid Extention Photo";
          this.allError = "";
          this.errorEmail = "";
          this.errorImgStudent = "";
          this.errorParentChilds = "";
          this.allErrorPhoneEmail = "";
        } else if (response.message == "4") {
          this.errorTel = "";
          this.errorCv = "";
          this.errorImg = "";
          this.allError = "Select valid extention  : CV.pdf And Valid photo";
          this.errorEmail = "";
          this.errorImgStudent = "";
          this.errorParentChilds = "";
          this.allErrorPhoneEmail = "";
        }
        else if (response.message == "04") {
          this.errorTel = "";
          this.errorCv = "";
          this.errorImg = "";
          this.allError = "";
          this.errorEmail = "";
          this.errorImgStudent = "Select Valid Extention Photo";
          this.errorParentChilds = "";
          this.allErrorPhoneEmail = "";
        }
        else if (response.message == "05") {
          this.errorTel = "";
          this.errorCv = "";
          this.errorImg = "";
          this.allError = "";
          this.errorEmail = "";
          this.errorImgStudent = "";
          this.errorParentChilds = "Some children's phone numbers do not exist";
          this.allErrorPhoneEmail = "";
        } else {
          this.router.navigate(["login"]);
        }
      }

    });
  }
}
