import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from '../auth.service';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls:  ['./signup.component.css']
})
export class SignupComponent  {
    constructor(public authService: AuthService) { }

    onSignup(form: NgForm){
        if(form.invalid) {
            return;
        }
        this.authService.createUser(form.value.email, form.value.password)
        // if (this.mode === "signup"){
        //     this.authService.createUser(
        //         this.form.value.email,
        //         this.form.value.password
        //     );
        // }
       
        //     if (this.form.invalid) {
        //       return;
        //     }
        //     if (this.mode === "create") {
        //       this.postsService.addPost(
        //         this.form.value.title,
        //         this.form.value.content,
        //         this.form.value.image
        //       );
        //     } else {
        //       this.postsService.updatePost(
        //         this.postId,
        //         this.form.value.title,
        //         this.form.value.content,
        //         this.form.value.image
        //       );
        //     }
        //     this.form.reset();
          }
    
}