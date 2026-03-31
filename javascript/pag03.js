async function buscarDados() {
            const nomePais = document.getElementById('countryInput').value;
            const divDados = document.getElementById('countryData');

            if (!nomePais) {
                alert("Por favor, digite o nome de um país.");
                return;
            }

            divDados.innerHTML = "Carregando...";

            try {
                 
                const response = await fetch(`https://restcountries.com/v3.1/name/` + nomePais);
                
                if (!response.ok) throw new Error("País não encontrado");

                const data = await response.json();
                const country = data[0]; // Pega o primeiro resultado da lista

                
                // a API retorna um objeto e então é preciso extrair os nomes
                const moedas = country.currencies 
                    ? Object.values(country.currencies).map(c => c.name).join(", ") 
                    : "N/A";

               
                const linguas = country.languages 
                    ? Object.values(country.languages).join(", ") 
                    : "N/A";


                divDados.innerHTML = `
                    <div><strong>Nome Comum:</strong> ${country.name.common}</div>

                    <div><strong>Nome Oficial:</strong> ${country.name.official}</div>

                    <div><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</div>

                    <div><strong>População:</strong> ${country.population.toLocaleString('pt-BR')}</div>

                    <div><strong>Moeda:</strong> ${moedas}</div>

                    <div><strong>Línguas:</strong> ${linguas}</div>

                    <img src="${country.flags.png}" alt="Bandeira" width="150">`;

            } catch (error) {
                divDados.innerHTML = "<span>Erro: " + error.message + "</span>";
            }
        }