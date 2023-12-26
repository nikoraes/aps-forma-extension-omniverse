import { Forma } from "forma-embedded-view-sdk/auto";

interface MeshTree {
  [path: string]: Float32Array;
}
const meshTree: MeshTree = {}

export const sendAllToOmniverse = async (connection: string, usdPath: string) => {
  try {
    const newMeshTree = await getAllFormaMeshes()

    for (const [path, mesh] of Object.entries(newMeshTree)) {
      sendMeshToOmniverse(connection, usdPath, path, mesh)
    }
  } catch (e) {
    console.log(e);
  }
}

export const sendChangesToOmniverse = async (connection: string, usdPath: string) => {
  const newMeshTree = await getAllFormaMeshes()
  const { deletedMeshes, addedMeshes, changedMeshes } = getChangedFormaMeshes(meshTree, newMeshTree)
  for (const path of changedMeshes) {
    sendMeshToOmniverse(connection, usdPath, path, newMeshTree[path])
  }
  for (const path of addedMeshes) {
    sendMeshToOmniverse(connection, usdPath, path, newMeshTree[path])
  }
  for (const path of deletedMeshes) {
    deleteMeshInOmniverse(connection, usdPath, path)
  }
}

const getAllFormaMeshes = async () => {
  const newMeshTree: MeshTree = {}
  const siteLimits = await Forma.geometry.getPathsByCategory({ category: 'site_limit' })
  for (const siteLimit of siteLimits) {
    const mesh = await Forma.geometry.getTriangles({ path: siteLimit })
    newMeshTree[siteLimit] = mesh
  }
  const vegetation = await Forma.geometry.getPathsByCategory({ category: 'vegetation' })
  for (const veg of vegetation) {
    const mesh = await Forma.geometry.getTriangles({ path: veg })
    newMeshTree[veg] = mesh
  }
  const buildings = await Forma.geometry.getPathsByCategory({ category: 'building' })
  for (const building of buildings) {
    const mesh = await Forma.geometry.getTriangles({ path: building })
    newMeshTree[building] = mesh
  }
  return newMeshTree
}

const getChangedFormaMeshes = (oldTree: MeshTree, newTree: MeshTree) => {
  const oldPaths = Object.keys(oldTree)
  const newPaths = Object.keys(newTree)

  const deletedMeshes = oldPaths.filter(path => !newPaths.includes(path))
  const addedMeshes = newPaths.filter(path => !oldPaths.includes(path))
  const changedMeshes = newPaths
    // Only include paths that are in both trees
    .filter(path => oldPaths.includes(path))
    // Find those with different mesh values
    .filter(path => {
      const oldMesh = oldTree[path]
      const newMesh = newTree[path]
      return !oldMesh.every((v, i) => v === newMesh[i])
    })

  return { deletedMeshes, addedMeshes, changedMeshes }
}

const sendMeshToOmniverse = async (
  connection: string,
  usdPath: string,
  path: string,
  mesh: Float32Array
) => {
  const data = {
    protocol_version: '1.0',
    extension_version: '1.0',
    execute_command: 'IMPORT_MESH',
    usd_path: usdPath,
    forma_path: path,
    autosave_stage: 'true'
  };

  const qs = new URLSearchParams(data);

  console.log(`Sending mesh ${path} to Omniverse...`)

  // Create a new Blob from the Float32Array
  const blob = new Blob([mesh], { type: 'application/octet-stream' });

  // Create a new FormData object
  const formData = new FormData();

  // Append the Blob to the FormData
  formData.append('file', blob, 'filename.bin');

  const response = await fetch(`${connection}/kit/formaconnector/importmesh/?${qs}`, {
    method: 'POST',
    body: formData,
  });

  console.log(await response.json())
}

const deleteMeshInOmniverse = async (
  connection: string,
  usdPath: string,
  path: string
) => {
  const body = {
    protocol_version: '1.0',
    extension_version: '1.0',
    usd_path: usdPath,
    forma_path: path,
  }
  const response = await fetch(`${connection}/kit/formaconnector/deletemesh`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log(await response.json())
}