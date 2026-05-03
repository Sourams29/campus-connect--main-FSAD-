import React, { useState, useEffect } from 'react';

const BackendTest = () => {
  const [nodeStatus, setNodeStatus] = useState('Checking...');
  const [pythonStatus, setPythonStatus] = useState('Checking...');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Test Node.js
    fetch('/api/node/health')
      .then(res => res.json())
      .then(data => setNodeStatus(`${data.status} (Node.js)`))
      .catch(err => setNodeStatus('Error connecting to Node.js'));

    // Test Python
    fetch('/api/python/health')
      .then(res => res.json())
      .then(data => setPythonStatus(`${data.status} (Python)`))
      .catch(err => setPythonStatus('Error connecting to Python'));
  }, []);

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-indigo-400">Backend Performance Integration Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-gray-800 border border-gray-700">
          <h2 className="text-xl font-semibold mb-2">Node.js Status</h2>
          <p className={`text-lg ${nodeStatus.includes('ok') ? 'text-green-400' : 'text-red-400'}`}>
            {nodeStatus}
          </p>
          <button 
            onClick={() => {
              fetch('/api/node/events').then(r => r.json()).then(setEvents);
            }}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            Fetch Events via Node
          </button>
        </div>

        <div className="p-6 rounded-xl bg-gray-800 border border-gray-700">
          <h2 className="text-xl font-semibold mb-2">Python Status</h2>
          <p className={`text-lg ${pythonStatus.includes('ok') ? 'text-green-400' : 'text-red-400'}`}>
            {pythonStatus}
          </p>
          <button 
            onClick={() => {
              fetch('/api/python/events').then(r => r.json()).then(setEvents);
            }}
            className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
          >
            Fetch Events via Python
          </button>
        </div>
      </div>

      {events.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Events Fetched via Backend:</h2>
          <div className="space-y-4">
            {events.map(event => (
              <div key={event.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="text-gray-400">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BackendTest;
