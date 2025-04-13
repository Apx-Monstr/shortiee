import type React from "react"
import { Bar, Line, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  PieController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  PieController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
)

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string[]
    borderColor: string[]
    borderWidth: number
  }[]
}

interface ChartProps {
  data: { name: string; value: number }[]
  categories: string[]
  index: string
  colors: string[]
  valueFormatter?: (value: number) => string
  height?: number
}

export const BarChart: React.FC<ChartProps> = ({ data, categories, index, colors, valueFormatter, height = 300 }) => {
  const chartData: ChartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: categories[0],
        data: data.map((item) => item.value),
        backgroundColor: colors,
        borderColor: colors.map((color) => color),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      y: {
        ticks: {
          callback: valueFormatter,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || ""

            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += valueFormatter ? valueFormatter(context.parsed.y) : context.parsed.y
            }
            return label
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div style={{ height: height }}>
      <Bar data={chartData} options={options as any} />
    </div>
  )
}

export const LineChart: React.FC<
  ChartProps & {
    showLegend?: boolean
    showXAxis?: boolean
    showYAxis?: boolean
    showGridLines?: boolean
    yAxisWidth?: number
  }
> = ({
  data,
  categories,
  index,
  colors,
  valueFormatter,
  height = 300,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  yAxisWidth = 40,
}) => {
  const chartData: ChartData = {
    labels: data.map((item) => item[index as keyof typeof item] as string),
    datasets: [
      {
        label: categories[0],
        data: data.map((item) => item.value || (item as any).clicks),
        backgroundColor: colors,
        borderColor: colors[0],
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: colors[0],
        pointBorderColor: colors[0],
      },
    ],
  }

  const options = {
    scales: {
      x: {
        display: showXAxis,
        grid: {
          display: showGridLines,
        },
      },
      y: {
        display: showYAxis,
        position: "left" as const,
        ticks: {
          callback: valueFormatter,
        },
        grid: {
          display: showGridLines,
        },
        border: {
          display: false,
        },
        min: 0,
        maxTicksLimit: 5,
        grace: "5%",
        title: {
          display: false,
        },
        afterFit: (scaleInstance: any) => {
          scaleInstance.width = yAxisWidth
        },
      },
    },
    plugins: {
      legend: {
        display: showLegend,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || ""

            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += valueFormatter ? valueFormatter(context.parsed.y) : context.parsed.y
            }
            return label
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div style={{ height: height }}>
      <Line data={chartData} options={options as any} />
    </div>
  )
}

export const PieChart: React.FC<ChartProps> = ({ data, categories, index, colors, valueFormatter, height = 300 }) => {
  const chartData: ChartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: categories[0],
        data: data.map((item) => item.value),
        backgroundColor: colors,
        borderColor: colors.map((color) => color),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.label || ""

            if (label) {
              label += ": "
            }
            if (context.parsed !== null) {
              label += valueFormatter ? valueFormatter(context.parsed) : context.parsed
            }
            return label
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div style={{ height: height }}>
      <Pie data={chartData} options={options as any} />
    </div>
  )
}
