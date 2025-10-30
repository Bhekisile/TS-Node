import { checkSchema } from "express-validator";

export const updateTaskValidator = checkSchema({
  _id: {
    in: ['body'],
    notEmpty: true,
    isMongoId: true,
    errorMessage: 'Valid document ID is required',
  },
  title: {
    in: ['body'],
    optional: true,
    errorMessage: 'Title is required',
    isString: true,
    isLength: {
      options: {
        max: 100,
      },
      errorMessage: 'Title must be at most 100 characters long',
    },
    trim: true,
  },
  description: {
    in: ['body'],
    optional: true,
    isString: true,
    trim: true,
  },
  status: {
    in: ['body'],
    optional: true,
    isIn: {
      options: [['todo', 'inProgress', 'completed']],
    },
  },
  priority: {
    in: ['body'],
    optional: true,
    isIn: {
      options: [['low', 'medium', 'high']],
    },
  },
  dueDate: {
    in: ['body'],
    optional: true,
    isISO8601: true,
  }
});