import {useEffect, useState} from 'react'
import {  useParams, useNavigate, json} from 'react-router-dom'
import api from '../../services/api'
import './style.css'

//ciclo de vida pois o useefect montar o componente inicia a vida do compornente



function Filme(){
   const [filme, setFilme] =  useState({})
   const [loading,  setLoading] =  useState(true)

const {id} = useParams();
const navigation = useNavigate();

useEffect(()=>{
async function loadFilme(){
await api.get(`/movie/${id}`,{
   params:{
      api_key: "1187eaa3a3fa136382d82904e5181bbd",
      language: "pt-BR",
   }
})
.then((response)=>{
setFilme(response.data)
setLoading(false)

})

.catch(()=>{
navigation('/', {replace: true})
return;
})
   }
loadFilme()

return ()=>{
   console.log("componente desmontado!")
}
}, [navigation, id])

function salvarFilme(){
const minhaLista = localStorage.getItem("@fagFlix")

let filmesSalvos = JSON.parse(minhaLista) || [];

const hasFilmes = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id)

if(hasFilmes){
alert("filme ja foi salvo seu sacana")
return;
}
filmesSalvos.push(filme);
localStorage.setItem("@fagFlix", JSON.stringify(filmesSalvos));
alert("filme salvo com sudecco")

}

if(loading){
return(
<div className='filme-info'>
<h1>Carregando detalhes</h1>
</div>

)
}


    return(
    <div className='filme-info'>
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>

      <div className='area-buttons'>
<button onClick={salvarFilme}  >  Salvar</button>
<button>
   <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
   </button>
      </div>

    </div>
       
    )
    
    
    }
    
    export default Filme