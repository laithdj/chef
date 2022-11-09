import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { HomeService } from 'src/app/common/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  homeCourses: any[] = [];

  popularCourses: any[]=[];


  catagories = [
    { name: 'Graphic design', img: '../../assets/block1.jpg' },
    { name: 'theme desin', img: '../../assets/block2.jpg' },
    { name: 'Machine learning', img: '../../assets/block1.jpg' },
    { name: 'Cooking', img: '../../assets/block2.jpg' },
    { name: 'Data science', img: '../../assets/block1.jpg' },
    { name: 'Block Chain', img: '../../assets/block2.jpg' },
    { name: 'Graphic design', img: '../../assets/block1.jpg' },
    { name: 'Cryptography', img: '../../assets/block2.jpg' },

  ]

  populartopics = [
    {
      name: 'Development', details: [
        { name: 'Python', nStudent: 12000 },
        { name: 'Web dev', nStudent: 1430 },
        { name: 'Wordpress', nStudent: 2980 },
      ]
    },
    {
      name: 'Buisnsee', details: [
        { name: 'Financial ', nStudent: 12000 },
        { name: 'Buisness', nStudent: 1430 },
        { name: 'SQL', nStudent: 2980 },
      ]
    },
    {
      name: 'IT', details: [
        { name: 'AWS', nStudent: 12000 },
        { name: 'Cyber Security', nStudent: 1430 },
        { name: 'Ethical Hacking', nStudent: 2980 },
      ]
    },
    {
      name: 'Design', details: [
        { name: 'Graphic design', nStudent: 12000 },
        { name: 'Photoshop', nStudent: 1430 },
        { name: 'Drawing', nStudent: 2980 },
      ]
    },

  ]
  constructor(private router:Router, private authService: AuthService, private homeService: HomeService) {
    
   }

  ngOnInit(): void {
    this.getCourses();
  }


  getCourses(){
    this.homeService.getHomeCourses().subscribe({
      next: (res:any)=>{
        console.log(res);
        this.homeCourses = res.homeCourses;
        this.popularCourses = res.popularCourses;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
}
