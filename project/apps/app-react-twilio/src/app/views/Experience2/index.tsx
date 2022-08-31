import { useState } from 'react';

interface ServiceProps {
  sid: string;
  friendlyName: string;
}

export const App = () => {
  const [serviceName, setServiceName] = useState<string>('');
  const [sid, setSid] = useState<string>('');
  const [services, setServices] = useState<ServiceProps[]>([]);

  const createService = async () => {
    const data = await fetch('/experience2/service', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serviceName,
      }),
    });
    const newService = await data.json();
    console.log(newService);
  };

  const getServices = async () => {
    const data = await fetch('/experience2/service');
    const allServices = await data.json();
    setServices(allServices);
  };

  const deleteService = async () => {
    await fetch('/experience2/service', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sid,
      }),
    });
  };

  return (
    <>
      <h1>Services</h1>
      <hr />
      <div>
        <div>
          Name:{' '}
          <input
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          />
        </div>
        <button onClick={() => createService()}>Create a service</button>
      </div>
      <hr />
      <div>
        <button onClick={() => getServices()}>Get all services</button>
        <div>
          {services.map((s: ServiceProps) => {
            return (
              <div>
                {s.friendlyName}: {s.sid}
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <div>
        <div>
          SID: <input value={sid} onChange={(e) => setSid(e.target.value)} />
        </div>
        <button onClick={() => deleteService()}>Delete a service</button>
      </div>
    </>
  );
};

export default App;
