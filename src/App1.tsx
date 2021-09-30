import React,{useState} from 'react';


export const App1 = () =>{

let [playerCounter, setPlayerCounter] = useState(10)
let [player1Counter, setPlayer1Counter] = useState(10)
let [counter, setCounter] = useState({
  c1:10,
  c2:10
})
  return(
    <div>
      <div>
        <div> i  i</div>
        <div> {counter.c1}</div>
        <button onClick={()=>{
          setCounter((actual) => {
            return {...actual, c1: actual.c1 + 1}
          })
        }}>+</button>
      </div>
      <hr />
      <div>
        <div> p  p</div>
        <div> {counter.c2}</div>
        <button onClick={()=>{
          setCounter((actual) => { return {...actual, c2: actual.c1 - 1}})
        }}>-</button>
      </div>
      <hr />
      <button onClick={()=>{
          setCounter((actual) => {
             return {...actual,
               c1: actual.c1 - 1,
               c2: actual.c1 - 1
              }})
          //setCounter((actual) => { return {...actual, }})
        }}></button>
      <hr />
    </div>
  )
}