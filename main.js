let participantes = [
    {
        nome: "Diego Fernandes",
        email: "diego@gmail.com",
        dataInscricao: new Date(2024, 2, 1, 19, 23),
        dataCheckIn: new Date(2024, 2, 1, 20, 20)
      },
      {
        nome: "Mayk Brito",
        email: "mayk@gmail.com",
        dataInscricao: new Date(2024, 2, 23, 19, 23),
        dataCheckIn: new Date(2024, 2, 25, 20, 20)
      },
      {
        nome: "Ana Souza",
        email: "ana@gmail.com",
        dataInscricao: new Date(2024, 0, 3, 19, 23),
        dataCheckIn: new Date(2024, 0, 4, 20, 20)
      },
      {
        nome: "João Silva",
        email: "joao@gmail.com",
        dataInscricao: new Date(2023, 11, 4, 19, 23),
        dataCheckIn: new Date(2023, 11, 5, 20, 20)
      },
      {
        nome: "Maria Oliveira",
        email: "maria@gmail.com",
        dataInscricao: new Date(2023, 10, 5, 19, 23),
        dataCheckIn: new Date(2023, 10, 6, 20, 20)
      },
      {
        nome: "Pedro Santos",
        email: "pedro@gmail.com",
        dataInscricao: new Date(2023, 9, 6, 19, 23),
        dataCheckIn: new Date(2023, 9, 7, 20, 20)
      },
      {
        nome: "Carla Lima",
        email: "carla@gmail.com",
        dataInscricao: new Date(2023, 8, 7, 19, 23),
        dataCheckIn: new Date(2023, 8, 8, 20, 20)
      },
      {
        nome: "Lucas Sousa",
        email: "lucas@gmail.com",
        dataInscricao: new Date(2023, 7, 8, 19, 23),
        dataCheckIn: new Date(2023, 7, 9, 20, 20)
      },
      {
        nome: "Paula Costa",
        email: "paula@gmail.com",
        dataInscricao: new Date(2023, 6, 9, 19, 23),
        dataCheckIn: new Date(2023, 6, 10, 20, 20)
      },
      {
        nome: "Gabriel Almeida",
        email: "gabriel@gmail.com",
        dataInscricao: new Date(2023, 5, 10, 19, 23),
        dataCheckIn: new Date(2023, 5, 11, 20, 20)
      }
];


const criarNovoParticipante = (participante) => {

    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

    let dataCheckin= dayjs(Date.now()).to(participante.dataCheckin)

    if(participante.dataCheckin == null){
        dataCheckin = `
        <button data-email="${participante.email}" onclick="fazerCheckin(event)">
            Confirmar Chek-in
        </button>
        `
    }

    return `
    <tr>
    <td>
        <strong>
            ${participante.nome}
        </strong>
        <br>
        <small>
            ${participante.email}
        </small>
        <td>${dataInscricao}</td>
        <td>${dataCheckin}
    </td>
    </tr></>
    `
}

const atualizarLista = (participantes) => {
    let output = ""

    for(let participante of participantes){
        output = output + criarNovoParticipante(participante)
    }

    document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)

    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckin: null
    }

    const participanteExiste = participantes.find((p) => p.email == participante.email

    )

    if (participanteExiste){
        alert('Email já cadastrado!')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckin = (event) => {

    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
    if (confirm(mensagemConfirmacao) == false){
        return 
    }


    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email
    })

    participante.dataCheckin = new Date()

    atualizarLista(participantes)
}