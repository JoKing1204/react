import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


export default function Game() {

    const paperStyle={padding:'50px 20px', width:600, margin:"20px auto"}
    const textStyle={width:600}
    const[name,setName]=useState('')
    const[game, setGame]=useState([])

    const handleClick=(e)=>{
        e.preventDefault()
        const game={name}
        console.log(game)
        fetch("http://localhost:8080/game/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(game)

    }).then(()=>{
        console.log("New Game added")
    })
 }
    useEffect(()=>{
        fetch("http://localhost:8080/game/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setGame(result);
        }
        )
    },[])
  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blueviolet"}}><u>Add Game</u></h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Game name" variant="outlined" style={textStyle} 
      value={name} onChange={(e)=>setName(e.target.value)}
      />
      <Button variant="contained" onClick={handleClick}>Submit</Button>
      
      
      
      
    </Box>
    </Paper>

      <h2>Games</h2>
      <Paper elevation={3} style={paperStyle}>
   
        {game.map(game=> (
            <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left",}} key={game.id}>
                Id:{game.id}
                
                Game:{game.name}
        

            </Paper>
  ))}
    </Paper>
  
    </Container>

  );
}