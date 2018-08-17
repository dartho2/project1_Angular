import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls:  ['./post-list.component.css']
})
export class PostListComponent {
    // posts =[
    //     {title: 'First Post', content: 'asda'},
    //     {title: 'First a', content: 'asda'},
    //     {title: 'First c', content: 'asda'}
    // ]
@Input() posts =[]

}
