import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { CatagoryService } from 'src/app/common/services/catagory.service';
import { CourseService } from 'src/app/common/services/course.service';
import {
  MediaService,
  mediaTypes,
  publicMediaUrlGenrator,
} from 'src/app/common/services/media.service';
import { fillForm } from 'src/app/common/utils/formGroupUpdater';
import { ManageCourseService } from '../manage-course.service';

@Component({
  selector: 'app-course-basics',
  templateUrl: './course-basics.component.html',
  styleUrls: ['./course-basics.component.scss'],
})
export class CourseBasicsComponent implements OnInit, OnDestroy {
  @ViewChild('editor') editor: QuillEditorComponent;
  bascInfoForm: FormGroup;
  loading = false;

  courseId = '';

  catagories: any[] = [];
  subcatagories: any[] = [];

  promoVideo = '';

  promoImage = '';
  constructor(
    private manageCourseService: ManageCourseService,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private mediaService: MediaService,
    private catagoryService: CatagoryService
  ) {
    this.bascInfoForm = this.formBuilder.group({
      title: [, Validators.required],
      catagory: [, Validators.required],
      description: [, Validators.required],
      subtitle: [, Validators.required],
      subcatagory: [, Validators.required],
      language: [, Validators.required],
      level: [, Validators.required],
      primaryInfo: [],
    });
  }

  ngOnInit(): void {
    this.courseId = this.manageCourseService.courseId;
    this.getBaciInfo();
    this.promoImage = publicMediaUrlGenrator(
      mediaTypes.courseImage,
      this.courseId
    );
    this.promoVideo = publicMediaUrlGenrator(
      mediaTypes.courseVideo,
      this.courseId
    );

    Promise.resolve().then(() => {
      this.manageCourseService.save = this.updateBasicInfo;
      this.manageCourseService.isValid = this.isValid;
    });

    this.getCatagories();
  }

  isValid = () => {
    return !this.loading && this.bascInfoForm.valid && this.bascInfoForm.dirty;
  };

  ngOnDestroy(): void {
    this.manageCourseService.removeUpdater();
    this.manageCourseService.removeValidator();
  }

  getBaciInfo() {
    let courseId = this.manageCourseService.courseId;

    this.loading = true;

    this.courseService.getBasicInfo(courseId).subscribe({
      next: (res: any) => {
        this.loadBasicInfo(res.basicInfo);
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        alert(err?.error?.message);
        this.loading = false;
      },
    });
  }

  loadBasicInfo(basicInfo: any) {
    fillForm(this.bascInfoForm, {
      ...basicInfo,
      description: basicInfo.description.replaceAll('&lt;', '<'),
    });
    this.subcatagories =
      this.catagories.find((x) => x.shortNm === basicInfo?.catagory)
        ?.subcatagories || [];
  }

  updateBasicInfo = () => {
    const courseId = this.manageCourseService.courseId;
    this.loading = true;
    this.courseService
      .updateBasicInfo(courseId, this.bascInfoForm.value)
      .subscribe({
        next: (res: any) => {
          this.loadBasicInfo(res.basicInfo);
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          alert(err?.error?.message);
          this.loading = false;
        },
      });
  };

  getCatagories() {
    this.catagoryService.getCatagories().subscribe({
      next: (res: any) => {
        this.catagories = res.catagories;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onCatagoryChange(catagory: string) {
    this.subcatagories =
      this.catagories.find((x) => x.shortNm === catagory)?.subcatagories || [];
  }

  onImageChange(e: Event) {
    this.onMediaChange(e, mediaTypes.courseImage);
  }

  onVideChange(e: Event) {
    this.onMediaChange(e, mediaTypes.courseVideo);
  }

  onMediaChange(e: Event, type: string) {
    if (!(<HTMLInputElement>e.target).files?.length) return;

    let filelist = (<HTMLInputElement>e.target).files;

    let formData = new FormData();
    if (filelist?.length) {
      formData.append('file', filelist[0]);
    }

    this.mediaService
      .uploadFile(type, formData, { id: this.courseId })
      .subscribe({
        next: (res: any) => {
          if (mediaTypes.courseImage === type) {
            this.promoImage = publicMediaUrlGenrator(
              mediaTypes.courseImage,
              this.courseId
            );
          } else {
            this.promoVideo = publicMediaUrlGenrator(
              mediaTypes.courseVideo,
              this.courseId
            );
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  public editorOptions = {
    toolbar: [
      ['bold', 'italic'], // toggled buttons
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  };
}
