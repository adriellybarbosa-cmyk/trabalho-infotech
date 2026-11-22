window.addevent ('load', function ()
 {alert ("Página carregada com sucesso!")};

window.addevent ('beforeunload', function (event)
 {event.preventDefealt()
  event.returnValue = ('Deseja recarregar o site?'; })
