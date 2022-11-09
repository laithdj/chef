import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatagoryService } from 'src/app/common/services/catagory.service';

@Component({
  selector: 'app-course-catagory-form',
  templateUrl: './course-catagory-form.component.html',
  styleUrls: ['./course-catagory-form.component.scss']
})
export class CourseCatagoryFormComponent implements OnInit {

  @Input() courseCatagory: string;
  @Output() onCatagoryChange = new EventEmitter<string>();

  catagoryForm: FormGroup;
  catagories:any[]=[];


  constructor(private formBuilder: FormBuilder, private catagoryService: CatagoryService) { }

  ngOnInit(): void {
    this.catagoryForm= this.formBuilder.group({
      catagory: [this.courseCatagory, [Validators.required]]
    });

    this.catagoryForm.valueChanges.subscribe((x)=>{
      this.onCatagoryChange.emit(x.catagory);
    });

    this.getCatagories();
  }


  getCatagories(){
    this.catagoryService.getCatagories().subscribe({
      next:(res:any)=>{
        this.catagories = res.catagories;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
