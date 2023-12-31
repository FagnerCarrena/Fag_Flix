import{ useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './style.css'
import{toast} from "react-toastify"


function Favoritos(){

const [filmes, setFilmes] = useState([])

useEffect(()=>{
    //esta vindo como string preciso converter para json, por isso uso o json parse
const minhaLista = localStorage.getItem("@fagFlix");
setFilmes(JSON.parse(minhaLista) || [])

}, [])

const excluirFilme = (id) =>{
let filtroFilmes = filmes.filter((item)=>{
return (item.id !== id)
})

setFilmes(filtroFilmes);
localStorage.setItem("@fagFlix", JSON.stringify(filtroFilmes))
toast.success("Filme removido com sucesso")


}




return(
    
    <div className='meus-filmes'>
<h1>Meus Filmes </h1>

{filmes.length === 0 && <span>Você não tem nehum filme salvo!</span>}


<ul> 
    {filmes.map((item)=>{
        return(
            <li key={item.id}>
            <span>{item.title}</span>
            <div>
               <Link to={`/filme/${item.id}`}>Ver Detalhes</Link> 
               <button onClick={()=> excluirFilme(item.id)}>Excluir</button>
            </div>
            </li>
        )
    })}
</ul>

    </div>

)

}

export default Favoritos