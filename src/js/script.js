if("geolocation" in navigator){
    
    navigator.geolocation.getCurrentPosition((position) =>{
        console.log(position)
        

        let numero = 0
        
        const mostrarPrimeiraFoto = (numero, arrayURL, arrayObj) => {
            const h1NoImage = document.querySelector(".sem-imagem")  
            
            if(arrayURL.length === 0){              
                return h1NoImage.style.display = "block"
            }

            h1NoImage.style.display = "none"

            const h1NY = document.querySelector(".nova-iorque")
            h1NY.style.display = "none"
            
            const img = document.querySelector(".bloco-imagem img")
            img.src = arrayURL[numero]
            img.alt = "Vista"

            const figcaption = document.querySelector(".bloco-imagem figcaption")
            figcaption.innerText = "Vista"

            const p = document.querySelector(".textos p")
            p.innerText = arrayObj[numero].title

            let pHeight = window.getComputedStyle(p).height
            pHeight = pHeight.split("px").join("")
            

            const blocoTextos = document.querySelector(".textos")
            blocoTextos.style.height = `${Number(pHeight) + 70}px`

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

        

        const mostrarFotoPesquisada = (numero, arrayURL, arrayObj, pesquisa) => {
            const h1NoImagePesquisada = document.querySelector(".sem-imagem-pesquisada")  
            
            if(arrayURL.length === 0){              
                h1NoImagePesquisada.innerHTML = ""
                h1NoImagePesquisada.innerText = `Não encontramos fotos de ${pesquisa} nessa localidade. Pesquise sobre alguma outra coisa!`
                return h1NoImagePesquisada.style.display = "block"
            }

            h1NoImagePesquisada.style.display = "none"

            const h1NoImage = document.querySelector(".sem-imagem") 
            h1NoImage.style.display = "none"

            const h1NY = document.querySelector(".nova-iorque")
            h1NY.style.display = "none"
            
            const img = document.querySelector(".bloco-imagem img")
            img.src = arrayURL[numero]
            img.alt = pesquisa

            const figcaption = document.querySelector(".bloco-imagem figcaption")
            figcaption.innerText = pesquisa

            const p = document.querySelector(".textos p")
            p.innerText = arrayObj[numero].title

            let pHeight = window.getComputedStyle(p).height
            pHeight = pHeight.split("px").join("")
            

            const blocoTextos = document.querySelector(".textos")
            blocoTextos.style.height = `${Number(pHeight) + 70}px`

            const span = document.querySelector(".textos span")
            span.innerText = `Imagem tirada por: ${arrayObj[numero].owner}`
        }
        

        const buscarFotosPesquisadas = (pesquisa) =>{
           return fetch(`https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=7d112e1144eac6f81b371c5b1daa53ef&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${position.coords.latitude}&lon=${position.coords.longitude}&text=${pesquisa.split(" ").join("")}`)
            .then(resp => resp.json())
            .then(fotos => fotos.photos.photo)
        }
        

        async function transformarEmFotoPesquisadas(pesquisa){
            const arrayCaminho = await buscarFotosPesquisadas(pesquisa)
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
            mostrarFotoPesquisada(numero,imagensURL,arrayCaminho,pesquisa)
            
        }

        let pesquisasFeitas = []

        const avançaPesquisa = document.querySelector(".botao-proximo-pesquisas")
        avançaPesquisa.addEventListener("click", function(){
            numero += 1
            
            transformarEmFotoPesquisadas(pesquisasFeitas[0])
        })

        const voltaPesquisa = document.querySelector(".botao-anterior-pesquisas")
        voltaPesquisa.addEventListener("click", function(){
            numero -= 1

            transformarEmFotoPesquisadas(pesquisasFeitas[0])
        })

        const botaoPesquisar = document.querySelector(".bloco-infos button")
        botaoPesquisar.addEventListener("click", function(){
            numero = 0
            avançaPesquisa.style.display = "block"
            voltaPesquisa.style.display = "block"
            botaoAvançar.style.display = "none"
            botaoVoltar.style.display = "none"

            const palavraPesquisada = document.querySelector(".bloco-infos input").value
            pesquisasFeitas = []
            pesquisasFeitas.push(palavraPesquisada)
            
            transformarEmFotoPesquisadas(palavraPesquisada)
        })

    }, () => {
        

        let numero = 0
        
        const mostrarPrimeiraFoto = (numero, arrayURL, arrayObj) => {
            const h1 = document.querySelector(".nova-iorque")
            h1.style.display = "block"

            const img = document.querySelector(".bloco-imagem img")
            img.src = arrayURL[numero]
            img.alt = "Vista"

            const figcaption = document.querySelector(".bloco-imagem figcaption")
            figcaption.innerText = "Vista"

            const p = document.querySelector(".textos p")
            p.innerText = arrayObj[numero].title

            let pHeight = window.getComputedStyle(p).height
            pHeight = pHeight.split("px").join("")
            

            const blocoTextos = document.querySelector(".textos")
            blocoTextos.style.height = `${Number(pHeight) + 70}px`

            const span = document.querySelector(".textos span")
            span.innerText = `Imagem tirada por: ${arrayObj[numero].owner}`
        }
        

        const buscarFotosPadroes = () =>{
           return fetch(`https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=7d112e1144eac6f81b371c5b1daa53ef&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=40.6643&lon=-73.9385&text=places`)
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

        const mostrarFotoPesquisada = (numero, arrayURL, arrayObj, pesquisa) => {
            const h1NoImagePesquisada = document.querySelector(".sem-imagem-pesquisada")  
            
            if(arrayURL.length === 0){              
                h1NoImagePesquisada.innerHTML = ""
                h1NoImagePesquisada.innerText = `Não encontramos fotos de ${pesquisa} em Nova Iorque. Pesquise sobre alguma outra coisa!`
                return h1NoImagePesquisada.style.display = "block"
            }
    
            h1NoImagePesquisada.style.display = "none"
    
            const h1NoImage = document.querySelector(".sem-imagem") 
            h1NoImage.style.display = "none"
    
            const h1NY = document.querySelector(".nova-iorque")
            h1NY.innerHTML = ""
            h1NY.innerText = `Como não encontramos sua localização, veja fotos de ${pesquisa} de Nova Iorque`
            h1NY.style.display = "block"
            
            const img = document.querySelector(".bloco-imagem img")
            img.src = arrayURL[numero]
            img.alt = pesquisa
    
            const figcaption = document.querySelector(".bloco-imagem figcaption")
            figcaption.innerText = pesquisa
    
            const p = document.querySelector(".textos p")
            p.innerText = arrayObj[numero].title
    
            let pHeight = window.getComputedStyle(p).height
            pHeight = pHeight.split("px").join("")
            
    
            const blocoTextos = document.querySelector(".textos")
            blocoTextos.style.height = `${Number(pHeight) + 70}px`
    
            const span = document.querySelector(".textos span")
            span.innerText = `Imagem tirada por: ${arrayObj[numero].owner}`
        }
        
    
        const buscarFotosPesquisadas = (pesquisa) =>{
           return fetch(`https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=7d112e1144eac6f81b371c5b1daa53ef&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=40.6643&lon=-73.9385&text=${pesquisa.split(" ").join("")}`)
            .then(resp => resp.json())
            .then(fotos => fotos.photos.photo)
        }
        
    
        async function transformarEmFotoPesquisadas(pesquisa){
            const arrayCaminho = await buscarFotosPesquisadas(pesquisa)
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
            mostrarFotoPesquisada(numero,imagensURL,arrayCaminho,pesquisa)
            
        }
    
        let pesquisasFeitas = []
    
        const avançaPesquisa = document.querySelector(".botao-proximo-pesquisas")
        avançaPesquisa.addEventListener("click", function(){
            numero += 1
            
            transformarEmFotoPesquisadas(pesquisasFeitas[0])
        })
    
        const voltaPesquisa = document.querySelector(".botao-anterior-pesquisas")
        voltaPesquisa.addEventListener("click", function(){
            numero -= 1
    
            transformarEmFotoPesquisadas(pesquisasFeitas[0])
        })
    
        const botaoPesquisar = document.querySelector(".bloco-infos button")
        botaoPesquisar.addEventListener("click", function(){
            numero = 0
            avançaPesquisa.style.display = "block"
            voltaPesquisa.style.display = "block"
            botaoAvançar.style.display = "none"
            botaoVoltar.style.display = "none"
    
            const palavraPesquisada = document.querySelector(".bloco-infos input").value
            pesquisasFeitas = []
            pesquisasFeitas.push(palavraPesquisada)
            
            transformarEmFotoPesquisadas(palavraPesquisada)
        })
    })
} else{
    let numero = 0
        
        const mostrarPrimeiraFoto = (numero, arrayURL, arrayObj) => {
            const h1 = document.querySelector(".nova-iorque")
            h1.style.display = "block"

            const img = document.querySelector(".bloco-imagem img")
            img.src = arrayURL[numero]
            img.alt = "Vista"

            const figcaption = document.querySelector(".bloco-imagem figcaption")
            figcaption.innerText = "Vista"

            const p = document.querySelector(".textos p")
            p.innerText = arrayObj[numero].title

            let pHeight = window.getComputedStyle(p).height
            pHeight = pHeight.split("px").join("")
            

            const blocoTextos = document.querySelector(".textos")
            blocoTextos.style.height = `${Number(pHeight) + 70}px`

            const span = document.querySelector(".textos span")
            span.innerText = `Imagem tirada por: ${arrayObj[numero].owner}`
        }
        

        const buscarFotosPadroes = () =>{
           return fetch(`https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=7d112e1144eac6f81b371c5b1daa53ef&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=40.6643&lon=-73.9385&text=places`)
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

        const mostrarFotoPesquisada = (numero, arrayURL, arrayObj, pesquisa) => {
            const h1NoImagePesquisada = document.querySelector(".sem-imagem-pesquisada")  
            
            if(arrayURL.length === 0){              
                h1NoImagePesquisada.innerHTML = ""
                h1NoImagePesquisada.innerText = `Não encontramos fotos de ${pesquisa} em Nova Iorque. Pesquise sobre alguma outra coisa!`
                return h1NoImagePesquisada.style.display = "block"
            }
    
            h1NoImagePesquisada.style.display = "none"
    
            const h1NoImage = document.querySelector(".sem-imagem") 
            h1NoImage.style.display = "none"
    
            const h1NY = document.querySelector(".nova-iorque")
            h1NY.innerHTML = ""
            h1NY.innerText = `Como não encontramos sua localização, veja fotos de ${pesquisa} de Nova Iorque`
            h1NY.style.display = "block"
            
            const img = document.querySelector(".bloco-imagem img")
            img.src = arrayURL[numero]
            img.alt = pesquisa
    
            const figcaption = document.querySelector(".bloco-imagem figcaption")
            figcaption.innerText = pesquisa
    
            const p = document.querySelector(".textos p")
            p.innerText = arrayObj[numero].title
    
            let pHeight = window.getComputedStyle(p).height
            pHeight = pHeight.split("px").join("")
            
    
            const blocoTextos = document.querySelector(".textos")
            blocoTextos.style.height = `${Number(pHeight) + 70}px`
    
            const span = document.querySelector(".textos span")
            span.innerText = `Imagem tirada por: ${arrayObj[numero].owner}`
        }
        
    
        const buscarFotosPesquisadas = (pesquisa) =>{
           return fetch(`https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=7d112e1144eac6f81b371c5b1daa53ef&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=40.6643&lon=-73.9385&text=${pesquisa.split(" ").join("")}`)
            .then(resp => resp.json())
            .then(fotos => fotos.photos.photo)
        }
        
    
        async function transformarEmFotoPesquisadas(pesquisa){
            const arrayCaminho = await buscarFotosPesquisadas(pesquisa)
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
            mostrarFotoPesquisada(numero,imagensURL,arrayCaminho,pesquisa)
            
        }
    
        let pesquisasFeitas = []
    
        const avançaPesquisa = document.querySelector(".botao-proximo-pesquisas")
        avançaPesquisa.addEventListener("click", function(){
            numero += 1
            
            transformarEmFotoPesquisadas(pesquisasFeitas[0])
        })
    
        const voltaPesquisa = document.querySelector(".botao-anterior-pesquisas")
        voltaPesquisa.addEventListener("click", function(){
            numero -= 1
    
            transformarEmFotoPesquisadas(pesquisasFeitas[0])
        })
    
        const botaoPesquisar = document.querySelector(".bloco-infos button")
        botaoPesquisar.addEventListener("click", function(){
            numero = 0
            avançaPesquisa.style.display = "block"
            voltaPesquisa.style.display = "block"
            botaoAvançar.style.display = "none"
            botaoVoltar.style.display = "none"
    
            const palavraPesquisada = document.querySelector(".bloco-infos input").value
            pesquisasFeitas = []
            pesquisasFeitas.push(palavraPesquisada)
            
            transformarEmFotoPesquisadas(palavraPesquisada)
        })
}

