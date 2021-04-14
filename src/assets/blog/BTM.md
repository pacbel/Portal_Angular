Title: Integração BTM - Versão 1.0 09/2017

---

Descrição do processo de integração com os webservices da BTM.

----------

A pasta contendo o sistema desenvolvido se encontra na unidade D do servidor do Aura.
Sua estrutura é:
	
	ARGO
		--- REMESSA
			--- BACKUP
		--- RETORNO
			--- BACKUP
			BTM.exe
			Log.txt


O sistema BTM.exe aceita chamadas via linha de comando podendo ser agendado nas tarefas do windows.
<br>Abaixo descrição das chamadas:

	\INSERIRLANCAPAGTO

	\LISTARSOLICITACAOFAT

	\LISTARSOLICITACAOENC

	\LISTARSOLICITACAOREE

	\LISTARSOLICITACAO


Sintaxe para a chamada:
	
	D:\ARGO\BTM.exe \LISTARSOLICITACAOFAT

A chamada poderá ser automatizada nas tarefas agendadas do windows.

	

> [help] 
> 
> Caso ainda existam dúvidas sinta-se à vontade em procurar a equipe de TI.<br>
> Nosso e-mail para contato é <ti@grupotenco.com.br>
> 