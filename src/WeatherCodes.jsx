import { FaSun, FaCloud, FaCloudSun, FaSmog, FaSnowflake, FaCloudRain, FaBolt, FaUmbrella } from 'react-icons/fa';

const WMOWeatherCodes = {
  0: { description: "Clear sky", icon: <FaSun /> },
  1: { description: "Mainly clear", icon: <FaCloudSun /> },
  2: { description: "Partly cloudy", icon: <FaCloudSun /> },
  3: { description: "Overcast", icon: <FaCloud /> },
  45: { description: "Fog", icon: <FaSmog /> },
  48: { description: "Depositing rime fog", icon: <FaSmog /> },
  51: { description: "Drizzle: Light intensity", icon: <FaCloudRain /> },
  53: { description: "Drizzle: Moderate intensity", icon: <FaCloudRain /> },
  55: { description: "Drizzle: Dense intensity", icon: <FaCloudRain /> },
  56: { description: "Freezing Drizzle: Light intensity", icon: <FaSnowflake /> },
  57: { description: "Freezing Drizzle: Dense intensity", icon: <FaSnowflake /> },
  61: { description: "Rain: Slight intensity", icon: <FaCloudRain /> },
  63: { description: "Rain: Moderate intensity", icon: <FaCloudRain /> },
  65: { description: "Rain: Heavy intensity", icon: <FaCloudRain /> },
  66: { description: "Freezing Rain: Light intensity", icon: <FaSnowflake /> },
  67: { description: "Freezing Rain: Heavy intensity", icon: <FaSnowflake /> },
  71: { description: "Snow fall: Slight intensity", icon: <FaSnowflake /> },
  73: { description: "Snow fall: Moderate intensity", icon: <FaSnowflake /> },
  75: { description: "Snow fall: Heavy intensity", icon: <FaSnowflake /> },
  77: { description: "Snow grains", icon: <FaSnowflake /> },
  80: { description: "Rain showers: Slight intensity", icon: <FaCloudRain /> },
  81: { description: "Rain showers: Moderate intensity", icon: <FaCloudRain /> },
  82: { description: "Rain showers: Violent intensity", icon: <FaUmbrella /> },
  85: { description: "Snow showers: Slight intensity", icon: <FaSnowflake /> },
  86: { description: "Snow showers: Heavy intensity", icon: <FaSnowflake /> },
  95: { description: "Thunderstorm: Slight or moderate", icon: <FaBolt /> },
  96: { description: "Thunderstorm with slight hail", icon: <FaBolt /> },
  99: { description: "Thunderstorm with heavy hail", icon: <FaBolt /> }
};

export default WMOWeatherCodes;
