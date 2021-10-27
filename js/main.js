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
//一桁だったら頭に0を足す関数
let addZero = function (value) {
  if (value < 10) {
    value = '0' + value;
  }
  return value;
}
///////////タイマー（ここまで）///////////

///////////////todoリストを作ろう//////////////////

const todos = [];//todo用の配列

// データの追加
$('#add').on('click', function () {
  $('#list').empty(); //再表示のために一回消す

  const text = $('#todo').val(); //入力されたものを変数に入れる
  //入力欄を空欄にする
  
  $("#todo").val("");
  $("#todo").focus();
  //textを配列に入れる
  todos.push('<div class="txt"><input type="checkbox" class="check">' + text + '<button class ="close fas fa-trash-alt"></button></div>');
  //console.log(todos); //配列をコンソールに出す

  const jsonData = JSON.stringify(todos); //JSON 形式に変換
  console.log(jsonData); //JSONをコンソールに出す
  localStorage.setItem("memo_todo", jsonData);//LocalStorage に情報を保存．

   $('#list').html(todos);//htmlに変換 
});


//ボタンで消す
$(document).on('click', '.close', function () {
  const num = $(this).parent().index();
  console.log(num);
  todos.splice(num, 1);

  const jsonData = JSON.stringify(todos); //JSON 形式に変換
  console.log(jsonData); //JSONをコンソールに出す
  localStorage.setItem("memo_todo", jsonData);

  $('#list').empty();//一旦消して
  $('#list').html(todos);//再表示
});


// データの削除
$("#clear").on("click", function () {
  localStorage.removeItem("memo_todo");
  $("#todo").val("");
  $('#list').empty();
});

// データの取得
if (localStorage.getItem('memo_todo')) {
  const jsonData = localStorage.getItem("memo_todo");
  const data = JSON.parse(jsonData);
  console.log(data);
  $('#list').html(data);
  
  for (let i = 0; i < data.length; i++){ //データを配列に格納
    todos.push(data[i]);
  }
  
}

$(document).on('click','.check',function () {
  console.log(this);
  console.log($(this).is(":checked"));
  if ($(this).is(":checked")) {
    $(this).parent().css("text-decoration", "line-through");
  }
  else {
    $(this).parent().css("text-decoration", "none");
  }

});



////////////////////memoを作ろう///////////////////////

$("#add_memo").on('click', function(){
  $('#memo').append('<textarea></textarea>');
})
