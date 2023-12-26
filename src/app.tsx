import { useState } from "preact/hooks";
import ConnectionInput from "./components/ConnectionInput";
import UsdFileInput from "./components/UsdPathInput";
import SendMeshButton from "./components/SendMeshButton";
import LiveSyncToggle from "./components/LiveSyncToggle";


export default function App () {
  const [connection, setConnection] = useState('http://localhost:8211')
  const [usdPath, setUsdPath] = useState('omniverse://localhost')
  const [liveSync, setLiveSync] = useState(false)

  return (
    <>
      <h1>Omniverse</h1>
      <ConnectionInput
        connection={connection}
        setConnection={setConnection}
      />
      <div style="height: 10px;"></div>
      <UsdFileInput
        connection={connection}
        usdPath={usdPath}
        setUsdPath={setUsdPath}
      />
      <div style="height: 10px;"></div>
      <LiveSyncToggle liveSync={liveSync} setLiveSync={setLiveSync}></LiveSyncToggle>
      <div style="height: 10px;"></div>
      <SendMeshButton
        connection={connection}
        usdPath={usdPath}
      ></SendMeshButton>
      <div style="height: 10px;"></div>
    </>
  );
}
