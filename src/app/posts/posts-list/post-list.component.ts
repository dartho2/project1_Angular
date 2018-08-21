import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
    // posts =[
    //     {title: 'First Post', content: 'asda'},
    //     {title: 'First a', content: 'asda'},
    //     {title: 'First c', content: 'asda'}
    // ]
    posts: Post[] = []
    private postsSub: Subscription;
    totalPosts = 0;
    postsPerPage = 2;
    pageSizeOptions = [1, 2, 5, 10];
    currentPage = 1;
    userIsAuthenticated = false;
    private postSub: Subscription;
    private authStatusSub: Subscription;
    constructor(public postsService: PostsService, private authService: AuthService) { }

    ngOnInit() {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
        this.postsSub = this.postsService
            .getPostUpdatedListener()
            .subscribe((postData: { posts: Post[]; postCount: number }) => {
                this.totalPosts = postData.postCount;
                this.posts = postData.posts;
            });
            this.userIsAuthenticated = this.authService.getIsAuth();
            this.authStatusSub = this.authService
            .getAuthStatusListener()
            .subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
            });
    }
    postDelete(postId: string) {
        this.postsService.deletePost(postId).subscribe(() => {
            this.postsService.getPosts(this.postsPerPage, this.currentPage);
        });
    }
    ngOnDestroy() {
        this.postsSub.unsubscribe();
        this.authStatusSub.unsubscribe
    }
    onChangedPage(pageData: PageEvent) {
        this.currentPage = pageData.pageIndex + 1;
        this.postsPerPage = pageData.pageSize;
        this.postsService.getPosts(this.postsPerPage, this.currentPage);

    }
}
