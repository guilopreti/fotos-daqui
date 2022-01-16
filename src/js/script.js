if("geolocation" in navigator){
    
    navigator.geolocation.getCurrentPosition((position) =>{
        console.log(position)
        

        let numero = 0
        
        function mostrarPrimeiraFoto(numero, arrayURL, arrayObj){
            
            
            const img = document.querySelector(".bloco-imagem img")
            img.src = arrayURL[numero]
            img.alt = "Vista"

            const figcaption = document.querySelector(".bloco-imagem figcaption")
            figcaption.innerText = "Vista"

            const p = document.querySelector(".textos p")
            p.innerText = arrayObj[numero].title

            const span = document.querySelector(".textos span")
            span.innerText = `Imagem tirada por: ${arrayObj[numero].owner}`
        }
        

        const buscarFotosPadroes = () =>{
           return fetch(`https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=7d112e1144eac6f81b371c5b1daa53ef&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${position.coords.latitude}&lon=${position.coords.longitude}&text=vistas`)
            .then(resp => resp.json())
            .then(fotos => fotos.photos.photo)
        }
        

        async function transformarEmFoto(){
            const arrayCaminho = await buscarFotosPadroes()
            const imagensURL = []
            arrayCaminho.forEach(element => {
                imagensURL.push(`https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg`)
            });
            if(numero < 0){
                numero = (imagensURL.length - 1)
            } else if(numero > (imagensURL.length - 1)){
                numero = 0
            }
            console.log(numero)
            mostrarPrimeiraFoto(numero,imagensURL,arrayCaminho)
            
        }
        transformarEmFoto()

        const botaoAvançar = document.querySelector(".botao-proximo")
        botaoAvançar.addEventListener("click", function(){
            numero += 1
            
            transformarEmFoto()
        })
        
        const botaoVoltar = document.querySelector(".botao-anterior")
        botaoVoltar.addEventListener("click", function(){
            numero -= 1
            transformarEmFoto()
        })

    }, (error) => {


        return error
    })


} else{
    alert("Localização Indisponivel")
}

