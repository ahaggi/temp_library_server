const { PrismaClient } = require('@prisma/client')
const { PubSub } = require('apollo-server');

const prisma = new PrismaClient()
const pubsub = new PubSub();

function createContext() {
  return { prisma, pubsub }
}

module.exports = {
  createContext
}