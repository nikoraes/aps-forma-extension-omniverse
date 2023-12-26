import folderIcon from '../icons/folder.svg';

type UsdPathInputProps = {
  connection: string;
  usdPath: string;
  setUsdPath: (connection: string) => void;
};

export default function UsdPathInput (props: UsdPathInputProps) {
  const { connection, usdPath, setUsdPath } = props;

  const openFileBrowser = async () => {
    const body = {
      extension_version: '1.0',
      protocol_version: '1.0',
      initial_url: usdPath
    }
    const response = await fetch(`${connection}/kit/formaconnector/filebrowser`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
    setUsdPath(data.url)
    console.log(usdPath)
    document.getElementById('editable__input')?.setAttribute('value', data.url)
    document.getElementById('editable')?.setAttribute('value', data.url)
  }

  return (
    <>
      <div class="title-row">
        <div class="row-title">USD file</div>
      </div>
      <div class="row">
        <div style="overflow: hidden;">{usdPath}</div>
        {/* <weave-editable
          edit
          onChange={(event) => setUsdPath((event as CustomEvent).detail.value)}
        >
          {usdPath}
        </weave-editable> */}
        <weave-icon-button
          onClick={openFileBrowser}>
          <img src={folderIcon} />
        </weave-icon-button>
      </div>
    </>
  );
}
