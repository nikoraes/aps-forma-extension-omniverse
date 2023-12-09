
type ConnectionInputProps = {
  connection: string;
  setConnection: (connection: string) => void;
};

export default function ConnectionInput (props: ConnectionInputProps) {
  const { connection, setConnection } = props;

  return (
    <>
      <div class="title-row">
        <div class="row-title">Connection</div>
      </div>
      <div class="row">
        <weave-editable
          edit
          onChange={(event) => setConnection((event as CustomEvent).detail.value)}
        >
          {connection}
        </weave-editable>
      </div>
    </>
  );
}
