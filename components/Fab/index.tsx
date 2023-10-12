import * as React from "react";
import { FAB, Portal, useTheme } from "react-native-paper";
import ModalLayout from "../ModalLayoult";
import ModalCount from "../ModalInput";

interface FabProps {
  getData: () => void;
}

export default function FabButton({ getData }: FabProps) {
  const theme = useTheme();

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? "close" : "plus"}
        fabStyle={{}}
        actions={[
          {
            icon: "account-plus",
            label: "Adicionar Usuario",
            onPress: () => showModal(),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
          }
        }}
      />
      <ModalLayout
        title="Contas"
        hideModal={hideModal}
        visible={visible}
        showModal={showModal}
      >
        <ModalCount getData={getData} edit={false} />
      </ModalLayout>
    </Portal>
  );
}
