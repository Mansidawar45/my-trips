'use strict';

/**
 * train service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::train.train');
