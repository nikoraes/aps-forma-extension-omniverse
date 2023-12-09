import folderIcon from '../icons/folder.svg';

type UsdFileInputProps = {
  connection: string;
  usdFile: string;
  setUsdFile: (connection: string) => void;
};

export default function UsdFileInput (props: UsdFileInputProps) {
  const { connection, usdFile, setUsdFile } = props;

  const openFileBrowser = async () => {
    const body = {
      extension_version: '1.0',
      protocol_version: '1.0',
      initial_url: usdFile
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
    setUsdFile(data.url)
    console.log(usdFile)
    document.getElementById('editable__input')?.setAttribute('value', data.url)
    document.getElementById('editable')?.setAttribute('value', data.url)
  }

  return (
    <>
      <div class="title-row">
        <div class="row-title">USD file</div>
      </div>
      <div class="row">
        <div style="overflow: hidden;">{usdFile}</div>
        {/* <weave-editable
          edit
          onChange={(event) => setUsdFile((event as CustomEvent).detail.value)}
        >
          {usdFile}
        </weave-editable> */}
        <weave-icon-button
          onClick={openFileBrowser}>
          <img src={folderIcon} />
        </weave-icon-button>
      </div>
    </>
  );
}
