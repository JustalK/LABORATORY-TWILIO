import { useState } from 'react';
import { Message } from '@project/api-interfaces';

export const App = () => {
  const [number, setNumber] = useState<string>('');

  const sendSMS = async () => {
    await fetch('/send-sms', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number,
      }),
    });
  };

  return (
    <>
      <input value={number} onChange={(e) => setNumber(e.target.value)} />
      <div>
        <button onClick={() => sendSMS()} disabled={!number}>
          Send an SMS
        </button>
      </div>
    </>
  );
};

export default App;
