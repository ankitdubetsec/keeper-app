

function Star(props){
    let image=props.fav? "star-filled":"star-empty"
    return(
        <img src={`images/${image}.png`} onClick={props.clik} style={{width:"10%"}}></img>
    )
}

export default Star