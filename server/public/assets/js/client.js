// var socket = io.connect('http://192.16:3000');
//     socket.on('news', function (data) {
//       console.log(data);
//       socket.emit('my other event', { my: 'data' });
//     });

$(document).ready(function(){
	
  $('#login').submit(function(event){
    event.preventDefault();

    var data = JSON.stringify({player: $('#player').val()});
    $.ajax({url: '/game', type: 'post', contentType: 'application/json', data: data})
      .done(function(data) {
        if(data.error) {
          $('.message').text(data.message)
        }

        window.location = data.data.redirect;
      })
      .fail(function() {
        alert('error');
      })
  })

})