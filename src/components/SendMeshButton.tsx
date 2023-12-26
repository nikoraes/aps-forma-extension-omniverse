import { sendChangesToOmniverse } from "../services/omniverse-link";


type SendMeshButtonProps = {
  connection: string
  usdPath: string
};

export default function SendMeshButton (props: SendMeshButtonProps) {
  const {
    connection,
    usdPath
  } = props;

  const onClick = async () => {
    sendChangesToOmniverse(connection, usdPath)
  };

  return (
    <div class="row">
      <weave-button variant={"solid"} onClick={onClick}>
        Send to Omniverse
      </weave-button>
    </div>
  );
}
