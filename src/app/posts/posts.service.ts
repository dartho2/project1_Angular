import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { Post } from './post.model';

@Injectable({providedIn : 'root'})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private _http: HttpClient) {}

    getPosts() {
        this._http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
        .pipe(
            map((postData) => {
                return postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id
                    };
                });
            }))
        .subscribe((transformedPosts)=> {                       // transformedPosts because we need chane mongo "_id" to "id"
            this.posts = transformedPosts.posts;
            this.postsUpdated.next([...this.posts]);
        });
    }
    getPostUpdatedListener() {
        return this.postsUpdated.asObservable();
    }
    addPost(title: string, content: string ) {
        const post: Post = { id: null, title: title, content: content};
        this._http
            .post<{ message: string }>("http://localhost:3000/api/posts", post)
            .subscribe(responseData => {
                console.log(responseData.message);
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
            });
    }
}