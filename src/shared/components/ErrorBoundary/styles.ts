import { StyleSheet } from "react-native";

const boundaryStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

const fallbackStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  descriptionText: {
    fontSize: 16,
    marginTop: 24,
  },
  titleText: {
    fontSize: 24,
    marginBottom: 48,
  },
});

export { boundaryStyles, fallbackStyles };
