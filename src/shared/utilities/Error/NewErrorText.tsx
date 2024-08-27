import { Text } from "@/shared/components/Typography";

const NewErrorText = ({ error }: { error: boolean | string | null }) =>
  error ? (
    <Text  variant={"regular12"} marginTop={"xs"} color={"red"}>
      {error}
    </Text>
  ) : null;
export default NewErrorText;
