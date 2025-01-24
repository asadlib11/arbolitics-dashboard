"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactECharts from "echarts-for-react";
import axios from "axios";
import { format } from "date-fns";

interface DataPoint {
  DID: string;
  timestamp: string;
  tem1: number;
  hum1: number;
  TMS: number;
}

const TIME_RANGES = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

const DEVICE_IDS = ["25_225", "25_226"];

export default function AnalyticsDashboard() {
  const [selectedRange, setSelectedRange] = useState("daily");

  const getTimeRangeLimit = (range: string) => {
    switch (range) {
      case "daily":
        return 24;
      case "weekly":
        return 24 * 7;
      case "monthly":
        return 24 * 7 * 4;
      default:
        return 24;
    }
  };

  const {
    data: apiData,
    isLoading,
    error,
  } = useQuery<DataPoint[]>({
    queryKey: ["weatherData", selectedRange],
    queryFn: async () => {
      const response = await axios.get("/api/arbolitic-data", {
        params: {
          location_id: 10,
          limit: getTimeRangeLimit(selectedRange),
          token: localStorage.getItem("token"),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    },
    retry: 1,
  });

  const formatChartData = (deviceId: string) => {
    if (!apiData) return { timestamps: [], temperatures: [], humidity: [] };

    const deviceData = apiData
      .filter((point: DataPoint) => point.DID === deviceId)
      .sort((a: DataPoint, b: DataPoint) => a.TMS - b.TMS);

    // Format date based on selected range
    const getDateFormat = () => {
      switch (selectedRange) {
        case "daily":
          return "MM-dd HH:mm";
        case "weekly":
        case "monthly":
          return "MM-dd HH:mm";
        default:
          return "MM-dd HH:mm";
      }
    };

    return {
      timestamps: deviceData.map((point: DataPoint) => {
        const date = new Date(point.TMS * 1000);
        return format(date, getDateFormat());
      }),
      temperatures: deviceData.map((point: DataPoint) => point.tem1),
      humidity: deviceData.map((point: DataPoint) => point.hum1),
    };
  };

  const getChartOptions = (
    deviceId: string,
    type: "temperature" | "humidity"
  ) => {
    const { timestamps, temperatures, humidity } = formatChartData(deviceId);
    const data = type === "temperature" ? temperatures : humidity;
    const yAxisLabel =
      type === "temperature" ? "Temperature (°C)" : "Humidity (%)";
    const seriesName = type === "temperature" ? "Temperature" : "Humidity";
    const color = type === "temperature" ? "#ff7300" : "#4169E1";

    // Calculate appropriate interval based on data length
    const labelInterval = Math.max(Math.floor(timestamps.length / 12), 1);

    return {
      title: {
        text: `${seriesName} - Device ${deviceId}`,
        left: "center",
        top: 20,
      },
      tooltip: {
        trigger: "axis",
        formatter: function (params: any) {
          const value = params[0].value;
          const time = params[0].axisValue;
          return `Time: ${time}<br/>${seriesName}: ${value}${
            type === "temperature" ? "°C" : "%"
          }`;
        },
      },
      xAxis: {
        type: "category",
        data: timestamps,
        axisLabel: {
          rotate: 45,
          interval: labelInterval, // Show fewer labels to prevent overcrowding
          formatter: (value: string) => value,
          align: "right",
        },
      },
      yAxis: {
        type: "value",
        name: yAxisLabel,
        axisLabel: {
          formatter: (value: number) =>
            `${value}${type === "temperature" ? "°C" : "%"}`,
        },
      },
      dataZoom: [
        {
          type: "slider",
          show: true,
          xAxisIndex: [0],
          start: 0,
          end: 100,
          bottom: 10,
        },
        {
          type: "inside",
          xAxisIndex: [0],
          start: 0,
          end: 100,
        },
      ],
      series: [
        {
          name: seriesName,
          type: "line",
          data: data,
          smooth: true,
          symbol: "circle", // Show data points
          symbolSize: 6, // Size of data points
          color: color,
          areaStyle: {
            opacity: 0.2,
          },
          markPoint: {
            data: [
              { type: "max", name: "Max" },
              { type: "min", name: "Min" },
            ],
          },
        },
      ],
      grid: {
        top: 80,
        bottom: 120, // Increased to accommodate dataZoom
        right: 40,
        left: 60,
      },
    };
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 bg-red-50 rounded-lg">
        <p className="text-red-500">
          Error loading data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Weather Analytics
      </h2>

      {/* Time Range Selector */}
      <div className="flex justify-center space-x-4">
        {TIME_RANGES.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setSelectedRange(value)}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              selectedRange === value
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DEVICE_IDS.map((deviceId) => (
            <div key={deviceId} className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ReactECharts
                  option={getChartOptions(deviceId, "temperature")}
                  style={{ height: "400px" }}
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ReactECharts
                  option={getChartOptions(deviceId, "humidity")}
                  style={{ height: "400px" }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
