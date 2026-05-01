import { Sequence } from "remotion";
import { Scene01_Hook } from "../scenes/Scene01_Hook";
import { Scene02_Features } from "../scenes/Scene02_Features";
import { Scene03_CTA } from "../scenes/Scene03_CTA";
import { seconds } from "../utils/timing";

export const MainComposition = () => {
  return (
    <>
      <Sequence durationInFrames={seconds(3)}>
        <Scene01_Hook />
      </Sequence>

      <Sequence from={seconds(3)} durationInFrames={seconds(4)}>
        <Scene02_Features />
      </Sequence>

      <Sequence from={seconds(7)} durationInFrames={seconds(3)}>
        <Scene03_CTA />
      </Sequence>
    </>
  );
};
