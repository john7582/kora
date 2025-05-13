import { useState } from 'react'
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'

function App() {
  const [signature, setSignature] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [amount, setAmount] = useState('1000')
  const [recipient, setRecipient] = useState('AVmDft8deQEo78bRKcGN5ZMf3hyjeLBK4Rd4xGB46yQM')

  const handleGetConfig = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getConfig',
          params: []
        })
      })

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error.message)
      }

      setSignature(JSON.stringify(data.result, null, 2))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get config')
    } finally {
      setLoading(false)
    }
  }

  const handleGetSupportedTokens = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getSupportedTokens',
          params: []
        })
      })

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error.message)
      }

      setSignature(JSON.stringify(data.result, null, 2))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get supported tokens')
    } finally {
      setLoading(false)
    }
  }

  const handleTransferTransaction = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'transferTransaction',
          params: [
            Number(amount),
            "11111111111111111111111111111111", // System Program (SOL)
            "5KKsLVU6TcbVDK4BS6K1DGDxnh4Q9xjYJ8XaDCG5t8ht", // Example source
            recipient
          ]
        })
      })

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error.message)
      }

      setSignature(JSON.stringify(data.result, null, 2))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create transfer transaction')
    } finally {
      setLoading(false)
    }
  }

  const handleGetBlockhash = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getBlockhash',
          params: []
        })
      })

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error.message)
      }

      setSignature(JSON.stringify(data.result, null, 2))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get blockhash')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Kora RPC Interface</h1>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Configuration</h2>
              <button
                onClick={handleGetConfig}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Get Config'}
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Token Operations</h2>
              <button
                onClick={handleGetSupportedTokens}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Get Supported Tokens'}
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Transfer Transaction</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Amount (lamports)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
                    Recipient Address
                  </label>
                  <input
                    type="text"
                    id="recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <button
                onClick={handleTransferTransaction}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Create Transfer Transaction'}
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Blockchain Info</h2>
              <button
                onClick={handleGetBlockhash}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Get Latest Blockhash'}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {signature && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">Response:</h3>
                <pre className="bg-gray-50 rounded p-4 overflow-auto">
                  {signature}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App