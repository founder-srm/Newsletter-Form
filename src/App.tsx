
import { useState } from 'react'

import { supabase } from './lib/supabase'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'default' | 'success' | 'error'>('default')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('default')
  
    const { data: existingUser, error: checkError } = await supabase
      .from('newsletter')
      .select('*')
      .eq('email', email)
  
    if (checkError) {
      setStatus('error')
      setErrorMessage('An error occurred while checking the email.')
      return
    }
  
    if (existingUser && existingUser.length > 0) {
      setStatus('error')
      setErrorMessage('This email is already subscribed.')
      return
    }
  
    const { error } = await supabase
      .from('newsletter')
      .insert([{ name, email }])
  
    if (error) {
      setStatus('error')
      setErrorMessage('An error occurred while submitting the form.')
    } else {
      setStatus('success')
    }
  }

  return (
    <div className="App">
      <h1>Subscribe to our Newsletter</h1>
      {status === 'default' && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      )}
      {status === 'success' && <p>Thank you for subscribing!</p>}
      {status === 'error' && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  )
}

export default App


