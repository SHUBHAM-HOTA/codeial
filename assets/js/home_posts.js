{
    //method to submit the form data for new  post using ajax
    //once submited we will recive this in post controler
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url: '/posts/create',
                // serialize the data that is being recived
                //this convertes the post data into json
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newpostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                    
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create post in DOM

    let newpostDom = function(post){
        return $(`<li id="post-${post._id}">
                <p>
                    
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                    </small>
                    
                    ${ post.content }
                    <br>
                    <small>
                        ${post.user.name}
                    </small>
                </p>
                <div class="post-comments">
                    
                        <form action="/comments/create" method="post">
                            <input type="text" name="content" placeholder="Type here to add comment..." required>
                            <input type="hidden" name="post" value="${ post._id}">
                            <input type="submit" value="Add comment">
                        </form>
                    
            
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                            
                    </div>   
                </div>
            </li>`)
    }

    // method to delete a post from the dom

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error:function(error){
                    console.log(error.responseText); 
                }

            });
        });
    }


    // loop over all the existing posts on the page
    // (when the window loads for the first time) 
    //and call the delete post method on delete link of each,
    // also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();

}