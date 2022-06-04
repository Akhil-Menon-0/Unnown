$(document).ready(function () {
    $('#loginForm').on('submit', function (e) {
        // // console.log("Clicked");
        e.preventDefault();
        $(this).find('button[type="submit"]').text("Loading");
        $(this).find('button[type="submit"]').attr('disabled', 'disabled');

        let current = $(this)
        setTimeout(function () {
            // // console.log("Called");
            current.find('div.alert').show();
            current.find('button[type="submit"]').text("LogIn");
            current.find('button[type="submit"]').removeAttr('disabled');

        }, 1500);


    });
});