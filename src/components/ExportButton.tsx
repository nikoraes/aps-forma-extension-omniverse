import { Forma } from "forma-embedded-view-sdk/auto";
/* import { saveAs } from "file-saver";
import JSZip from "jszip";
import { DateTime } from "luxon"; */

type ExportButtonProps = {
  setNumberOfTriangles: (val: number) => void;
};

export default function ExportButton (props: ExportButtonProps) {
  const { setNumberOfTriangles } = props;
  const onClickExport = async () => {
    try {
      let numOfTriangles = 0
      const siteLimits = await Forma.geometry.getPathsByCategory({ category: 'site_limit' })
      for (const siteLimit of siteLimits) {
        const mesh = await Forma.geometry.getTriangles({ path: siteLimit })
        console.log(siteLimit, mesh)
        numOfTriangles += mesh.length / 3
      }
      const vegetation = await Forma.geometry.getPathsByCategory({ category: 'vegetation' })
      for (const veg of vegetation) {
        const mesh = await Forma.geometry.getTriangles({ path: veg })
        console.log(veg, mesh)
        numOfTriangles += mesh.length / 3
      }
      const buildings = await Forma.geometry.getPathsByCategory({ category: 'building' })
      for (const building of buildings) {
        const mesh = await Forma.geometry.getTriangles({ path: building })
        console.log(building, mesh)
        numOfTriangles += mesh.length / 3
      }
      const transportation = await Forma.geometry.getPathsByCategory({ category: 'transportation' })
      for (const transport of transportation) {
        const mesh = await Forma.geometry.getTriangles({ path: transport })
        console.log(transport, mesh)
        numOfTriangles += mesh.length / 3
      }
      setNumberOfTriangles(numOfTriangles)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div class="row">
      <weave-button variant={"solid"} onClick={onClickExport}>
        Export to USD
      </weave-button>
    </div>
  );
}
