'use strict'

//タイガー！
$('#tiger').hover(function () {
  //マウスを乗せたとき
  $('#tiger').css('opacity','1');
  //マウスを離したとき
}, function () {
  $('#tiger').css('opacity','0');
});

//たけし出現
$('#tiger').on('click', function () {
  $('#modal').removeClass('none');
});
//たけし去る
$('#modal_back').on('click', function () {
  $('#modal').addClass('none');
});

$(function () {
  if ($("#todo").val().length == 0) {
    $("#add_btn").prop("disabled", true);
  }
  $("#todo").on("keydown keyup keypress change", function () {
    if ($(this).val().length < 2) {
      $("#add_btn").prop("disabled", true);
    } else {
      $("#add_btn").prop("disabled", false);
    }
  });
});



// タイマー
let point;
let sec;
let seconds;
let min;
let hour;
let start; //スタートした時間
let now;
let time;
let id;
let set; //入力を受け取る変数
let limit;
let limit_min;

document.getElementById('start').addEventListener('click', function () {
  if (document.getElementById('start').innerHTML === 'START') {//スタートボタンを押したとき
    start = new Date();//スタートした時間を代入
    set = $('#minute').val();
    $('#minute').val("");//入力欄を空欄に
    console.log(set);
    limit = set * 60;
    limit_min = set - 1;

    id = setInterval(goTimer, 10);  //0.1秒ごとにgoTimerを繰り返す
    document.getElementById('start').innerHTML = 'STOP'; //ボタンの文字ストップに変更

    document.getElementById('buttonBox').classList.remove('start_button'); //ボタンのクラスを変更
    document.getElementById('buttonBox').classList.add('stop_button'); //ボタンのクラスを変更
  } else {
    clearInterval(id); //ストップボタンを押したとき
    document.getElementById('start').innerHTML = 'START'; //画面表示をリセット
    document.getElementById('timer').innerHTML = '00:00'; //画面表示をリセット

    document.getElementById('buttonBox').classList.remove('stop_button');//ボタンのクラスを変更
    document.getElementById('buttonBox').classList.add('start_button');//ボタンのクラスを変更
  }
});

let goTimer = function () {
  now = new Date();//関数が発動した時間
  time = now.getTime() - start.getTime(); //スタートした時間から経過時間を計算（ミリ秒）

  point = Math.floor(time / 100); //0.01病
  sec = Math.floor(time / 1000); //1秒
  min = Math.floor(sec / 60); //分
  hour = Math.floor(min / 60); //時
  seconds = Math.floor(time / 1000); //秒

  if (seconds < limit) {
    point = 9 - (point - sec * 10);
    sec = 59 - (sec - min * 60);
    min = limit_min - (min - hour * 60);

    point = addZero(point);
    sec = addZero(sec);
    min = addZero(min);

    document.getElementById('timer').innerHTML = min + ':' + sec;

  } else {
    alert('Time up');
    clearInterval(id);
    document.getElementById('timer').innerHTML = '00:00';//画面表示をリセット
    document.getElementById('start').innerHTML = 'START';//画面表示をリセット

    document.getElementById('buttonBox').classList.remove('stop_button');//ボタンのクラスを変更
    document.getElementById('buttonBox').classList.add('start_button');//ボタンのクラスを変更
  }

}

//一桁だったら頭に0を足す関数
let addZero = function (value) {
  if (value < 10) {
    value = '0' + value;
  }
  return value;
}
///////////////タイマー（ここまで）////////////////


///////////////todoリストを作ろう//////////////////

const todos = [];//todo用の配列

// todoデータの追加
$('#add_btn').on('click', function () {
  $('#todo_list').empty(); //再表示のために一回消す

  const text = $('#todo').val(); //入力されたものを変数に入れる
  
  $("#todo").val("");//入力欄を空欄にする
  $("#todo").focus();//入力欄にフォーカスを当てる

  //変数textを配列に入れる
  todos.push('<div class="todo_txt"><label><input type="checkbox" class="check">' + text + '</label><button class= "delete_btn fas fa-trash-alt"></button></div>');
  
  //console.log(todos); //配列をコンソールに出す

  //JSON保存部分
  const jsonData = JSON.stringify(todos); //JSON 形式に変換
  //console.log(jsonData); //JSONをコンソールに出す
  localStorage.setItem("memo_todo", jsonData);//LocalStorage に情報を保存．

  //ページに表示
  $('#todo_list').html(todos);//htmlに変換  
});


//ゴミ箱ボタンでtodoの項目を消す
$(document).on('click', '.delete_btn', function () { //deleteボタンが押されたら
  const num = $(this).parent().index(); //ボタンの親要素のインデックス番号を取得
  console.log(num); //インデックス番号をコンソールに出す
  todos.splice(num, 1); //配列から該当するインデックス番号を削除

  const jsonData = JSON.stringify(todos); //JSON 形式に変換
  console.log(jsonData); //JSONをコンソールに出す
  localStorage.setItem("memo_todo", jsonData); //キーmemo_todoでローカルストレージに保存

  //$('#todo_list').empty();//画面一旦消して

  //↑これはいらなかったー
  

  $('#todo_list').html(todos);//配列を再表示
  //↑htmlを置き換える

});


// todoデータの削除
$("#clear_btn").on("click", function () {
  localStorage.removeItem("memo_todo");//キーmemo_todoをローカルストレージから削除
  $("#todo").val(""); //入力欄を空に
  $('#todo_list').empty(); //画面に表示されているものをを全部消す
  todos.splice(0); //配列todosを空に
});


// todoデータの取得（リロード時）
if (localStorage.getItem('memo_todo')) {
  const jsonData = localStorage.getItem("memo_todo");//キーmemo_todoをローカルストレージから持ってくる
  const data = JSON.parse(jsonData);//キーmemo_todoをローカルストレージから持ってくる
  //console.log(data);//コンソールにdataを出す
  $('#todo_list').html(data);//dateを画面に表示

  for (let i = 0; i < data.length; i++) { //dateを配列todosに格納
    todos.push(data[i]);
  }

}

//チェックを入れると打ち消し線が入る
$(document).on('click', '.check', function () {
  //console.log($(this).is(":checked"));

  if ($(this).is(":checked")) { //true チェックが入ったら
    $(this).parent().css("text-decoration", "line-through");
  }
  else { //false チェックが消えたら
    $(this).parent().css("text-decoration", "none");
  }

});

////////////////////memoを作ろう//////////////////////
//textareaを保存
$('#savememo_btn').on('click', function () { //saveボタンをクリックしたら

  // txt_areaオブジェクトに代入
  const txt_area = {
    txt_1: $('#area_1').val(),
    txt_2: $('#area_2').val(),
    txt_3: $('#area_3').val(),
  };

  console.log(txt_area);
  const jsonData = JSON.stringify(txt_area);
  console.log(jsonData);
  localStorage.setItem("memo_txt", jsonData);

});

//textareaをローカルストレージから削除

$("#clearmemo_btn").on("click", function () {
  console.log('ok')
  localStorage.removeItem("memo_txt");//キーmemo_txtをローカルストレージから削除
  $("#area_1").val(""); //入力欄を空に
  $("#area_2").val(""); //入力欄を空に
  $("#area_3").val(""); //入力欄を空に
});

// textareaデータの取得（リロード時）
if (localStorage.getItem('memo_txt')) {
  const jsonData = localStorage.getItem("memo_txt");//キーmemo_txtをローカルストレージから持ってくる
  const data = JSON.parse(jsonData);//キーmemo_txtをローカルストレージから持ってくる
  //console.log(data);//コンソールにdataを出す

  $('#area_1').val(data.txt_1);//dateを画面に表示
  $('#area_2').val(data.txt_2);//dateを画面に表示
  $('#area_3').val(data.txt_3);//dateを画面に表示

  }








