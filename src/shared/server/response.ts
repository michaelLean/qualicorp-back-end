import { Response } from 'express';

const serverResponse = (response: Response, data: any, statusCode = 200) => {
  return response.status(statusCode).json({
    success: true,
    data,
  });
};

export default serverResponse;
