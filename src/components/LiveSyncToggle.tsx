type LiveSyncToggleProps = {
  liveSync: boolean;
  setLiveSync: (value: boolean) => void;
};

export default function LiveSyncToggle (props: LiveSyncToggleProps) {
  const { liveSync, setLiveSync } = props;

  return (
    <>
      <div class="row">
        <div class="row-title">Live Sync</div>
        <weave-toggle toggled={liveSync} onChange={(event) => { setLiveSync((event as CustomEvent).detail.checked) }}>
        </weave-toggle>
      </div>
      {/* <div class="row">
        <div class="row-title">Save Stage</div>
        <weave-toggle>
        </weave-toggle>
      </div> */}
    </>
  );
}
