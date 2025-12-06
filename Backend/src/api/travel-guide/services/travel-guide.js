'use strict';

/**
 * travel-guide service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::travel-guide.travel-guide');
