import { useState } from 'react';

interface ServiceProps {
  sid: string;
  friendlyName: string;
}

export const App = () => {
  const [name, setname] = useState<string>('');
  const [sid, setSid] = useState<string>('');
  const [fid, setFid] = useState<string>('');
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [functions, setFunctions] = useState<ServiceProps[]>([]);

  const createService = async () => {
    const data = await fetch('/experience2/service', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
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

  const createEnvironment = async () => {
    const data = await fetch('/experience2/environment', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sid,
        name,
      }),
    });
    const newEnvironment = await data.json();
    console.log(newEnvironment);
  };

  const createFunction = async () => {
    const data = await fetch('/experience2/function', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sid,
        name,
      }),
    });
    const newFunction = await data.json();
    console.log(newFunction);
  };

  const getFunctions = async () => {
    const data = await fetch(`/experience2/functions/${sid}`);
    const allFunctions = await data.json();
    setFunctions(allFunctions);
  };

  const upload = async () => {
    const data = await fetch('/experience2/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sid,
        fid,
      }),
    });
    console.log(data);
  };

  return (
    <>
      <h1>Services</h1>
      <hr />
      <div>
        <div>
          Name: <input value={name} onChange={(e) => setname(e.target.value)} />
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
      <h1>Environments</h1>
      <div>
        <div>
          SID Service:{' '}
          <input value={sid} onChange={(e) => setSid(e.target.value)} />
        </div>
        <div>
          Name: <input value={name} onChange={(e) => setname(e.target.value)} />
        </div>
        <button onClick={() => createEnvironment()}>
          Create environment for a service
        </button>
      </div>
      <h1>Functions</h1>
      <div>
        <div>
          SID Service:{' '}
          <input value={sid} onChange={(e) => setSid(e.target.value)} />
        </div>
        <div>
          Name: <input value={name} onChange={(e) => setname(e.target.value)} />
        </div>
        <button onClick={() => createFunction()}>
          Create function for a service
        </button>
      </div>
      <hr />
      <div>
        <div>
          SID Service:{' '}
          <input value={sid} onChange={(e) => setSid(e.target.value)} />
        </div>
        <button onClick={() => getFunctions()}>Get all functions</button>
        <div>
          {functions.map((f: ServiceProps) => {
            return (
              <div>
                {f.friendlyName}: {f.sid}
              </div>
            );
          })}
        </div>
      </div>
      <h1>Upload</h1>
      <div>
        <div>
          SID Service:{' '}
          <input value={sid} onChange={(e) => setSid(e.target.value)} />
        </div>
        <div>
          FID Service:{' '}
          <input value={fid} onChange={(e) => setFid(e.target.value)} />
        </div>
        <button onClick={() => upload()}>Upload script</button>
      </div>
    </>
  );
};

export default App;
