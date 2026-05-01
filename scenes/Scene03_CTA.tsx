import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "../styles/theme";

export const Scene03_CTA = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 20], [0.8, 1]);

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          padding: "20px 40px",
          backgroundColor: theme.colors.accent,
          color: "#fff",
          fontSize: 36,
          borderRadius: 12,
          transform: `scale(${scale})`,
        }}
      >
        Get Started Now
      </div>
    </div>
  );
};
