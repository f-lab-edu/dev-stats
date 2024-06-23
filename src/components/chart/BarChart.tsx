type BarChartProps = {
  data: {
    [key: string]: number;
  };
  colorObject: {
    [key: string]: string;
  };
  height?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const BarChart = ({
  data,
  colorObject,
  height = 12,
  ...props
}: BarChartProps) => {
  return (
    <div className="flex rounded-full w-full overflow-hidden" {...props}>
      {Object.entries(data).map(([label, percent]) => (
        <div
          key={label}
          style={{
            width: `${percent}%`,
            backgroundColor: colorObject[label as keyof typeof colorObject],
            height: `${height}px`,
          }}
        />
      ))}
    </div>
  );
};
