import { useState } from "preact/hooks";
import ConnectionInput from "./components/ConnectionInput";
import UsdFileInput from "./components/UsdFileInput";
import ImportMeshButton from "./components/ImportMeshButton";
import LiveSync from "./components/LiveSync";


export default function App () {
  /* const [month, setMonth] = useState(6);
  const [day, setDay] = useState(15);
  const [interval, setInterval] = useState(60);
  const [startHour, setStartHour] = useState(8);
  const [startMinute, setStartMinute] = useState(0);
  const [endHour, setEndHour] = useState(20);
  const [endMinute, setEndMinute] = useState(0);
  const [resolution, setResolution] = useState("2048x1536"); */

  const [connection, setConnection] = useState('http://localhost:8211')
  const [usdFile, setUsdFile] = useState('omniverse://localhost')
  const [numberOfTriangles, setNumberOfTriangles] = useState(0)

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
        usdFile={usdFile}
        setUsdFile={setUsdFile}
      />
      <div style="height: 10px;"></div>
      <LiveSync></LiveSync>
      <div style="height: 10px;"></div>
      <ImportMeshButton
        connection={connection}
        setNumberOfTriangles={setNumberOfTriangles}
      />
      <div style="height: 10px;"></div>
      <div>{numberOfTriangles}</div>
    </>
  );
}
