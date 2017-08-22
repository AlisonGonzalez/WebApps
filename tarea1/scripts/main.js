function load(i){
  var data = JSON.parse(students);
  var array = {finalCourses: []};
  for(var j = 0; j < data[i].courses.length; j++){
    array.finalCourses.push({
      name: data[i].courses[j],
      note: data[i].notes[j]
    });
  }
  var student = {
    studentId : data[i].studentId,
    firstName : data[i].firstName,
    lastName : data[i].lastName,
    courses : array.finalCourses,
    avg : notesAverage(data[i])
  };
  var template =
  "<h1>{{studentId}}</h1>\
  <h1>{{firstName}} {{lastName}}</h1>\
  <table>\
    <thead>\
      <tr>\
        <th>Materia</th>\
        <th>Calificación</th>\
      </tr>\
    </thead>\
    {{#courses}}\
    <tbody>\
      <tr>\
        <td>{{name}}</td>\
        <td>{{note}}</td>\
      </tr>\
      {{/courses}}\
      <tr>\
        <td>Promedio</td>\
        <td>{{avg}}</td>\
      </tr>\
    </tbody>\
  </table>";
  var html = Mustache.to_html(template, student);
  $('#datosAlumno').html(html);
  validateNotes();
}

function notesAverage(arr){
  var sum = 0;
  for(var i = 0; i < arr.notes.length; i++){
    sum += arr.notes[i];
  }
  var avr = sum / arr.notes.length;
  avr = Math.round(avr);
  return avr ;
}

function validateNotes(){
$('tbody tr td:not(":first")').each(
  function(){
    var approving = 70;
    var score = $(this).text();
    if(score < approving){
      $(this).addClass('failing');
    }
  }
);
}