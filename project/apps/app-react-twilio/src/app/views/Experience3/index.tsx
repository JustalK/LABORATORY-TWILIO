import { useState } from 'react';

interface Message {
  accountSid: string;
  apiVersion: string;
  body: string;
  dateCreated: string;
  dateSent: string;
  dateUpdated: string;
  direction: string;
  from: string;
  price: string;
  priceUnit: 'USD';
  sid: string;
  status: string;
  to: string;
}

export const App = () => {
  const [histories, setHistories] = useState<Message[]>([]);
  const [sid, setSid] = useState<string>('');

  const getHistories = async () => {
    const data = await fetch('/experience3/history');
    const historiesFetched = await data.json();
    setHistories(historiesFetched);
  };

  const getHistory = async () => {
    const data = await fetch(`/experience3/history/${sid}`);
    const historyFetched = await data.json();
    setHistories([historyFetched]);
  };

  return (
    <>
      <div>
        <div>
          <button onClick={() => getHistories()}>Get all messages</button>
        </div>
        <div>
          <div>
            SID: <input value={sid} onChange={(e) => setSid(e.target.value)} />
          </div>
          <button onClick={() => getHistory()}>Get One message</button>
        </div>
        <div>
          {histories.map((h: Message) => {
            return (
              <>
                <div>
                  {h.sid}: {h.status}
                </div>
                <div>{h.body}</div>
                <hr />
                <div>
                  Message from {h.from} to {h.to}
                </div>
                <hr />
                <div>Price: {-1 * Number(h.price)}</div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
