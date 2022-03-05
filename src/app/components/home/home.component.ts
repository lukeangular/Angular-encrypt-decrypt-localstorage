import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data : any = []
  successMessage = ""

  loginForm = new FormGroup({
    email : new FormControl(null, [Validators.required]),
    password : new FormControl(null, [Validators.required]),
  })
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.data.push(this.loginForm.value)
    const userinfo = CryptoJS.AES.encrypt(JSON.stringify(this.data), 'mys_scret_key').toString()
    localStorage.setItem('userinfo', JSON.stringify(userinfo))

    this.successMessage ="Data has been saved in localstorage"
    this.loginForm.reset()
  }

  OnClick(){
    const eText = JSON.parse(localStorage.getItem('userinfo')).toString()
    const decryptedWord = CryptoJS.AES.decrypt(eText,'mys_scret_key')
    const decryptedData = JSON.parse(decryptedWord.toString(CryptoJS.enc.Utf8));

    console.log(decryptedData)
  }

}
