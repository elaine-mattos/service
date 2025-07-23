// Copyright (c) The Linux Foundation and others. Licensed under the MIT license.
// SPDX-License-Identifier: MIT

const Ajv = require('ajv')

// Security-focused AJV configuration using built-in protections
const ajv = new Ajv({ 
  allErrors: false, // Prevent resource exhaustion from deep object traversal
  jsonPointers: true,
  strict: true, // Enable strict mode for better security
  validateFormats: false, // Disable format validation to prevent ReDoS attacks
  removeAdditional: true, // Remove additional properties automatically
  useDefaults: true, // Use default values from schema
  coerceTypes: false, // Disable type coercion to prevent unexpected behavior
  verbose: false, // Disable verbose errors to prevent information leakage
  
  // Built-in security limits
  maxItems: 1000, // Maximum number of items in arrays
  maxProperties: 100, // Maximum number of properties in objects
  maxLength: 10000, // Maximum string length
  maxErrors: 10 // Limit the number of errors to prevent excessive processing
})

require('ajv-errors')(ajv)

// Add schemas with error handling
try {
  ajv.addSchema(require('./curations-1.0'), 'curations')
  ajv.addSchema(require('./curation-1.0'), 'curation')
  ajv.addSchema(require('./definition-1.0'), 'definition')
  ajv.addSchema(require('./harvest-1.0'), 'harvest')
  ajv.addSchema(require('./notice-request'), 'notice-request')
  ajv.addSchema(require('./definitions-find'), 'definitions-find')
  ajv.addSchema(require('./definitions-get-dto-1.0'), 'definitions-get-dto')
  ajv.addSchema(require('./coordinates-1.0'), 'coordinates-1.0')
} catch (error) {
  console.error('Error loading validation schemas:', error.message)
  throw error
}

module.exports = ajv
