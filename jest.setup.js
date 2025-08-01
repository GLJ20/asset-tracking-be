jest.mock('mongoose', () => ({
  connect: jest.fn(),
  model: jest.fn(),
  Schema: jest.fn(),
  Types: {
    ObjectId: jest.fn()
  }
}));
