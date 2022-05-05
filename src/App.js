import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [userId, setUserID] = useState('')
  const [amount, setAmount] = useState('')
  const [userArray, setUserArray] = useState([])

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={(event) => {
          event.preventDefault()
          axios.get("https://randomuser.me/api/").then((response) => {
            console.log(response)
            const results = response.data.results
            const user = results && results.length > 0 ? results[0] : null
            if (user) {
              const newUser = {
                id: userId,
                amount: amount,
                email: user.email,
                firstName: user.name.first,
                lastName: user.name.last
              }
              setUserArray(oldUserArray => [...oldUserArray, newUser])
              setAmount('')
              setUserID('')
            }else{
              alert('something went wrong')
            }
          })
        }}
        >
          <p>
            <input value={userId} onChange={(event) => setUserID(event.target.value)} placeholder='User ID' />
          </p>
          <p>
            <input value={amount} onChange={(event) => setAmount(event.target.value)} placeholder='Amount' />
          </p>
          <p>
            <button type='submit'>Submit</button>
          </p>
        </form>

        <div>
          {userArray.map((user) => {
            return(
              <div>
                <p>Name: {user.firstName} {user.lastName}</p>
                <p>Email: {user.email}</p>
                <p>ID: {user.id}</p>
                <p>Amount: {user.amount}</p>
              </div>
            )
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
