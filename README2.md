# Recuperação de senha

**RF (Requisitos funcionais)**

    - O usuário deve poder recuperar sua senha informando seu e-mail;
    - O usuário deve receber um e-mail com as instruções de recuperação de senha;
    - O usuário deve poder resetar sua senha;

**RNF (Requisitos não funcionais funcionais)**

    - Utilizar Mailtrap para testar envios em ambiente de dev;
    - Utilizar Amazon SES para envios em produção;
    - O envio de e-mails deve acontecer em segundo plano (backend job) / Filer;

**RN (Regras de negócios)**

    - O link enviado por e-mail para resetar senha, deve expirar em 2H;
    - O usuário precisa confirmar a nova senha ao resetar sua senha;


# Atualização do perfil

**RF**

    - O usuário deve poder atualizar seu nome, e-mail e senha;

**RN**

    - O usuário não pode alterar seu e-mail para um e-mail já utilizado;
    - Para atualizar sua senham, o usuário deve informar a senha antiga;
    - Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

    - O usuário deve poder listar seus agendamentos de uma dia especifíco;
    - O prestador deve receber uma notificação sempre que houver um novo agendamento;
    - O prestador deve poder visualizar as notificações não lidas;

**RNF**

    - Os agendamentos do prestador no dia devem ser armazenados em cache;
    - As notificações do prestador devem ser armazenadas no MongoDB;
    - As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

    - A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviço

**RF**

    - O usuário deve poder listar todos prestadores de serviço cadastrado;
    - O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
    - O usuário deve poder listar horários disponíveis em um dia especifíco de um prestador;
    - O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

    - A listagem de prestadores deve ser armazenagem em cache;

**RN**

    - Cada agendamento deve durar 1H exatamente;
    - Os agendamentos devem estar disponíveis entre 8H às 18H (Primeiro às 8H, último às 17H);
    - O usuário não pode agendar em um horário já ocupado;
    - O usuário não pode agendar em um horário que já passou;
    - O usuário não pode agendar serviços consigo mesmo;
