const botoesRacas = document.getElementById('botoes-racas');
const galeria = document.getElementById('galeria');

function carregarRacas() {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(resposta => {
      if (!resposta.ok) {
        throw new Error(`Erro na resposta: ${resposta.status}`);
      }
      return resposta.json();
    })
    .then(dados => {
      const racas = dados.message;
      botoesRacas.innerHTML = '';

      for (const raca in racas) {
        const botao = document.createElement('button');
        botao.textContent = raca.charAt(0).toUpperCase() + raca.slice(1);
        botao.className = 'botao-raca';
        botao.onclick = () => carregarImagens(raca);
        botoesRacas.appendChild(botao);
      }
    })
    .catch(erro => {
      console.error('Erro ao carregar raças:', erro);
      botoesRacas.textContent = 'Erro ao carregar raças.';
    });
}

function carregarImagens(raca) {
  galeria.textContent = 'Carregando imagens...';

  fetch(`https://dog.ceo/api/breed/${raca}/images/random/4`)
    .then(resposta => {
      if (!resposta.ok) {
        throw new Error(`Erro na resposta: ${resposta.status}`);
      }
      return resposta.json();
    })
    .then(dados => {
      const imagens = dados.message;
      galeria.innerHTML = ''; // Limpa a galeria anterior

      imagens.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Imagem de um cachorro da raça ${raca}`;
        img.className = 'imagem-cachorro';
        galeria.appendChild(img);
      });
    })
    .catch(erro => {
      console.error(`Erro ao carregar imagens da raça ${raca}:`, erro);
      galeria.textContent = 'Erro ao carregar imagens.';
    });
}

// Carrega as raças ao iniciar
carregarRacas();