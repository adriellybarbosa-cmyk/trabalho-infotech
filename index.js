window.addEventListener ('load', function ()
 {alert ("Página carregada com sucesso!"); });

window.addEventListener ('beforeunload', function (event)
 {event.preventDefeault();
  event.returnValue = ''; });
