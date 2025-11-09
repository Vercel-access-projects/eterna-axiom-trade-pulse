import Header from "./components/Header";
// import EnhancedPulseContent from "./components/EnhancedPulseContent";
import PulseContent from "./components/PulseContent";

import BottomBar from "./components/BottomBar";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-[#0a0a0a]">
      <Header />
      {/* <EnhancedPulseContent /> */}
            <PulseContent />

      <BottomBar />
    </div>
  );
}
