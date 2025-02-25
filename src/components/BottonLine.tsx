interface BottonLineProps {
  color: string;
  sizeWidth: number;
  z: number;
}

const BottonLine: React.FC<BottonLineProps> = ({ color, sizeWidth, z }) => {
  return (
    <div
      className={`${color} w-[${sizeWidth}px] h-[10px] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg shadow-md z-${z}`}></div>
  );
};

export default BottonLine;
