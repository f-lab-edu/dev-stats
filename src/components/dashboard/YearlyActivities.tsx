"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  InteractionModeMap,
  ChartOptions,
  Chart,
  ChartTypeRegistry,
  Point,
  BubbleDataPoint,
  ChartData,
} from "chart.js";
import "chart.js/auto";

import { YearlyActivitiesType } from "@/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type YearlyActivitiesProps = {
  yearlyAtivitiesData: YearlyActivitiesType | null;
};

export const YearlyActivities = ({
  yearlyAtivitiesData,
}: YearlyActivitiesProps) => {
  if (!yearlyAtivitiesData) {
    throw new Error("Failed to get Yearly Activities data.");
  }

  const dateData = yearlyAtivitiesData.map(data => data.date);
  const contributionCountData = yearlyAtivitiesData.map(
    data => data.contributionCount,
  );

  const chartData: ChartData<"line", number[], string> = {
    labels: dateData,
    datasets: [
      {
        label: "Contributions",
        data: contributionCountData,
        fill: true,
        borderColor: "rgb(189, 204, 254)",
        backgroundColor: "rgba(219, 234, 254,0.7)",
        tension: 0.1,
        pointRadius: 1,
        pointHoverRadius: 5,
      },
    ],
  };

  ChartJS.register(CROSS_HAIR_PLUGIN);

  return (
    <div className="relative w-full max-h-[220px]">
      <Line options={CHART_OPTIONS} data={chartData} className="w-full" />
    </div>
  );
};

export const YearyActivitiesSkeleton = () => {
  return <div className="w-full h-[220px] bg-gray-200 animate-pulse" />;
};

const CROSS_HAIR_PLUGIN = {
  id: "crosshairPlugin",
  afterDraw: (
    chart: Chart<
      keyof ChartTypeRegistry,
      (number | [number, number] | Point | BubbleDataPoint | null)[],
      unknown
    > & {
      _active: {
        element: Point;
        dataset: ChartData<"line", number[], string>["datasets"][number];
        index: number;
        datasetIndex: number;
      }[];
    },
  ) => {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
    } = chart;

    if (chart._active.length) {
      const activePoint = chart._active[0];
      const xCoor = activePoint.element.x;
      const yCoor = activePoint.element.y;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(xCoor, top);
      ctx.lineTo(xCoor, bottom);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0,0,0,0.1)";
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(left, yCoor);
      ctx.lineTo(right, yCoor);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0,0,0,0.1)";
      ctx.stroke();
      ctx.restore();
    }
  },
};

const CHART_OPTIONS: ChartOptions<"line"> = {
  maintainAspectRatio: false,
  responsive: true,
  hover: {
    mode: "index" as keyof InteractionModeMap,
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: "index" as keyof InteractionModeMap,
      intersect: false,
    },
  },
  scales: {
    x: {
      ticks: {
        maxTicksLimit: 12,
        callback: function (value, index, values) {
          const dateLabel = this.getLabelForValue(value as number);
          const currentYear = dateLabel.split("-")[0].slice(2);
          const currentMonth = dateLabel.split("-")[1];
          const isLastLabel = index === values.length - 1;

          if (
            index === 0 ||
            isLastLabel ||
            (values[index - 1].label as string).split("-")[1] !== currentMonth
          ) {
            return currentYear + "." + currentMonth;
          } else {
            return "";
          }
        },
        font: {
          size: 14,
        },
      },
      border: {
        width: 3,
      },
    },
    y: {
      ticks: {
        maxTicksLimit: 5,
        stepSize: 10,
      },
      min: 0,
      border: {
        display: false,
      },
    },
  },
};
