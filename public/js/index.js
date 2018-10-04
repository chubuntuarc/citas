$(document).ready(function(){
  inicializar();
  $('#module-form').hide();
  $('#editardata').hide();
  $('.loader-back').hide();
  $('.message').hide();
});

var citas;
var elementoEditar;

function inicializar(){
  citas = firebase.database().ref().child('citas');
  leerDatos();
}

function enviarDatos(){
  var asignacion = $('#asignacion').val();
  var cierre = $('#cierre').val();
  var cita = $('#cita').val();
  var ciudad = $('#ciudad').val();
  var correo = $('#correo').val();
  var dias = $('#dias').val();
  var nombre = $('#nombre').val();
  var poliza = $('#poliza').val();
  var serie = $('#serie').val();
  var status = $('#status').val();
  var telefono = $('#telefono').val();
  citas.push({
    asignacion: asignacion,
    cierre: cierre,
    cita : cita,
    ciudad : ciudad,
    correo : correo,
    dias : dias,
    nombre : nombre,
    poliza : poliza,
    serie : serie,
    estado : status,
    telefono : telefono
  });
  $('#module-form').hide();
  $('#nueva-cita').show();
  M.toast({html: 'Guardado!', classes: 'rounded'});
}

function editarDatos(){
  var asignacion = $('#asignacion').val();
  var cierre = $('#cierre').val();
  var cita = $('#cita').val();
  var ciudad = $('#ciudad').val();
  var correo = $('#correo').val();
  var dias = $('#dias').val();
  var nombre = $('#nombre').val();
  var poliza = $('#poliza').val();
  var serie = $('#serie').val();
  var status = $('#status').val();
  var telefono = $('#telefono').val();
  elementoEditar.update({
      asignacion: asignacion,
      cierre: cierre,
      cita : cita,
      ciudad : ciudad,
      correo : correo,
      dias : dias,
      nombre : nombre,
      poliza : poliza,
      serie : serie,
      estado : status,
      telefono : telefono
    });
  $('#module-form').hide();
  $('#nueva-cita').show();
  M.toast({html: 'Actualizado!', classes: 'rounded'});
  $('input').val('');
  $('#enviardata').show();
  $('#editardata').hide();
}

function leerDatos(){
  $("#citas-rows > tr").remove();
  citas.on('value',function(snap){
    var datos = snap.val();
    var nuevaFila = '';
    for(var key in datos){
          nuevaFila+='<tr>';
          nuevaFila+='<td><a class="red-text text-lighten-3" href="#!" onclick="borrar(\''+key+'\');"><i class="tiny material-icons">clear</i></a></td>';
          nuevaFila+='<td>'+datos[key].poliza+'</td>';
          nuevaFila+='<td>'+datos[key].nombre+'</td>';
          nuevaFila+='<td>'+datos[key].ciudad+'</td>';
          nuevaFila+='<td>'+datos[key].asignacion+'</td>';
          nuevaFila+='<td>'+datos[key].dias+'</td>';
          nuevaFila+='<td>'+datos[key].estado+'</td>';
          nuevaFila+='<td><a href="#!" onclick="editar(\''+key+'\');"><i class="material-icons">edit</i></a></td>';
          nuevaFila+='</tr>';
    }
    $("#citas-rows").append(nuevaFila);
  });
}

function borrar(key){
  var checkstr =  confirm('Deseas eliminar la cita?');
    if(checkstr === true){
      var elementoABorrar = citas.child(key);
      elementoABorrar.remove();
    }else{
    return false;
    }
}

function editar(key){
  $('#module-form').show();
  $('#nueva-cita').hide();
  var elementoAEditar = citas.child(key);
  elementoAEditar.once('value', function(snap){
    var datos = snap.val();
    elementoEditar = elementoAEditar;
    $('#asignacion').val(datos.asignacion);
    $('#cierre').val(datos.cierre);
    $('#cita').val(datos.cita);
    $('#ciudad').val(datos.ciudad);
    $('#correo').val(datos.correo);
    $('#dias').val(datos.dias);
    $('#nombre').val(datos.nombre);
    $('#poliza').val(datos.poliza);
    $('#serie').val(datos.serie);
    $('#status').val(datos.estado);
    $('#telefono').val(datos.telefono);
  });
  $('#enviardata').hide();
  M.updateTextFields();
  $('#editardata').show();
}