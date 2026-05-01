import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "../styles/theme";

export const Scene01_Hook = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1]);

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: theme.font.heading,
        fontSize: 64,
        opacity,
      }}
    >
      Your Product, Instantly Clear
    </div>
  );
};
