interface BottonLineProps {
  color: string;
  sizeWidth: number;
  z: number;
  bgShadow: string;
}

const BottonLine: React.FC<BottonLineProps> = ({
  color,
  sizeWidth,
  z,
  bgShadow,
}) => {
  return (
    <div
      className={`${color} h-[10px] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg shadow-md`}
      style={{
        width: `${sizeWidth}px`,
        boxShadow: `0px 4px 6px ${bgShadow}`,
        zIndex: z,
      }} // Добавляем динамическую ширину через style
    ></div>
  );
};

export default BottonLine;
