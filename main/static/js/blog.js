/**********LOGIN-CREATE***********/
$('#switch-to-create').click(function(e) {
    e.preventDefault();

    $('#user-login-form').fadeOut(function() {
        $('#user-create-form').fadeIn()
    });

})

$('#switch-to-login').click(function(e) {
    e.preventDefault();

    $('#user-create-form').fadeOut(function() {
        $('#user-login-form').fadeIn();
    });
    
})


<!-- // alert('this is working'); -->
var page = 0;

loadPosts(page);

$('#load-posts').click(loadPosts);


/**************POST ADMIN **************/

$('.edit-post-link').click(function(e) {
    e.preventDefault();
    var id = $(this).attr('data-post-id');

    $.get('/blog/posts/' + id + '/json/', function(result) {
        console.log(result)

        $('#submit-button').html('WHY DO YOU WANT ME TO CHANGE?');
        $('#cancel-button').show();

        var text = result[0].fields.text
        var title = result[0].fields.title
        var id = result[0].pk
        var author = result[0].fields.author
        var featured_image = result[0].fields.featured_image

        $('#post-form input[name="author"]').val(author)
        $('#post-form input[name="title"]').val(title)
        $('#post-form textarea[name="text"]').val(text)
        $('#post-form input[name="id"]').val(id)

        if (featured_image.length > 0) {
            $('#featured-image-form').attr('src', '/media/' + featured_image).show();

        } else{
            $('#featured-image-form').attr('src', '').hide();
        }

    });
});

$('#cancel-button').click(function(e) {
        e.preventDefault();

        $('#post-form input[name="author"]').val('')
        $('#post-form input[name="title"]').val('')
        $('#post-form textarea[name="text"]').val('')
        $('#post-form input[name="id"]').val(global_author)
        $('#featured-image-form').attr('src', '').hide()

        $('#submit-button').html("Give up. Just give up.")
        $('#cancel-button').hide()

});



/****************DELETE POST************/

$('#posts').on('click', '.delete', function() {
<!--    // alert('clicked delete'); -->

        if (confirm("Are you sure you really want to kill me?")) {
                var id = $(this).parents('article').attr('id');
                $.ajax({
                        url: '/blog/posts/' + id + '/',
                        method: 'DELETE',
                        beforeSend: function(xhr) {
                                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'))
            },
            success: function() {
                $('#' + id).remove();
            }

// <!--        $.ajax({
//             url: '/blog/posts/' + id + '/',
//             method: 'DELETE',
//             beforeSend: function(xhr) {
//                     xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'))
//             },
//             success: function() {
//                 $('#' + id).remove();
//             } -->

        })
    }
});


/**********LOADING POSTS*******/

$('#older-posts').click(function(e) {
    e.preventDefault()
    page++
    loadPosts(page);

});



// $('#post-form').submit(function(e) {

//         e.preventDefault();

//         // alert('Form was submitted');

//         var title = $('#post-form input[name="title"]').val();
//         var text = $('#post-form textarea[name="text"]').val();
//         var csrf = $('#post-form input[name="csrfmiddlewaretoken"]').val();

//         $.ajax({
//             url: '/blog/create-post/',
//             method: 'POST',
//             data:  {
//                 'title': title,
//                 'text': text,
//                 'csrfmiddlewaretoken': csrf
//             },
//             success: function(result) {
//                 $('#posts').prepend(result);
//             }

//         })

// });



function loadPosts() {
    // $('#loader').show();
    $.ajax({
            url: '/blog/post-previews/',
            data: {
                page: page
            },
            success: function(result) {
                console.log(result.length)

                if (result.length === 0) {
                    $('#post-previews').append("Sorry, no more posts")
                    $('#older-posts').hide();
                } else {
                    $('#post-previews').append(result);

            }


                // $('#loader').hide();

                    // console.log(this);

                    // var article = "<article><h1>" +
                    // this.fields.title + "</h1>" +
                    // this.fields.text +
                    // "<footer><p>Posted on: " +
                    // this.fields.date_posted + "</p><button class='delete'>Delete</button></footer></article>";


            

                // $('#posts').html(result);
            }
        })
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}