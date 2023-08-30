// server/controllers/Base/BaseController.js

class BaseController {
  constructor() {}

  async handleRequest(req, res, handler) {
    try {
      const result = await handler();
      res.json(result);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred.' });
    }
  }
}

module.exports = BaseController;
