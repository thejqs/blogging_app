<!-- // alert('this is working'); -->
$('#load-posts').click(function() {

    $('#loader').show();



        $.ajax({
            url: '/blog/posts/',
            success: function(result) {
                $('#loader').hide();
                $('#posts').html(result);
            }
        })
});