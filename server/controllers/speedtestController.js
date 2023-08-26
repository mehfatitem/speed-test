const speedTest = require('speedtest-net');
const ip = require('ip');
const axios = require('axios');


async function performSpeedTest() {
  try {
    const test = speedTest({ maxTime: 5000, acceptLicense: true });
    const data = await test;

    return data;
  } catch (error) {
    throw error;
  }
}

function convertBpsToMbpsAndFormat(bandwidthBps) {
  const bandwidthMbps = (bandwidthBps / 1000000) * 8; // Convert bytes per second to bits per second
  const formattedBandwidthMbps = bandwidthMbps.toFixed(2) + ' Mbps';
  return formattedBandwidthMbps;
}

async function getPublicIpAddress() {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error fetching public IP address:', error.message);
    return null;
  }
}

async function getSpeedTestResults(req, res) {
  try {
    const data = await performSpeedTest();
    const clientIp = await getPublicIpAddress();

    const result = {
      ping: `${data.ping.latency} ms`,
      download: convertBpsToMbpsAndFormat(data.download.bandwidth),
      upload: convertBpsToMbpsAndFormat(data.upload.bandwidth),
      server: {
        name: data.server.name,
        location: data.server.location,
        country: data.server.country,
        host: data.server.host,
        ip: data.server.ip,
      },
      clientIp: clientIp,
    };

    res.json(result);
  } catch (error) {
    console.error('Error performing speed test:', error);
    res.status(500).json({ error: 'An error occurred while performing the speed test.' });
  }
}


module.exports = {
  getSpeedTestResults,
};
