//WebSocket
    var conn = new WebSocket('ws://localhost:8080');

    conn.onopen = function(e) {
        //console.log("Connection established!");
    };

conn.onmessage = function(e) {
//    console.log(e.data);
    showMessages('other', e.data);
};

//conn.send('Hello World!');

//////////////////////////////

var formulario = document.getElementById('form1');
var input_mensagem = document.getElementById('message');
var input_nome = document.getElementById('name');
var botao_enviar = document.getElementById('btn1');
var area_mensagens = document.getElementById('content');

botao_enviar.addEventListener('click', function(){
    if (input_mensagem.value != '') {
        var msg = {'name': input_nome.value, 'msg': input_mensagem.value}
        msg = JSON.stringify(msg);

        conn.send(msg);

        showMessages('me', msg);

        input_mensagem.value = '';
    }
});

function showMessages(how ,data) {
    data = JSON.parse(data);
    //console.log(data);

    if (how == 'me') {
        var img_src = "assets/imgs/Icon awesome-rocketchat.png";
    } else if (how == 'other') {
        var img_src = "assets/imgs/Icon awesome-rocketchat-1.png";
    }

    var div = document.createElement('div');
    div.setAttribute('class', how);

    var img = document.createElement('img');
    img.setAttribute('src', img_src);

    var div_txt = document.createElement('div');
    div_txt.setAttribute('class', 'text');

    var h5 = document.createElement('h5');
    h5.textContent = data.name;

    var p = document.createElement('p');
    p.textContent = data.msg;

    div_txt.appendChild(h5);
    div_txt.appendChild(p);

    div.appendChild(img);
    div.appendChild(div_txt);

    area_mensagens.appendChild(div);
    
}