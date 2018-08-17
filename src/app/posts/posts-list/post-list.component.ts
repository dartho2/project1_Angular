import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls:  ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
    // posts =[
    //     {title: 'First Post', content: 'asda'},
    //     {title: 'First a', content: 'asda'},
    //     {title: 'First c', content: 'asda'}
    // ]
    posts: Post[] = []
    private postsSub: Subscription;

    constructor(public postsService: PostsService) {}

    ngOnInit() {
        this.posts = this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdatedListener()
        .subscribe((posts: Post[]) => {
            this.posts = posts;
        }

        );
        
    }
    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
}
