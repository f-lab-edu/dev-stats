"use client";

import { HTMLAttributes } from "react";
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

import { Section } from "../common";

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
} & HTMLAttributes<HTMLElement>;

export const YearlyActivities = ({
  yearlyAtivitiesData,
  ...props
}: YearlyActivitiesProps) => {
  if (!yearlyAtivitiesData) {
    throw new Error("Yearly Activities data is not provided");
  }

  const dateData = yearlyAtivitiesData.map(data => data.date);
  const contributionCountData = yearlyAtivitiesData.map(
    data => data.contributionCount,
  );
  const totalContributions = contributionCountData.reduce(
    (acc, count) => acc + count,
    0,
  );

  const chartData: ChartData<"line", number[], string> = {
    labels: dateData,
    datasets: [
      {
        label: "Contributions",
        data: contributionCountData,
        fill: true,
        borderColor: "rgb(189, 204, 254)",
        backgroundColor: "rgba(189, 204, 254, 0.3)",
        tension: 0.1,
        pointRadius: 1,
        pointHoverRadius: 5,
      },
    ],
  };

  ChartJS.register(CROSS_HAIR_PLUGIN);

  return (
    <Section
      title={`Yearly Activities (${totalContributions.toLocaleString()})`}
      {...props}
    >
      <div className="relative w-full max-h-[220px]">
        <Line options={CHART_OPTIONS} data={chartData} className="w-full" />
      </div>
    </Section>
  );
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
          const currentYear = dateLabel.split("-")[0];
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
      },
    },
    y: {
      ticks: {
        maxTicksLimit: 5,
      },
    },
  },
};
