async function BuscarPaís() {
            var nome = document.getElementById("input-pais").value;
            var div = document.querySelector('.resultado');

           
            div.innerHTML = "Carregando...";

        await fetch("https://restcountries.com/v3.1/name/" + nome)
                .then(function(resposta) {
                    if (resposta.ok) {
                        return resposta.json();
                    } else {
                        div.innerHTML = "Erro ao buscar país";
                    }
                })
                .then(function(dados) {
                    var pais = dados[0];

                    var conteudo = " <h2>" + pais.name.common + "</h2>";

                    conteudo += "<p><strong>Capital:</strong> " + pais.capital + "</p>";

                    conteudo += "<p><strong>Região:</strong> " + pais.region + "</p>";

                    conteudo += "<p><strong>População:</strong> " + pais.population + "</p>";

                    conteudo += "<p><strong>Área:</strong> " + pais.area + "</p>";

                    conteudo += "<p><strong>Coordenadas:</strong> " + pais.latlng + "</p>";

                    conteudo += "<img src='" + pais.flags.png + "' width='100'>";

                    div.innerHTML = conteudo;
                })
                .catch(function(erro) {
                    div.innerHTML = "Erro ao buscar país";
                });
        }