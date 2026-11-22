window.addEventListener ('load', function ()
 {console.log("Página carregada com sucesso!"); });

window.addEventListener ('beforeunload', function (event)
 {event.preventDefeault();
  event.returnValue = ''; });
