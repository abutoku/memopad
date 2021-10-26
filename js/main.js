'use strict'

// タイマー（もらいもの）
var point;
var sec;
var seconds;
var min;
var hour;
var start;
var now;
var time;
var id;

document.getElementById('start').addEventListener('click', function () {
  if (document.getElementById('start').innerHTML === 'START') {
    start = new Date();
    id = setInterval(goTimer, 10);
    document.getElementById('start').innerHTML = 'STOP';

    document.getElementById('buttonBox').classList.remove('button');
    document.getElementById('buttonBox').classList.add('buttonbutton');
  } else {
    clearInterval(id);
    document.getElementById('start').innerHTML = 'START';
    document.getElementById('timer').innerHTML = '03:00:00';

    document.getElementById('buttonBox').classList.remove('buttonbutton');
    document.getElementById('buttonBox').classList.add('button');
  }
});

var goTimer = function () {
  now = new Date();
  time = now.getTime() - start.getTime();

  point = Math.floor(time / 100);
  sec = Math.floor(time / 1000);
  min = Math.floor(sec / 60);
  hour = Math.floor(min / 60);
  seconds = Math.floor(time / 1000);

  if (seconds < 180) {
    point = 9 - (point - sec * 10);
    sec = 59 - (sec - min * 60);
    min = 2 - (min - hour * 60);

    point = addZero(point);
    sec = addZero(sec);
    min = addZero(min);

    document.getElementById('timer').innerHTML = min + ':' + sec + ':' + point;
  } else if (seconds >= 180 && seconds < 240) {
    point = point - sec * 10;
    sec = sec - min * 60;
    min = min - 3;

    point = addZero(point);
    sec = addZero(sec);
    min = addZero(min);

    document.getElementById('timer').style.color = 'red';
    document.getElementById('timer').innerHTML = min + ':' + sec + ':' + point;

  } else {
    clearInterval(id);
    document.getElementById('timer').innerHTML = '03:00:00';
    document.getElementById('timer').style.color = 'white';
    document.getElementById('start').innerHTML = 'START';

    document.getElementById('buttonBox').classList.remove('buttonbutton');
    document.getElementById('buttonBox').classList.add('button');
  }

}

var addZero = function (value) {
  if (value < 10) {
    value = '0' + value;
  }
  return value;
}

///////////タイマー（ここまで）///////////

//todoリストを作ろう

const todos = [];

// データの追加
$('#add').on('click', function () {
  todos.push() = $('#todo').val();
  $('#')
  // localStorage.setItem('memo', todo);
  $('#list').append('<p>' + todo + '<p>');
});

// データの削除
$("#clear").on("click", function () {
  // localStorage.removeItem("memo");
  $("input").val("");
});

// データの取得
if (localStorage.getItem("memo")) {
  const text = localStorage.getItem("memo");
  $("#text_area").val(text);
}

