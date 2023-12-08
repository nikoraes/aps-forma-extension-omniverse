import { Forma } from "forma-embedded-view-sdk/auto";

export default function LiveSyncToggle () {
  return (
    <>
      <div class="row">
        <div class="row-title">Live Sync</div>
        <weave-toggle>
        </weave-toggle>
      </div>
      <div class="row">
        <div>http://localhost:8211</div>
      </div>
    </>
  );
}
