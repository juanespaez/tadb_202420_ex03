const Element = require('../models/Element');
const elementRepository = require('../repository/elementRepository');

class ElementService {
  async getAllElements() {
    return await elementRepository.findAll();
  }

  async getElementBySymbol(symbol) {
    const element = await elementRepository.findById(symbol);
    if (!element) {
      throw new Error('Element not found');
    }
    return element;
  }

  async createElement(elementData) {
    const element = new Element(elementData.namee, elementData.symbol, elementData.atomicNumber, elementData.electronicConfig);
    return await elementRepository.create(element);
  }

  async updateElement(id, elementData) {
    const element = new Element(elementData.namee, elementData.symbol, elementData.atomicNumber, elementData.electronicConfig);
    await elementRepository.update(id, element);
  }

  async deleteElement(id) {
    const delete_element = await elementRepository.delete(id);
    return delete_element;
  }
}

module.exports = new ElementService();
