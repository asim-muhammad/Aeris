import { useRef, useEffect } from "react";

export default function WeatherChart({ data }) {

  const chartRef = useRef();
  let chartInstance = useRef(null);

  useEffect(() => {
    if (data && !chartInstance.current) {
      const hours = Array.from({ length: 24 }).map((_, i) => {
        let hour = (i) % 12;
        hour = hour == 0 ? 12 : hour;
        let amPm = i <= 11 ? " AM" : " PM";
        return hour + amPm
      })

      chartInstance.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: hours,
          datasets: [{
            label: 'Temp (F°)',
            data: data,
            borderWidth: 2,
            pointRadius: 0,
            cubicInterpolationMode: "monotone",
            borderColor: ["rgb(255, 255, 255)"],
            fill: true,
            backgroundColor: "rgba(255, 255, 255, 0.2)"
          }]
        },

        options: {
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {
              labels: {
                color: "white"
              }
            }
          },
          hover: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            y: {
              beginAtZero: false,
              ticks: {
                color: "#cdcdcd",
                borderColor: "rgb(255, 255, 255)"
              },

              title: {
                display: true,
                color: "white",
                text: "Temperature F°"
              }
            },
            x: {
              ticks: {
                display: false,
                color: "#cdcdcd"
              },
            }
          }
        }
      });
    } else {
      chartInstance.current.data.datasets[0].data = data;
      chartInstance.current.update();
    }


  }, [data]);

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}