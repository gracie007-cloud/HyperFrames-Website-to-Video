import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "../styles/theme";

export const Scene02_Features = () => {
  const frame = useCurrentFrame();

  const translateY = interpolate(frame, [0, 30], [50, 0]);

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: theme.font.body,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 20 }}>
        Fast. Smart. Scalable.
      </div>
      <div style={{ fontSize: 28, opacity: 0.7 }}>
        Built for modern workflows
      </div>
    </div>
  );
};
