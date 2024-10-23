const express = require('express');
const router = express.Router();
const elementService = require('../service/elementService');

// Get all elements
router.get('/', async (req, res) => {
  try {
    const elements = await elementService.getAllElements();
    res.json(elements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get element by symbol = id
router.get('/:symbol', async (req, res) => {
  try {
    const element = await elementService.getElementBySymbol(req.params.symbol);
    res.json(element);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Create new element
router.post('/', async (req, res) => {
  try {
    const newElement = await elementService.createElement(req.body);
    res.status(201).json(newElement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update element
router.put('/:symbol', async (req, res) => {
  try {
    const updatedElement = await elementService.updateElement(req.params.symbol, req.body);
    res.json(updatedElement);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Delete element
router.delete('/:symbol', async (req, res) => {
  try {
    const deletedElement = await elementService.deleteElement(req.params.symbol);
    
    // Check if the deleted element exists
    if (!deletedElement) {
      return res.status(404).json({ error: 'Element not found' });
    }

    // Send back the deleted element as a JSON response
    res.status(200).json(deletedElement);
  } catch (error) {
    // Handle any errors and return an appropriate error message
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
