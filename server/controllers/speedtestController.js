const speedTest = require('speedtest-net');

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

async function getSpeedTestResults(req, res) {
  try {
    const data = await performSpeedTest();

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
      result: {
        url: data.result.url,
      },
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