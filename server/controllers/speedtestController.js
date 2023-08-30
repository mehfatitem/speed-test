// server/controllers/SpeedTestController.js

const BaseController = require('./Base/BaseController');
const speedTest = require('speedtest-net');
const axios = require('axios');

class SpeedTestController extends BaseController {
  constructor() {
    super();
  }

  async performSpeedTest() {
    try {
      const test = speedTest({ maxTime: 5000, acceptLicense: true });
      const data = await test;
      return data;
    } catch (error) {
      throw error;
    }
  }

  convertBpsToMbpsAndFormat(bandwidthBps) {
    const bandwidthMbps = (bandwidthBps / 1000000) * 8;
    const formattedBandwidthMbps = bandwidthMbps.toFixed(2) + ' Mbps';
    return formattedBandwidthMbps;
  }

  async getPublicIpAddress() {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      return response.data.ip;
    } catch (error) {
      console.error('Error fetching public IP address:', error.message);
      return null;
    }
  }

  getSpeedTestResults(req, res) {
    this.handleRequest(req, res, async () => {
      const data = await this.performSpeedTest();
      const clientIp = await this.getPublicIpAddress();

      return {
        ping: `${data.ping.latency} ms`,
        download: this.convertBpsToMbpsAndFormat(data.download.bandwidth),
        upload: this.convertBpsToMbpsAndFormat(data.upload.bandwidth),
        server: {
          name: data.server.name,
          location: data.server.location,
          country: data.server.country,
          host: data.server.host,
          ip: data.server.ip,
        },
        clientIp: clientIp,
      };
    });
  }
}

module.exports = new SpeedTestController();
