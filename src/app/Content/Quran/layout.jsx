import SidecardContent from "./sidecardContent";
const SideQuran = ({ children }) => {
  return (
    <div className="flex relative">
      <SidecardContent />
      {children}
    </div>
  );
};

export default SideQuran;
