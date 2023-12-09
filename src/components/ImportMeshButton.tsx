import { Forma } from "forma-embedded-view-sdk/auto";


type ExportButtonProps = {
  connection: string
  setNumberOfTriangles: (val: number) => void;
};

export default function ImportMeshButton (props: ExportButtonProps) {
  const omniFormaLinkEndpoint = '/kit/formaconnector/link'
  const { setNumberOfTriangles } = props;
  const onClickExport = async () => {
    try {
      const meshes: [string, Float32Array][] = []
      let numOfTriangles = 0
      /* const siteLimits = await Forma.geometry.getPathsByCategory({ category: 'site_limit' })
      for (const siteLimit of siteLimits) {
        const mesh = await Forma.geometry.getTriangles({ path: siteLimit })
        meshes.set(siteLimit, mesh)
        console.log(siteLimit, mesh)
        numOfTriangles += mesh.length / 3
      }
      const vegetation = await Forma.geometry.getPathsByCategory({ category: 'vegetation' })
      for (const veg of vegetation) {
        const mesh = await Forma.geometry.getTriangles({ path: veg })
        meshes.set(veg, mesh)
        console.log(veg, mesh)
        numOfTriangles += mesh.length / 3
      } */
      const buildings = await Forma.geometry.getPathsByCategory({ category: 'building' })
      for (const building of buildings) {
        const mesh = await Forma.geometry.getTriangles({ path: building })
        meshes.push([building, mesh])
        // console.log(building, mesh)
        numOfTriangles += mesh.length / 3
      }
      setNumberOfTriangles(numOfTriangles)
      console.log(meshes.length)

      /* const data = {
        protocol_version: '1.0',
        extension_version: '1.0',
        execute_command: 'IMPORT_MESH',
        usd_path: '',
        forma_path: meshes[0][0],
        autosave_stage: 'true'
      } */

      for (const mesh of meshes) {

        console.log(mesh[0])

        // Create a new Blob from the Float32Array
        const blob = new Blob([mesh[1]], { type: 'application/octet-stream' });

        // Create a new FormData object
        const formData = new FormData();

        // Append the Blob to the FormData
        formData.append('file', blob, 'filename.bin');

        const response = await fetch(`/kit/formaconnector/importmesh/${mesh[0].split('/')[mesh[0].split('/').length - 1]}`, {
          method: 'POST',
          body: formData,
        });

        /* const response = await fetch(omniFormaLinkEndpoint, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          }
        }) */
        console.log(await response.json())
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div class="row">
      <weave-button variant={"solid"} onClick={onClickExport}>
        Import in Omniverse
      </weave-button>
    </div>
  );
}
