const pool = require('../context/database');

const Element = require('../models/Element');

class ElementRepository {
  async findAll() {
    try {
      const query = 'SELECT * FROM elements';
      const { rows } = await pool.query(query);
      console.log('Found elements:', rows.length);
      return rows;
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  async findById(symbol) {
    try {
      const query = 'SELECT * FROM elements WHERE id = $1';
      const { rows } = await pool.query(query, [symbol]);
      console.log('Found element with id:', symbol, rows[0] ? 'yes' : 'no');
      return rows[0];
    } catch (error) {
      console.error('Error in findById:', error);
      throw error;
    }
  }

  async create(element) {
    if (!(element instanceof Element)) {
      throw new Error('Invalid element object');
    }

    // Calling the procedure and passing 'null' for the OUT parameter
    const query = 'CALL insert_element($1, $2, $3, $4, $5)';
    const values = [element.namee, element.symbol, element.atomicNumber, element.electronicConfig, null];  // Pass null for OUT parameter

    // Execute the query
    const result = await pool.query(query, values);

    // Since the procedure now selects the row, return that result
    return { message: "Element inserted successfully", data: result };  
}



  async update(id, element) {
    if (!(element instanceof Element)) {
      throw new Error('Invalid element object');
    }
    const query = 'CALL update_element($1, $2, $3, $4, $5)';
    const values = [id, element.namee, element.symbol, element.atomicNumber, element.electronicConfig];
    await pool.query(query, values);
  }

  async delete(id) {
    if (!id) {
        throw new Error('ID is required');
    }
    
    const query = 'CALL delete_element($1, $2)';

    const { rows } = await pool.query(query, [id, null]);

    const deletedElement = rows[0]?.result;

    if (deletedElement) {
        return deletedElement; 
    }
    
    return null;
}



  
}

module.exports = new ElementRepository();
